const router = require("express").Router();
const auth = require("../middlewares/auth");
const RepairControl = require("../controllers/repair");

//NOT IN USE
//router.get("/", auth({ block: false }), RepairControl.apiGetRepair)

router.get("/:repair_id", auth({ block: false }), RepairControl.apiGetRepairById)

router.get("/shop/:shop_id", auth({ block: true }), RepairControl.apiGetRepairToShop)

router.get("/user/:user_id", auth({ block: true }), RepairControl.apiGetRepairToUser)

router.post("/", auth({ block: true }), RepairControl.apiSaveRepair)

router.patch("/:repair_id", auth({ block: true }), RepairControl.apiUpdateRepair);

//NOT IN USE
//router.delete("/:repair_id", auth({ block: true }), RepairControl.apiDeleteRepair); // isDeleted: true ;)


module.exports = router;