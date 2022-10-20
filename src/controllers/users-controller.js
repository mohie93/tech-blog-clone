const User = require("../models/user-model");

exports.createUser = async (req) => {
  const user = new User(req.body);
  await user.create();
  delete user.password;
  return { statusCode: 201, data: user };
};

exports.updateUser = async (req) => {
  const { userId } = req.params;
  const payload = req.body;
  await User.update(userId, payload);
  const updatedUser = await User.getById(userId);
  return { statusCode: 200, data: updatedUser };
};

exports.getUser = async (req) => {
  const { userId } = req.params;
  const user = await User.getById(userId);
  delete user.password;
  return { statusCode: 200, data: user };
};

exports.loginUser = async (req) => {
  const user = await User.login(req.body.userName, req.body.password);

  if (user) {
    delete user.password;
    return { statusCode: 201, data: user };
  }

  return { statusCode: 401, data: "unathorised access" };
};

exports.logoutUser = async () => ({
  statusCode: 204,
  data: { message: "logout" }
});

exports.upgradeUserMembership = async (req) => {
  const { userId } = req.params;
  const user = await User.getById(userId);

  if (user.membership === "permium") return { statusCode: 422, data: "account is already premium" };

  await User.update(userId, { membership: "permium" });
  const updatedUser = await User.getById(userId);
  return { statusCode: 200, data: updatedUser };
};
