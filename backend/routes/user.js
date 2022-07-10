const router = require("express").Router();
const auth = require("../middlewares/auth");
const UserControl = require("../controllers/user")


router.get("/", auth({ block: false }), UserControl.apiGetSearchedUsers);

router.get("/:user_id", auth({ block: false }), UserControl.apiGetOneUser);

router.post("/", auth({ block: true }), UserControl.apiCreateUser );

router.patch("/:user_id", auth({ block: true }), UserControl.apiUpdateUser );

router.delete("/:user_id", auth({ block: true }), UserControl.apiDeleteUser );


module.exports = router;