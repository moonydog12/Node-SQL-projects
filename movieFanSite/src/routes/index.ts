import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'

dotenv.config({
  path: '../.env',
})

const router = express.Router()
const API_KEY = process.env.API_KEY
const apiBaseUrl = 'http://api.themoviedb.org/3'
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${API_KEY}`
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'

router.use((req, res, next) => {
  // 把資料寫入 locals 物件，讓路由頁面都可以使用這個變數
  res.locals.imageBaseUrl = imageBaseUrl
  next()
})

router.get('/', async (req, res, next) => {
  try {
    const response = await fetch(nowPlayingUrl)
    const data = await response.json()
    res.render('index', {
      parsedData: data.results,
    })
  } catch (error) {
    console.log('Error', error)
  }
})

router.get('/login', passport.authenticate('github'))

router.get(
  '/auth',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/loginFailed',
  }),
)

router.get('/movie/:id', async (req, res, next) => {
  const movieId = req.params.id
  const theMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${API_KEY}`
  try {
    const response = await fetch(theMovieUrl)
    const parsedData = await response.json()
    res.render('single-movie', { parsedData })
  } catch (error) {
    console.log('Error', error)
  }
})

router.post('/search', async (req, res, next) => {
  // movieSearch 是對應前端表單的 name attribute
  const userSearchTerm = encodeURI(req.body.movieSearch)

  // 前端取值設定成 movie | person，可以直接插入API網址
  const cat = req.body.cat

  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${API_KEY}`

  try {
    const response = await fetch(movieUrl)
    const data = await response.json()

    // 如果搜尋 query 是人名，必須根據 api 格式去調整
    if (cat === 'person') {
      data.results = data.results[0].known_for
    }

    res.render('index', {
      parsedData: data.results,
    })
  } catch (error) {
    console.log('Error', error)
  }
})

export default router
