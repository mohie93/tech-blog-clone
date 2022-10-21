const User = require("../models/user-model");
const Payment = require("../models/payment-model");

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

// This endpoint will be callback_url for BillPlz and it will be called if BillPlz request back with 200 status code
exports.upgradeUserMembership = async (req) => {
  const { userId } = req.params;
  const user = await User.getById(userId);

  if (user.membership === "permium") return { statusCode: 422, data: "account is already premium" };

  const { id: paymentId, amount, payment_channel: paymentMethod, status } = req.body;
  await Payment.update(paymentId, { amount, paymentMethod, status });
  if (status === "completed") {
    await User.update(userId, { membership: "permium" });
    const updatedUser = await User.getById(userId);
    return { statusCode: 200, data: updatedUser };
  }

  return { statusCode: 400, data: "Failed to catch payment" };
};
