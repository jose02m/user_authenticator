export const authRequired = (req, res, next) => {
    const token = req.cookies;
    res.send(token)
    console.log(token);
    next();
}
    