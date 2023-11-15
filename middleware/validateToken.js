import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  try {
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      let token = authHeader.split(" ")[1];
      if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) {
            res.status(401);
            throw new Error(err);
          }
          // Append user info to request object and
          // Skip to next middleware / route using next()
          req.userInfo = decoded.user;
          next();
        });
      } else {
        res.status(401);
        throw new Error("User is not authorized");
      }
    }
  } catch (error) {
    next(error);
  }
};

export default validateToken;
