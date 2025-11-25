const joi = require("joi");
const httpStatus = require("http-status");

const ApiError = require("./../utils/ApiError");
const validate = (schema) => (req, res, next) => {
  const keys = Object.keys(schema);
  const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});
  const { value, error } = joi.compile(schema).validate(object);
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(",");
    next(new ApiError(httpStatus.BAD_REQUEST, errors));
  }
  return next();
};

module.exports = validate;
