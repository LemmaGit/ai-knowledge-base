const express = require("express");
const router = express.Router();
const { authValidation } = require("./../validations");
const { authController } = require("./../controllers");
const validate = require("./../middlewares/validate");

router.post(
  "/signup",
  validate(authValidation.signupSchema),
  authController.signup
);
router.post(
  "/login",
  validate(authValidation.loginSchema),
  authController.login
);
router.get("/verify-email", authController.verifyEmail);
router.post(
  "/auth/refresh-token",
  validate(authValidation.refreshTokenSchema),
  authController.refreshAuthToken
);

module.exports = router;
