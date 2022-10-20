const Joi = require("joi");
const baseValidator = require("./base-validator");
const Category = require("../models/category-model");

const categoryExists = async (categoryId) => await Category.getById(categoryId);

const categorySchema = {
  createcategory: Joi.object({
    name: Joi.string().required().min(5).max(30),
    description: Joi.string().required().min(10),
    activated: Joi.boolean().required()
  }),

  updatecategory: Joi.object({
    categoryId: Joi.string().required(),
    name: Joi.string().min(5).max(30),
    description: Joi.string().min(10),
    activated: Joi.boolean()
  }),

  categoryIdOperation: Joi.object({
    categoryId: Joi.string().required()
  })
};

exports.validateCreateCategoryRequest = async (req, res, next) => {
  try {
    await baseValidator.validate(req.body, categorySchema.createcategory);
    return next();
  } catch (error) {
    return res.status(422).json(error);
  }
};

exports.validateUpdateCategoryRequest = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!(await categoryExists(categoryId))) return res.status(422).json({ data: { message: "category not found" } });

    await baseValidator.validate(
      {
        ...req.body,
        categoryId
      },
      categorySchema.updatecategory
    );

    return next();
  } catch (error) {
    return res.status(422).json(error);
  }
};

exports.validateRequestIcnludesCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!(await categoryExists(categoryId))) return res.status(404).json({ data: { message: "category not found" } });

    await baseValidator.validate(categoryId, categorySchema.categoryIdOperation);

    return next();
  } catch (error) {
    return res.status(404).json({ message: "category not found" });
  }
};
