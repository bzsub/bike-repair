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
    const shops = await ShopService.getShops()
    if (!shops) res.sendStatus(400) 
    res.status(200).json(shops);
}  

const apiGetOneShop = async (req, res) => {
    const shop = await ShopService.getOneShop(req.params.shop_id)
    if (!shop) res.sendStatus(400) 
    res.status(200).json(shop);
} 

const apiUpdateShop = async (req, res) => {
    if ( !req.body.username || 
        /* !req.body.prof_pics || 
        !req.body.bikes ||  */
        res.locals.entity.userId !== req.params.shop_id
    ) return res.sendStatus(400)
    const shop = await ShopService.updateShop(req.params.shop_id, req.body)
    if (!shop) res.sendStatus(400) 
    res.status(200).json(shop);
}

const apiDeleteShop = async (req, res) => { 
    if ( res.locals.entity.userId !== req.params.shop_id ) return res.sendStatus(400) 
    const shop = await ShopService.deleteShop(req.params.shop_id)
    if (!shop) res.sendStatus(400) 
    res.status(200).json(shop);
}


module.exports = { 
    apiCreateShop,
    apiGetShops,
    apiGetOneShop,
    apiUpdateShop,
    apiDeleteShop
}