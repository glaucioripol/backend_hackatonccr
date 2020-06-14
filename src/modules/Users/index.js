import { Router } from 'express'

import { store } from './controllers'

export const userRoutes = Router()
  .post('/', store)
