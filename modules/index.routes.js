export const bootstrap = (app) => {
    app.use('/user', userRouter)
    app.use('/note', noteRouter)
    app.use('/graphql',graphqlRouter)
}