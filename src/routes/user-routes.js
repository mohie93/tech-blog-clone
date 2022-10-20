const express = require("express");

const router = express.Router();
const controller = require("../controllers/users-controller");
const apiCallback = require("../middlewares/api-callback-middleware");
const {
  validateCreateUserRequest,
  validateLoginUserRequest,
  validateUpgradeUserMembershipRequest
} = require("../validators/user-validator");

router.post("/", validateCreateUserRequest, apiCallback(controller.createUser));

router.post("/login", validateLoginUserRequest, apiCallback(controller.loginUser));

router.delete("/logout", apiCallback(controller.logoutUser));

router.post("/upgrade_mebership", validateUpgradeUserMembershipRequest, apiCallback(controller.upgradeUserMembership));

module.exports = router;
