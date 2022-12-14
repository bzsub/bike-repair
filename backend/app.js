const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth");
//const ratingRoutes = require("./routes/rating");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");
const repairRoutes = require("./routes/repair");

morgan.token("host", (req, res) => req.hostname );

app.use(cors({origin: process.env.APP_URL}));
app.use(express.json()); 
app.use(morgan(":method :url :status - HOST: :host  - :response-time ms")); 

app.use("/api/auth", authRoutes);
//app.use("/api/rating", ratingRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/user", userRoutes);
app.use("/api/repair", repairRoutes);

app.use(errorHandler);

module.exports = app;