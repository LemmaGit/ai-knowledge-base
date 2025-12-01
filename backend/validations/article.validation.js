const joi = require("joi");

const createArticleSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    author: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional(),
    content: joi.string().required(),
    summary: joi.string().optional(),
    // description: joi.string().required(),
    tags: joi.array().items(joi.string()).optional(),
    likes: joi.number().default(0),
  }),
};

module.exports = {
  createArticleSchema,
};
