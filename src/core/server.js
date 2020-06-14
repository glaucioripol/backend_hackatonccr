import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'

import { userRoutes } from '../modules/Users'

export function server() {
  const app = express()

  app.use(express.json())
  app.use(helmet())
  app.use(cors())
  app.use(compression())

  app.use('/users', userRoutes)

  return {
    start: () => app.listen(3333, () => console.log('server up'))
  }
}
