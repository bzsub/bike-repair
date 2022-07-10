const router = require("express").Router();
const auth = require("../middlewares/auth");
const ShopControl = require("../controllers/shop")


router.get("/", auth({ block: false }), ShopControl.apiGetShops);

router.get("/:shop_id", auth({ block: false }), ShopControl.apiGetOneShop);

router.post("/", auth({ block: true }), ShopControl.apiCreateShop );

router.patch("/:shop_id", auth({ block: true }), ShopControl.apiUpdateShop );

router.delete("/:shop_id", auth({ block: true }), ShopControl.apiDeleteShop ); // isDeleted: true ;)


module.exports = router;