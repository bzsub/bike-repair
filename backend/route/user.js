const router = require("express").Router();
const jwt = require("jsonwebtoken");
const http = require("../util/http");
const User = require("../model/user");
const auth = require("../middleware/auth");
const config = require("../app.config");

router.post("/login", auth({ block: false }), async (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).send("Nice try");

  const code = payload.code;
  const provider = payload.provider;
  if (!code || !provider) return res.status(400).send("Nice try");
  if (!Object.keys(config.auth).includes(provider)) return res.status(400).send("Nice try");

  const configProvider = config.auth[provider]; // google or github
  const link = configProvider.tokenEndpoint;

  // our own http module
  const response = await http.post(
    link,
    {
      code: code,
      client_id: configProvider.clientId,
      client_secret: configProvider.clientSecret,
      redirect_uri: configProvider.redirectUri,
      grant_type: "authorization_code",
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response) return res.status(500).send("Token provider error");
  if (response.status !== 200) return res.status(401).send("Nice try");

  let oId;
  const onlyOauth = !response.data.id_token;
  if (onlyOauth) {
    let accessToken = response.data.access_token;
    const userResponse = await http.post(
      configProvider.userEndpoint,
      {},
      {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      }
    );
    if (!userResponse) return res.status(500).send("provider error");
    if (userResponse.status !== 200) return res.status(401).send("Nice try");
    oId = userResponse.data.id;
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.status(500).send("provider token error");
    oId = decoded.sub;
  }

  const key = `providers.${provider}`;
  // console.log(key);
  // console.log("oId: ", oId);
  let user = await User.findOne({ [key]: oId }); // already "registered" user in DB
  if (user && res.locals.user?.providers) {
    user.providers = { ...user.providers, ...res.locals.user.providers }; // append a new provider to its existing one
    user = await user.save();
  }

  const token = jwt.sign(
    { userId: user?._id, providers: user ? user.providers : { [provider]: oId } },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  ); // conditional chaining bro
  res.status(200).json({ token });

  /*
  itt FE-en ha nincs userid a most visszakuldott tokenben, akkor latni fog egy formot, csinaljon profilt !!!!
  */
});

router.post("/create", auth({ block: true }), async (req, res) => {
  if (!req.body?.username) return res.sendStatus(400);

  const user = await User.create({
    username: req.body.username,
    providers: res.locals.user.providers,
  });

  const token = jwt.sign({ userId: user._id, providers: user.providers }, process.env.SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({ token });
});

module.exports = router;

/*
google:
https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com&redirect_uri=http://localhost:3000/callback&scope=openid%20email&prompt=select_account

github:
https://github.com/login/oauth/authorize?response_type=code&client_id=a6b3d8e1c2c6c193dac2&redirect_uri=http://localhost:3000/callback/github&scope=user%20email&prompt=select_account

http://localhost:3000/callback/github


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlcnMiOnsiZ29vZ2xlIjoiMTA4NjExNjkzODMyNzQ3Mzk1Mjg0In0sImlhdCI6MTY1NDg1OTE2NiwiZXhwIjoxNjU0ODYyNzY2fQ.3bsjd1fhZxiYHVTb48FZPdJwlMk0jjx9oki0QsIAP20
*/
