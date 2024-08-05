const { verifyToken } = require("../helper");

const AdminAuth = (req, res, next) => {
  const apiKey = req.headers.authorization;
  try {
    console.log(req.token);
    if (verifyToken(apiKey)) {
      next();
    } else {
      res.send({
        msg: "Unauthorized",
        status: 0,
      });
    }
  } catch (error) {
    console.error("Error in AdminAuth middleware:", error);
    res.status(500).send({
      msg: "Internal Server Error",
      status: -1,
    });
  }
};

module.exports = AdminAuth;
