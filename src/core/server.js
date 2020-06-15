import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'

import { routes } from '../modules'

export function server() {
  const app = express()

  app
    .use(express.json())
    .use(helmet())
    .use(cors())
    .use(compression())
    .use(routes)

  return {
    start: () => app.listen(process.env.port || 3333, () => console.log('server up'))
  }
}
