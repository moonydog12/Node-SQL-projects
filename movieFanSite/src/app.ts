import express from 'express'
import helmet, { contentSecurityPolicy } from 'helmet'
import path from 'path'
import passport from 'passport'
import githubStrategy from 'passport-github'
import session from 'express-session'

import indexRouter from './routes/index'
import strategyConfigs from './configs/passport'

const app = express()
const port = 8080
const GitHubStrategy = githubStrategy.Strategy

app.use(helmet())

// 設定 session
app.use(
  session({
    secret: 'I love JS',
    resave: false,
    saveUninitialized: false,
  }),
)

// 設定 passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(
  new GitHubStrategy(
    strategyConfigs,
    (accessToken, refreshToken, profile, cb) => {
      // 通過驗證後回傳使用者資料
      return cb(null, profile)
    },
  ),
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})
// 設定模板引擎
app.set('views', path.join(__dirname, '../src/views'))
app.set('view engine', 'ejs')

// 設定 middleware
app.use(
  // 設定 Content Secure Policy 允許存取圖片
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        'ajax.googleapis.com',
        'maxcdn.bootstrapcdn.com',
      ],
    },
  }),
)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  }),
)
app.use(express.static(path.join(__dirname, '../src/public')))

app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
