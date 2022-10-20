const Joi = require("joi");
const baseValidator = require("./base-validator");
const User = require("../models/user-model");

const emailInUse = async (email) => await User.getBy({ email });
const userNameInUser = async (userName) => await User.getBy({ userName });
const userExists = async (userId) => await User.getById(userId);

const userSchema = {
  create: Joi.object({
    userName: Joi.string().required().min(3).max(12),
    fullName: Joi.string().required().min(5).max(20),
    email: Joi.string().email().required(),
    type: Joi.string().default("user").valid("user", "admin"),
    password: Joi.string().required().min(8).max(20),
    membership: Joi.string().default("normal").valid("normal", "premium")
  }),

  login: Joi.object({
    userName: Joi.string().required().min(3).max(12),
    password: Joi.string().required().min(8).max(20)
  }),

  userIdOperation: Joi.object({
    userId: Joi.string().required().uuid()
  })
};

exports.validateCreateUserRequest = async (req, res, next) => {
  try {
    await baseValidator.validate(req.body, userSchema.create);

    if (await emailInUse(req.body.email)) return res.status(422).json({ data: { message: "email in use" } });

    if (await userNameInUser(req.body.userName)) return res.status(422).json({ data: { message: "user name in use" } });

    return next();
  } catch (error) {
    return res.status(422).json(error);
  }
};

exports.validateLoginUserRequest = async (req, res, next) => {
  try {
    await baseValidator.validate(req.body, userSchema.login);
    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.validateRequestIncludesUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!(await userExists(userId))) return res.status(401).json({ message: "unauthorised access" });
    await baseValidator.validate(req.body, userSchema.userIdOperation);
    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
};
