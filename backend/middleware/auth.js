import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    try {
        // Get token from header or cookies
        const token = 
            (req.headers?.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]) ||
            req.headers?.['x-auth-token'] ||
            req.cookies?.token;
        
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Add token blacklist check
        if (await isTokenBlacklisted(token)) {
            return res.status(401).json({ msg: 'Token has been invalidated' });
        }

        // Add token expiration check
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ msg: 'Token has expired' });
        }

        // Get user from database
        const user = await User.findById(decoded.user.id).select('-password');
        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        // Enhanced error handling
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token format' });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired' });
        }
        console.error('Auth middleware error:', err);
        res.status(500).json({ msg: 'Internal server error during authentication' });
    }
};

// Export as both default and named export
export { auth };
export default auth;
