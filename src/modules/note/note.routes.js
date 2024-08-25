import protectedRoute from './../../middleware/auth.middleware.js';
import * as noteCtrl from './note.controllers.js'
import { Router } from "express";

const noteRouter = Router();

noteRouter.use(protectedRoute)

noteRouter
    .post('/create', noteCtrl.create)
    .put('/update', noteCtrl.update)
    .delete('/delete', noteCtrl.deleteNote)
    .get('/all', noteCtrl.getAll)

export default noteRouter