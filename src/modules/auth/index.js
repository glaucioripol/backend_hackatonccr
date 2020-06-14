import { Router } from 'express'

import { auth, requestToAuth } from './controllers'

export const authRoutes = Router()
  .post('/', auth)
  .post('/gen-hash', requestToAuth)
