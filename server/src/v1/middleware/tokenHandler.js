import JWT from 'jsonwebtoken';
import User from '../models/user.js';

// Verify JWT of the client
const tokenDecode = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const decodedToken = JWT.verify(bearer, process.env.TOKEN_SK);
            return decodedToken;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
}

// Verify JWT
export const verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        // find user with the JWT
        const user = await User.findById(tokenDecoded.id);
        if (!user) {
            return res.status(401).json('Unauthorized');
        }
        req.user = user;
        next();
    } else {
        return res.status(401).json('Unauthorized');
    }
};
