import express from 'express'
import path from 'path'

import sequelize from './sequelize'
import taskRoutes from './routes/tasks'

const port = 8080
const app = express()

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/task', (req, res) => {
  res.render('task')
})

app.use('/api/v1/tasks', taskRoutes)

app.listen(port, async () => {
  try {
    await sequelize.authenticate()
    console.log(`Listening on port ${port} and connect to database`)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
