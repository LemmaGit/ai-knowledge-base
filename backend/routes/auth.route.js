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

module.exports = router;
