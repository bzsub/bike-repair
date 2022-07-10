const auth = require("../middlewares/auth");
const router = require("express").Router();
const AuthControl = require("../controllers/auth")


router.post("/login", auth({ block: false }), AuthControl.apiLoginWithProvider );


module.exports = router;