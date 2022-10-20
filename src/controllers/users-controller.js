const User = require("../models/user-model");

exports.createUser = async (req) => {
  const user = new User(req.body);
  await user.create();

  delete user.base;
  delete user.password;

  return { statusCode: 201, data: user };
};

exports.loginUser = async (req) => {
  const user = await User.login(req.body.userName, req.body.password);

  if (user) {
    delete user.base;
    delete user.password;
    return { statusCode: 201, data: user };
  }

  return { statusCode: 401, data: "unathorised access" };
};

exports.logoutUser = async () => ({
  statusCode: 204,
  data: { message: "logout" },
});

exports.upgradeUserMembership = async () => ({
  statusCode: 201,
  data: { message: "plan upgraded" },
});
