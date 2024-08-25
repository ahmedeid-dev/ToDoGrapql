process.on('unhandledRejection', error => { console.log('unhandledRejection', error) })
import { bootstrap } from './src/modules/index.routes.js'
import dbConnection from './database/dbConnection.js'
import express from 'express'

const app = express()
const port = 3000

dbConnection()
bootstrap(app)
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Hello World!' }))
app.get('*', (req, res) => res.json({ message: 'Not Found' }))

process.on('unhandledRejection', error => { console.log('unhandledRejection', error) })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))