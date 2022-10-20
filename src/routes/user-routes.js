const express = require("express");

const router = express.Router();
const controller = require("../controllers/users-controller");
const apiCallback = require("../middlewares/api-callback-middleware");
const {
  validateCreateUserRequest,
  validateLoginUserRequest,
  validateRequestIncludesUserId
} = require("../validators/user-validator");

router.post("/", validateCreateUserRequest, apiCallback(controller.createUser));

router.post("/login", validateLoginUserRequest, apiCallback(controller.loginUser));

router.get("/:userId", validateRequestIncludesUserId, apiCallback(controller.getUser));

router.patch("/:userId", validateRequestIncludesUserId, apiCallback(controller.updateUser));

router.post("/:userId/upgrade_mebership", validateRequestIncludesUserId, apiCallback(controller.upgradeUserMembership));

router.delete("/logout", apiCallback(controller.logoutUser));

module.exports = router;
