const Category = require("../models/category-model");

exports.createCategory = async (req) => {
  const category = new Category(req.body);
  await category.create();
  return { statusCode: 201, data: category };
};

exports.updateCategory = async (req) => {
  const { categoryId } = req.params;
  const payload = req.body;
  await Category.update(categoryId, payload);
  const updatedCategory = await Category.getById(categoryId);
  return { statusCode: 200, data: updatedCategory };
};

exports.deleteCategory = async (req) => {
  const { categoryId } = req.params;
  await Category.destroy(categoryId);
  return { statusCode: 204, data: {} };
};

exports.getCategories = async () => {
  const categories = await Category.getAll();
  return { statusCode: 200, data: categories };
};

exports.getCategory = async (req) => {
  const { categoryId } = req.params;
  const category = await Category.getById(categoryId);
  return { statusCode: 200, data: category };
};
