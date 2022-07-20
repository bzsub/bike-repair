const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    shop_id: { type: String, required: true }, 
    shopName: { type: String},
    services: { 
        flatTire: { type: Boolean}, 
        chainSwap: { type: Boolean},
        wheelSwap: { type: Boolean}, 
    },
    price: { type: Number},
    comment:{ type: String, required: true },
    status:{ type: String, default: "active" },
});

const Repair = mongoose.model("Repair", repairSchema);
module.exports = Repair;