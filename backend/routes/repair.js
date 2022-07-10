const router = require("express").Router();
const auth = require("../middlewares/auth");
const RepairControl = require("../controllers/repair");


router.get("/", auth({ block: false }), RepairControl.apiGetRepair)

router.get("/:repair_id", auth({ block: false }), RepairControl.apiGetRepairById)

router.get("/shop/:shop_id", auth({ block: true }), RepairControl.apiGetRepairToShop)

router.post("/", auth({ block: true }), RepairControl.apiSaveRepair)

router.patch("/:rating_id", auth({ block: true }), RepairControl.apiUpdateRepair);

router.delete("/:rating_id", auth({ block: true }), RepairControl.apiDeleteRepair); // isDeleted: true ;)


module.exports = router;