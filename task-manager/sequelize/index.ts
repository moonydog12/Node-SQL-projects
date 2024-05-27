import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
})

export default sequelize
