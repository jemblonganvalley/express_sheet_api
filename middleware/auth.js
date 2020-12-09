require("dotenv").config();

const auth_middleware = (req, res, next) => {
  const { token } = req.body;
  if (token === process.env.TOKEN) {
    next();
  } else {
    res.status(404).json({
      message: "token not found !",
    });
    res.end();
  }
};

module.exports = auth_middleware;
