const router = require("express").Router();
const auth = require("../middlewares/auth");
const ShopControl = require("../controllers/shop")


router.get("/", auth({ block: false }), ShopControl.apiGetShops);

router.post("/", auth({ block: true }), ShopControl.apiCreateShop );

router.patch("/:shop_id", auth({ block: true }), ShopControl.apiUpdateShop );

router.delete("/:shop_id", auth({ block: true }), ShopControl.apiDeleteShop );


module.exports = router;