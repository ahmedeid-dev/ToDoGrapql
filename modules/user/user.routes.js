import * as userCtrl from './user.controllers.js'
import { Router } from "express";

const userRouter = Router();

userRouter
    .post('/login', userCtrl.login)
    .post('/signup', userCtrl.signup)
    .patch('/changePassword', userCtrl.changePassword)
    .put('/update', userCtrl.update)
    .delete('/delete', userCtrl.deleteAccount)


export default userRouter