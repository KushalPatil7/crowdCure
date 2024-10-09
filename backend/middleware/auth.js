import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    let decoded;
    if (token.startsWith('Bearer ')) {
      // For OAuth tokens
      const idToken = token.split(' ')[1];
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = { id: payload.sub, email: payload.email };
    } else {
      // For JWT tokens
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
