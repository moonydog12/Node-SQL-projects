import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import notFoundMiddleware from './src/middleware/not-found'
import errorHandlerMiddleware from './src/middleware/error-handler'
import * as db from './src/db'
import productsRouter from './src/routes/products'

dotenv.config()
const app = express()
const port = process.env.PORT

// middleware
app.use(express.json())

// routes
app.get('/', async (req: Request, res: Response) => {
  const result = await db.query('SELECT * FROM tasks')
  res.send(result.rows)
})

app.use('/api/v1/products', productsRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

async function startServer() {
  try {
    app.listen(port)
    await db.client.connect()
    console.log(`Listeining on port ${port}`)
  } catch (error) {
    console.log(error)
  }
}

startServer()
