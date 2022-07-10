const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    shop_id: { type: String, required: true }, 
    //bike_id : { type: String },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    //timestamp: { type: Date, required: true },
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;