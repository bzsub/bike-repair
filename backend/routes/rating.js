const router = require("express").Router();
const auth = require("../middlewares/auth");
const RatingControl = require("../controllers/rating");


router.get("/", auth({ block: false }), RatingControl.apiGetRatings)

router.post("/", auth({ block: true }), RatingControl.apiSaveRating)

router.patch("/:rating_id", auth({ block: true }), RatingControl.apiUpdateRating);

router.delete("/:rating_id", auth({ block: true }), RatingControl.apiDeleteRating); // isDeleted: true ;)


module.exports = router;