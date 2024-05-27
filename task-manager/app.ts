import express, { json } from 'express'

import sequelize from './sequelize'
import taskRoutes from './routes/tasks'

const port = 8080
const app = express()

// middleware
app.use(json())

// routes
app.use('/api/v1/tasks', taskRoutes)

app.listen(port, async () => {
  try {
    await sequelize.authenticate()
    console.log(`Listening on port ${port} and connect to database`)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
