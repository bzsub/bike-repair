const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  /* email: { type: String },
  password: { type: String }, */
  entity: { type: String, default: "shop" },
  providers: {
    google: { type: String, sparse: true, unique: true },
    github: { type: String, sparse: true, unique: true },
  },
  
  username: { type: String, required: true },
  //prof_pics: { type: String },
  prices: {
    "flatTire": { type: Number, required: true },
    "chainSwap": { type: Number, required: true },
    "wheelSwap": { type: Number, required: true },
    /* "pedal-swap": { type: Number, required: true },
    "front-wheel-swap": { type: Number, required: true },
    "rear-wheel-swap": { type: Number, required: true },
    "one-gear-swap": { type: Number, required: true },
    "general-settings-and-oiling": { type: Number, required: true },
    "all-gear-swap": { type: Number, required: true }, */
  },
  /* hours: { 
    "monday": { type: Array, required: true },
    "tuesday": { type: Array, required: true },
    "wednesday": { type: Array, required: true },
    "thursday": { type: Array, required: true },
    "friday": { type: Array, required: true },
    "saturday": { type: Array, required: true },
    "sunday": { type: Array, required: true },
  },
  //bank info, address
  moreData: { type: String }  */
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;

/*
todos: { type: todoSchema, default: () => [] }, // empty list is default?
*/
