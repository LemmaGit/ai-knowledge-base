const { Article } = require("./../models");

const createArticle = async (data) => {
  const newArticle = await Article.create(data);
  return newArticle;
};

const getArticles = async () => {
  const articles = await Article.find().populate("author", "name email");
  return articles;
};

const getArticleById = async (articleId) => {
  const articles = await Article.findById(articleId).populate(
    "author",
    "name email"
  );
  return articles;
};

const updateArticle = async (articleId, data) => {
  const updatedArticle = await Article.findByIdAndUpdate(articleId, data, {
    new: true,
  });
  return updatedArticle;
};

const deleteArticle = async (articleId) => {
  const deletedArticle = await Article.findByIdAndDelete(articleId);
  return deleteArticle;
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
