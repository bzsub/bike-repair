const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

const corsOptions = {
  origin: process.env.APP_URL, // a FE localhost kell ide
  optionsSuccessStatus: 200,
};

morgan.token("host", function (req, res) {
  return req.hostname;
});

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(morgan(":method :url :status - HOST: :host  - :response-time ms")); // use this middleware on every request


const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const ratingRoutes = require("./routes/rating");
app.use("/api/rating", ratingRoutes);

const shopRoutes = require("./routes/shop");
app.use("/api/shop", shopRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);


app.get("/", (req, res) => {
  console.log("Health check completed");
  res.sendStatus(200);
});

app.use(errorHandler);

module.exports = app;

/*

*/
