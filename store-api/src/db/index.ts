import { Client, QueryConfig, QueryResult } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT || 5432,
})

// Define types for the parameters and return value of the query function
interface QueryFunction {
  (
    text: string | QueryConfig,
    params?: any[],
    callback?: (err: Error, result: QueryResult<any>) => void,
  ): Promise<QueryResult<any>>
}

let query: QueryFunction
query = function (text, params, callback) {
  return client.query(text, params, callback)
}

export { query, client }
