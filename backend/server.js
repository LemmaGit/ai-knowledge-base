const express = require("express");

const app = express();
const { errorHandler, errorConverter } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("<h1>HI</h1>");
});

// Path not found
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
