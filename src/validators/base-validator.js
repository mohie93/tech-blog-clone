// Params
// Payload refers to the data received from external via request body or params
// Schema refers to the whitelisted data that can be passed via request.

exports.validate = async (payload, schema) => {
  try {
    await schema.validateAsync(payload, { allowUnknown: false });
    return true;
  } catch (error) {
    const errorsMessages = error.details.map((err) => err.message);
    return { statusCode: 422, valid: false, errors: errorsMessages };
  }
};
