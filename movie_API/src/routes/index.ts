import express from 'express'
import movies from '../data/movies'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('index')
})

router.get('/most_popular', (req, res, next) => {
  let page = parseInt(req.query.page as string, 10) || 1
  const startIndex = (page - 1) * 20

  // 找出有 most_popular 屬性的電影
  let results = movies.filter((movie) => movie.most_popular)

  // Pagination
  results = results.slice(startIndex, startIndex + 19)

  res.json({ page, results })
})

export default router
