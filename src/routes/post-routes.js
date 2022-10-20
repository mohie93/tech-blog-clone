const express = require("express");
const controller = require("../controllers/posts-controller");
const apiCallback = require("../middlewares/api-callback-middleware");
const {
  validateCreatePostRequest,
  validateRequestIncludesPostId,
  validateUpdatePostRequest
} = require("../validators/post-validator");

const router = express.Router();

router.get("/", apiCallback(controller.getPosts));

router.post("/", validateCreatePostRequest, apiCallback(controller.createPost));

router.get("/:postId", validateRequestIncludesPostId, apiCallback(controller.getPost));

router.patch("/:postId", validateUpdatePostRequest, apiCallback(controller.updatePost));

router.delete("/:postId", validateRequestIncludesPostId, apiCallback(controller.deletePost));

module.exports = router;
