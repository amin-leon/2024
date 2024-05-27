import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthMiddleware {
  static async isAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
          status: "fail",
          message: "Missing or invalid authorization token",
        });
      }

      const token = authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized action",
        });
      }

      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
      } catch (error) {
        console.log('Token verification error:', error); // Debugging log
        return res.status(401).json({
          status: "fail",
          message: "Invalid or expired token",
        });
      }
    } catch (error) {
      console.log('Authentication error:', error); // Error log
      return res.status(500).json({
        status: "error",
        message: "An error occurred during authentication",
      });
    }
  }

  static checkRole(roles) {
    return (req, res, next) => {
      try {
        const user = req.user;
        if (!user) {
          return res.status(401).json({
            status: "fail",
            message: "Unauthorized action",
          });
        }

        if (roles.includes(user.role)) {
          return next();
        }

        return res.status(403).json({
          status: "fail",
          message: "You do not have permission to perform this task",
        });
      } catch (error) {
        console.log('Authorization error:', error); // Error log
        return res.status(500).json({
          status: "error",
          message: "An error occurred during authorization",
        });
      }
    };
  }
}
