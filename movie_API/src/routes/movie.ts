import express, { Request, Response, NextFunction } from 'express'
import movieDetails from '../data/movieDetails'

const router = express.Router()

function requireJSON(req: Request, res: Response, next: NextFunction) {
  if (!req.is('application/json')) {
    return res.json({ msg: 'Content type must be application/json' })
  }

  next()
}

// 回傳最高評價電影
router.get('/top_rated', (req, res, next) => {
  let page = parseInt(req.query.page as string, 10) || 1
  const startIndex: number = (page - 1) * 20

  // 陣列排序(根據電影評價)
  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average
  })

  res.json({
    results: results.slice(startIndex, startIndex + 19),
    count: results.length,
  })
})

// 回傳單一電影資訊
router.get('/:movieId', (req, res, next) => {
  const movieId = parseInt(req.params.movieId, 10)
  const result = movieDetails.find((movie) => {
    return movie.id === movieId
  })

  if (!result) {
    return res.json({
      msg: 'Movie is not found',
      production_companies: [],
    })
  }
  res.json(result)
})

router.post('/:movieId/rating', requireJSON, (req, res, next) => {
  const movieId = req.params.movieId
  const userRating = req.body.value

  if (!userRating || userRating < 0.5 || userRating > 10) {
    return res.json({ msg: 'Rating must be between .5 and 10' })
  }

  res.json({ msg: 'Thank you for submitting your rating.', status_code: 200 })
})

router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
  res.json({ msg: 'Rating deleted!' })
})

export default router
