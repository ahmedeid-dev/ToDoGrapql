import * as userCtrl from './user.controllers.js'
import { Router } from "express";

const userRouter = Router();

userRouter
    .post('/login', userCtrl.login)
    .post('/signup', userCtrl.signup)
    .post('/logout', userCtrl.logout)
    

export default userRouter