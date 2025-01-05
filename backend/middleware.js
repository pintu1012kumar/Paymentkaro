const { jwtVerify } = require('jose');
const { JWT_SECRET } = require('./config');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using `jose`
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET) // Encode secret to Uint8Array
        );

        // Attach user information to the request object
        req.userId = payload.userId;

        next();
    } catch (err) {
        console.error('JWT Verification Failed:', err);
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = {
    authMiddleware
};
