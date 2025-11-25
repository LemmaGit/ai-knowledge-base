require("dotenv").config();
const { envValidation } = require("./../validations");
const { value: envVars, error } = envValidation.validate(process.env);
if (error) {
  console.error(error);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  env: envVars.NODE_ENV,
  frontendURL: envVars.FRONTEND_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  emailInfo: {
    username: envVars.EMAIL_USER_NAME,
    password: envVars.EMAIL_PASSWORD,
  },
};
