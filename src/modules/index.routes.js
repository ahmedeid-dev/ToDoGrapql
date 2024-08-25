import userRouter from './user/user.routes.js';
import noteRouter from './note/note.routes.js';

export const bootstrap = (app) => {
    app.use('/user', userRouter)
    app.use('/note', noteRouter)
    app.use('/graphql',graphqlRouter)
}