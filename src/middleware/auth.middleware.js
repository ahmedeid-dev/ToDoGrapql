import User from './../../database/model/user.model.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const protectedRoute = asyncHandler(async (req, res, next) => {
    // ? checking token exist
    const token = req.headers.token
    if (!token) return res.status(401).json({ error: 'error', message: "You are not authorized" })
    // ? verifying token
    const decoded = jwt.verify(token, "mysecretkey", (err, decoded) => {
        err && res.status(401).json({ error: 'error', message: "You are not authorized" })
        return decoded
    })
    // ? checking user exist
    const user = await User.findById(decoded.id)
    !user && res.status(401).json({ error: 'error', message: "You are not authorized" })
    // ? checking token is valid
    req.user.userId = user._id
    req.user.email = user.email
    req.user.status = user.status

    next()
})

export default protectedRoute