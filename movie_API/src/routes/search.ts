import express, { NextFunction, Request, Response } from 'express'
import movies from '../data/movies'
import people from '../data/people'

const router = express.Router()

function queryRequired(req: Request, res: Response, next: NextFunction) {
  const searchQuery = req.query.query
  if (!searchQuery) {
    return res.json({ msg: 'Query is required.' })
  }
  next()
}

// 這個 middleware 會在所有 search 路由觸發，但不會在 movie 路由觸發
router.use(queryRequired)

router.get('/movie', (req, res, next) => {
  const searchQuery = req.query.query as string
  const results = movies.filter((movie) => {
    let found =
      movie.overview.includes(searchQuery) || movie.title.includes(searchQuery)
    return found
  })
  res.json({ results })
})

router.get('/person', (req, res, next) => {
  const searchQuery = req.query.query as string
  const results = people.filter((person) => {
    let found = person.name.includes(searchQuery)
    return found
  })
  res.json({ results })
})

export default router
