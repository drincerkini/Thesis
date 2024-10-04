// const jwt = require("jsonwebtoken");

// const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];
//     if (!token)
//       return res
//         .status(401)
//         .json({ message: "Access denied, no token provided." });

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;

//       if (roles.length && !roles.includes(req.user.role)) {
//         return res
//           .status(403)
//           .json({ message: "Access denied, insufficient permissions." });
//       }

//       next();
//     } catch (err) {
//       res.status(401).json({ message: "Invalid token." });
//     }
//   };
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token from the header
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token (user data) to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
