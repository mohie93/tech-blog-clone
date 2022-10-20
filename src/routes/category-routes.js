const express = require("express");
const controller = require("../controllers/categories-controller");
const apiCallback = require("../middlewares/api-callback-middleware");
const {
  validateCreateCategoryRequest,
  validateRequestIcnludesCategoryId,
  validateUpdateCategoryRequest
} = require("../validators/category-validator");

const router = express.Router();

router.get("/", apiCallback(controller.getCategories));

router.post("/", validateCreateCategoryRequest, apiCallback(controller.createCategory));

router.get("/:categoryId", validateRequestIcnludesCategoryId, apiCallback(controller.getCategory));

router.patch("/:categoryId", validateUpdateCategoryRequest, apiCallback(controller.updateCategory));

router.delete("/:categoryId", validateRequestIcnludesCategoryId, apiCallback(controller.deleteCategory));

module.exports = router;
