const { status } = require("http-status");
const catchAsync = require("./../utils/catchAsync");
const { articleService } = require("./../services");

const createArticle = catchAsync(async (req, res) => {
  const article = await articleService.createArticle({
    ...req.body,
    author: req.user.id,
  });
  res.status(httpStatus.CREATED).json(article);
});

const getArticles = catchAsync(async (req, res) => {
  const articles = await articleService.getArticles();
  res.status(status.OK).json(articles);
});

const getArticleById = catchAsync(async (req, res) => {
  const article = await articleService.getArticleById(req.params.id);
  if (!article)
    return res.status(status.NOT_FOUND).json({ error: "Article not found" });
  res.status(status.OK).json(article);
});

const updateArticle = catchAsync(async (req, res) => {
  const article = await articleService.updateArticle(req.params.id, req.body);
  if (!article)
    return res.status(status.NOT_FOUND).json({ error: "Article not found" });
  res.status(status.OK).json(article);
});

const deleteArticle = catchAsync(async (req, res) => {
  const article = await articleService.deleteArticle(req.params.id);
  if (!article)
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ error: "Article not found" });
  res.status(httpStatus.OK).json({ message: "Article deleted" });
});

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
