const router = require("express").Router();
const jwt = require("jsonwebtoken");
const http = require("../utils/http");
const User = require("../models/user");
const auth = require("../middlewares/auth");
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