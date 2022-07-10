const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    shop_id: { type: String, required: true }, 
    //bike_id : { type: String },
    /* problems:{ type: Array, required: true },
    price:{ type: Number, required: true }, */
    comment:{ type: String, required: true },
    status:{ type: String, default: "active" },
    //invoice_id: { type: String },
    /* 
    before_pics:{ type: Array },
    after_pics:{ type: Array }, 
    */
    //timestamp:{ type:Date },
});

const Repair = mongoose.model("Repair", repairSchema);
module.exports = Repair;