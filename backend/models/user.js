const mongoose = require("mongoose");

/* const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img_urls: { type: Array },
}); */

const userSchema = new mongoose.Schema({
  /* email: { type: String, unique: true },
  password: { type: String }, */
  providers: {
    google: { type: String, sparse: true, unique: true },
    github: { type: String, sparse: true, unique: true },
  },

  username: { type: String, required: true }, 
  //prof_pics: { type: String },
  //bikes: [bikeSchema],
  //calendarToken
});

const User = mongoose.model("User", userSchema);
module.exports = User;

/*
todos: { type: todoSchema, default: () => [] }, // empty list is default?
*/
