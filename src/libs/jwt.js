import jwt from 'jsonwebtoken';

export const createAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            user,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}
