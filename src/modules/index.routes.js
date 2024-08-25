import userRouter from './user/user.routes.js';
import noteRouter from './note/note.routes.js';
import { graphqlSchema } from './graphql/schema.js';
import { createHandler } from 'graphql-http/lib/use/express';
import playground from "graphql-playground-middleware-express";

export const bootstrap = (app) => {
    const expressPlayground = playground.default
    app.use('/user', userRouter)
    app.use('/note', noteRouter)
    app.use('/graphql', createHandler({ schema: graphqlSchema }))
    app.get('/gui', expressPlayground({ endpoint: '/graphql' }))
}