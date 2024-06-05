import dotenv from 'dotenv'

dotenv.config()

const strategyConfigs = {
  clientID: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  callbackURL: 'http://localhost:8080/auth',
}

export default strategyConfigs
