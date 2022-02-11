var jwt = require("jsonwebtoken");
require("dotenv").config();

//login validation
exports.verifyToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization;

    if (!token) res.status(400).send({ result: "access denied !!!" });

    const user = jwt.decode(token, { comlete: true });
    const userRole = user.userRole;
    const JWT_KEY = process.env.JWT_KEY;
    if (token && userRole == "vendor") {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        res.send({ error: err.message }).status(500);
      }
    }
  } catch {
    return;
    res.status(403).send({ result: "access denied !!!" });
  }
};
exports.verifyUser = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    if (!token) res.status(400).send({ result: "access denied !!!" });

    const JWT_KEY = process.env.JWT_KEY;
    try {
      jwt.verify(token, JWT_KEY);
      next();
    } catch (err) {
      res.send({ error: err.message }).status(500);
    }
  } catch {
    return;
    res.status(403).send({ result: "access denied !!!" });
  }
};

// admin authorization
exports.verifyAdminToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    const user = jwt.decode(token, { comlete: true });
    if (user.userIsAdmin) {
      next();
    } else {
      res.status(403).send({ error: "Access denied !!!" });
      return;
    }
  } catch {
    res.status(403).send({ error: "Access denied !!!" });
    return;
  }
};

 
