import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ error: 'Access token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid access token' });
        }

        req.user = user; // Attach the decoded user info to the request object
        
        next();
    })
}
    