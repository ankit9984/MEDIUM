import jwt from 'jsonwebtoken';

export const generateToken = async (res, payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true});
        return token;
    } catch (error) {
        res.status(500).json({ message: 'Error generating token' });
        throw error;
    }
};

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({error: 'Unauthorized(missing token)'})
    };

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(500).json({error: 'Unauthorized(Invalid token)'})
    }
};