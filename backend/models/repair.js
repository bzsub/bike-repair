const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    shop_id: { type: String, required: true }, 
    //bike_id : {type:String},
    problems:{ type: Array, required: true },
    price:{ type: Number, required: true },
    user_comment:{ type: String, required: true },
    //invoice_id: { type: String },
    //status:{ type: String, required: true },
    /* 
    before_pics:{ type: Array },
    after_pics:{ type: Array }, 
    */
    //timestamp:{ type:Date },
});

const Repair = mongoose.model("Repair", repairSchema);
module.exports = Repair;