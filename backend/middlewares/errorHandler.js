const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(new Error("server error"), err.toString());
  res.status(500).send(`Caught by error middleware ${err}`);
};

module.exports = errorHandler;

/*

*/
