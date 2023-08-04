import jwt from 'jsonwebtoken';

export default (payload: {id: number}) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    });
}