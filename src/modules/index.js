import { Router } from 'express'

import { authRoutes } from './auth'
import { userRoutes } from './Users'

export const routes = Router()
  // public routes
  .use('/auth', authRoutes)
  .use('/users', userRoutes)
  // private routes
