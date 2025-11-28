const express = require("express");
const router = express.Router();
const { articleValidation } = require("./../validations");
const { articleController } = require("./../controllers");
const { validate } = require("./../middlewares/validate");
// const auth = require("./../middlewares/auth");

router.get("/", articleController.getArticles);
router.get("/:id", articleController.getArticleById);
router.post("/", validate(articleValidation.createArticleSchema), articleController.createArticle);
router.put("/:id", validate(articleValidation.createArticleSchema), articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
