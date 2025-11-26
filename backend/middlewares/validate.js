const joi = require("joi");
const { status } = require("http-status");

const ApiError = require("./../utils/ApiError");

const prepareObj = (schema, req) => {
  const keys = Object.keys(schema);
  const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});
  return object;
};

const handleSchemaError = (error, next) => {
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(",");
    return next(new ApiError(status.BAD_REQUEST, errors));
  }
  return next();
};

const validate = (schema) => (req, res, next) => {
  const object = prepareObj(schema, req);
  const { value, error } = joi.compile(schema).validate(object);
  handleSchemaError(error, next);
};

const validateAsync = (schema) => (req, res, next) => {
  const object = prepareObj(schema, req);
  const { value, error } = joi.compile(schema).validateAsync(object);
  handleSchemaError(error, next);
};
module.exports = {
  validate,
  validateAsync,
};
