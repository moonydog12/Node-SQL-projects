import express, { json } from 'express'

import taskRoutes from './routes/tasks'

const port = 8080
const app = express()

// middleware
app.use(json())

// routes
app.use('/api/v1/tasks', taskRoutes)

app.listen(port)
console.log(`Listening on port ${port}`)
