import protectedRoute from './../../middleware/auth.middleware.js';
import * as noteCtrl from './note.controllers.js'
import { Router } from "express";

const noteRouter = Router();

noteRouter.use(protectedRoute)

noteRouter
    .post('/', noteCtrl.create)
    .put('/:id', noteCtrl.update)
    .delete('/:id', noteCtrl.deleteNote)
    .get('/', noteCtrl.getAll)
    .get('/:id', noteCtrl.getOne)

export default noteRouter