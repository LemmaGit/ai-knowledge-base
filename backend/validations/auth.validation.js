const joi = require("joi");
const { getUserByEmail } = require("../services/auth.service");

const baseSchema = {
  body: joi.object().keys({
    password: joi.string().required(),
  }),
};
const signupSchema = {
  body: baseSchema.body.keys({
    email: joi
      .string()
      .email()
      .required()
      .external(async (email, helpers) => {
        const existingUser = await getUserByEmail(email);
        if (existingUser) throw new Error("Email is taken");
        return email;
      }),
  }),
};
const loginSchema = {
  body: baseSchema.body.keys({
    email: joi.string().email().required(),
  }),
};

const refreshTokenSchema = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};

module.exports = {
  loginSchema,
  signupSchema,
  refreshTokenSchema,
};
