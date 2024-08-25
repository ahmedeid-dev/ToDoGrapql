import protectedRoute from '../../middleware/auth.middleware.js';
import * as userCtrl from './user.controllers.js'
import { Router } from "express";

const userRouter = Router();

userRouter
    .post('/login', userCtrl.login)
    .post('/signup', userCtrl.signup)
    .patch('/changePassword', protectedRoute, userCtrl.changePassword)
    .put('/update', protectedRoute, userCtrl.update)
    .delete('/delete', protectedRoute, userCtrl.deleteAccount)


export default userRouter