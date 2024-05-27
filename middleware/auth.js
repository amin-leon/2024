// middleware/auth.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Token not provided.' });
  }

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid.' });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
