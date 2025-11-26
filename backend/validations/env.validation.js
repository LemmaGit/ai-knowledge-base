const joi = require("joi");
const envVarSchema = joi
  .object({
    DB_CONNECTION: joi.string().required(),
    PORT: joi.number().positive().default(3000),
    NODE_ENV: joi.string().valid("development", "production").required(),
    FRONTEND_URL: joi.string().uri().required(),
    JWT_SECRET: joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: joi.number().required(),
    JWT_REFRESH_EXPIRATION_DAYS: joi.number().required(),
    EMAIL_USER_NAME: joi.string().required(),
    EMAIL_PASSWORD: joi.string().required(),
  })
  .unknown(true);
module.exports = envVarSchema;
