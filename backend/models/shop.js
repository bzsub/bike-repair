const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  /* email: { type: String },
  password: { type: String }, */
  entity: { type: String, default: "shop" },
  providers: {
    google: { type: String, sparse: true, unique: true },
    github: { type: String, sparse: true, unique: true },
  },
  shopName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  locations: { 
    "zipCode": { type: String, required: true },
    "city": { type: String, required: true },
    "street": { type: String, required: true },
    "streetNum": { type: String, required: true },
    "apartment": { type: String },
  },
  prices: {
    "flatTire": { type: String, required: true },
    "chainSwap": { type: String, required: true },
    "wheelSwap": { type: String, required: true },
  },
  bankInfo: { 
    "bankName": { type: String, required: true },
    "IBAN": { type: String, required: true },
  },
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
