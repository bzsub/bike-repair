const jwt = require("jsonwebtoken");
const ShopService = require("../services/shop")


const apiCreateShop = async (req, res) => {
    if (!req.body?.username) return res.sendStatus(400);

    const shop = await ShopService.saveShop({
        username: req.body.username,
        prices: req.body.prices,
        providers: res.locals.entity.providers,
    });

    const token = jwt.sign({ userId: shop._id, entity: shop.entity, providers: shop.providers }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
}

const apiGetShops = async (req, res) => {
    const users = await ShopService.getShops(req.query.search)
    if (!users) res.sendStatus(400) 
    res.json(users);
}  

const apiUpdateShop = async (req, res) => {
    if ( !req.body.prof_pics || 
        !req.body.username || 
        !req.body.bikes || 
        res.locals.user.userId !== req.params.user_id
    ) return res.sendStatus(400)
    const user = await ShopService.updateShop(req.params.user_id, req.body)
    if (!user) res.sendStatus(400) 
    res.json(user);
}

const apiDeleteShop = async (req, res) => { 
    if ( res.locals.user.userId !== req.params.user_id ) return res.sendStatus(400) 
    const user = await ShopService.deleteShop(req.params.user_id)
    if (!user) res.sendStatus(400) 
    res.json(user);
}


module.exports = { 
    apiCreateShop,
    apiGetShops,
    apiUpdateShop,
    apiDeleteShop
}