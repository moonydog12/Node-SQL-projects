import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'

import indexRouter from './routes/index'
import movieRouter from './routes/movie'
import searchRouter from './routes/search'

const app = express()
const port = 8080

function validateApiKey(req: Request, res: Response, next: NextFunction) {
  // 大型專案可能會使用 cookies/session 或是 JWT 來做驗證
  if (req.query.api_key !== '123456') {
    // Unauthorized code
    res.status(401)
    return res.json('Invalid api key')
  }
  next()
}

// 設定 middleware
app.use(helmet())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  }),
)

app.use(validateApiKey)
app.use('/', indexRouter)
app.use('/movie', movieRouter)
app.use('/search', searchRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
