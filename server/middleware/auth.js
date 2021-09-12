const JWT = require('jsonwebtoken');
const Admin = require("../models/admin");

const auth = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: decoded._id, "tokens.token": token });
    if(!admin) {
        throw new Error()
    }

    req.admin = admin;
    req.token = token;

    next();
  } catch (e) {
    console.error(e)
    res.status(400).send({
      Error: "Authentication Failed",
    });
  }
};

module.exports = auth;