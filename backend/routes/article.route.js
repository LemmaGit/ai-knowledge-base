const express = require("express");
const router = express.Router();
const { articleValidation } = require("./../validations");
const { articleController } = require("./../controllers");
const validate = require("./../middlewares/validate");
// const auth = require("./../middlewares/auth");

router.get("/", articleController.getArticles);
router.post("/", validate(articleValidation), articleController.createArticle);
// router.post(
//   "/",
//   auth,
//   validate(blogValidation.createBlogSchema),
//   blogController.createBlog
// );

module.exports = router;
