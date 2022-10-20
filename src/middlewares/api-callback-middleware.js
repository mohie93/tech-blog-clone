module.exports = (api) => async (req, res) => {
  try {
    const { statusCode, data } = await api(req, res);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error({ "API Error": error });
    const { statusCode, response } = error;
    if (!statusCode || !response) return res.status(500).json({ error });
    return res.status(statusCode).json(response);
  }
};
