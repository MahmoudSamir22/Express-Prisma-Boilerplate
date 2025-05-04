import jwt from 'jsonwebtoken';

export default (payload: {id: number, role: string}) => {
    const access_token = jwt.sign(payload, process.env.JWT_SECRET_ACCESS!, {
        expiresIn: process.env.JWT_EXPIRATION_TIME_ACCESS
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_SECRET_REFRESH!, {
        expiresIn: process.env.JWT_EXPIRATION_TIME_REFRESH
    });
    return { access_token, refresh_token };
}