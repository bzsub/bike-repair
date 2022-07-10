const auth = require("../middlewares/auth");
const router = require("express").Router();
const AuthControl = require("../controllers/auth")

router.post("/login", auth({ block: false }), AuthControl.apiLoginWithProvider );

router.post("/create/user", auth({ block: true }), AuthControl.apiCreateUser);

router.post("/create/shop", auth({ block: true }), AuthControl.apiCreateShop);

module.exports = router;