import { asyncHandler } from 'express-async-handler';
import User from './../../database/model/user.model.js';

const protectedRoute = asyncHandler(async (req, res, next) => {
    // ? checking token exist
    const token = req.headers.token
    !token && res.status(401).json("You are not authorized")
    // ? verifying token
    const decoded = jwt.verify(token, "mysecretkey", (err, decoded) => {
        err && res.status(401).json("You are not authorized")
        return decoded
    })
    // ? checking user exist
    const user = await User.findById(decoded.id)
    !user && res.status(401).json("You are not authorized")
    // ? checking token is valid
    req.user.userId = user._id
    req.user.email = user.email
    req.user.status = user.status
    
    next()
})

export default protectedRoute