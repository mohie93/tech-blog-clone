const Joi = require("joi");
const baseValidator = require("./base-validator");
const Post = require("../models/post-model");

const postExists = async (postId) => await Post.getById(postId);

const postSchema = {
  createPost: Joi.object({
    title: Joi.string().required().min(5).max(30),
    categoryId: Joi.string().uuid().required(),
    body: Joi.string().required(),
    status: Joi.string().required().valid("draft", "publisged", "pending review"),
    label: Joi.string().required().valid("premium", "normal")
  }),

  updatePost: Joi.object({
    postId: Joi.string().required(),
    title: Joi.string().min(5).max(30),
    categoryId: Joi.string().uuid(),
    body: Joi.string(),
    status: Joi.string().valid("draft", "publisged", "pending review"),
    label: Joi.string().valid("premium", "normal")
  }),

  postIdOperation: Joi.object({
    postId: Joi.string().required()
  })
};

exports.validateCreatePostRequest = async (req, res, next) => {
  try {
    await baseValidator.validate(req.body, postSchema.createPost);
    return next();
  } catch (error) {
    return res.status(422).json(error);
  }
};

exports.validateUpdatePostRequest = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!(await postExists(postId))) return res.status(422).json({ data: { message: "post not found" } });

    await baseValidator.validate(
      {
        ...req.body,
        postId
      },
      postSchema.updatePost
    );

    return next();
  } catch (error) {
    return res.status(422).json(error);
  }
};

exports.validateRequestIncludesPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!(await postExists(postId))) return res.status(404).json({ data: { message: "post not found" } });

    await baseValidator.validate(postId, postSchema.postIdOperation);

    return next();
  } catch (error) {
    return res.status(404).json({ message: "post not found" });
  }
};
