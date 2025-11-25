const express = require("express");
const { status } = require("http-status");
const app = express();
const { errorHandler, errorConverter } = require("./middlewares/error");
const { articleRouter } = require("./routes");
const ApiError = require("./utils/ApiError");

app.use(express.json());
app.use("/articles", articleRouter);

app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
