const express = require("express");
const cors = require("cors");
const { status } = require("http-status");
const { errorHandler, errorConverter } = require("./middlewares/error");
const { articleRouter, authRouter } = require("./routes");
const ApiError = require("./utils/ApiError");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/articles", articleRouter);
app.use(authRouter);
app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
