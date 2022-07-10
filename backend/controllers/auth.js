const jwt = require("jsonwebtoken");
const http = require("../utils/http");
const User = require("../models/user");
const Shop = require("../models/shop");
const config = require("../app.config");


const apiLoginWithProvider = async (req, res) => {
    console.log("login attempt", req.body)
    const payload = req.body;
    if (!payload) return res.status(400).send("Nice try");

    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.status(400).send("Nice try");
    if (!Object.keys(config.auth).includes(provider)) return res.status(400).send("Nice try");

    const configProvider = config.auth[provider];
    const link = configProvider.tokenEndpoint;

    //http module from utils
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

    let authEntity = await User.findOne({ [key]: oId }) || await Shop.findOne({ [key]: oId })

    if (authEntity && res.locals.entity?.providers) {
        authEntity.providers = { ...authEntity.providers, ...res.locals.entity.providers };
        authEntity = await authEntity.save();
    }

    const token = jwt.sign(
        { userId: authEntity?._id, entity: authEntity?.entity , providers: authEntity ? authEntity.providers : { [provider]: oId } },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
    res.status(200).json({ token });
}


module.exports = { 
    apiLoginWithProvider,
}