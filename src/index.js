import { config } from 'dotenv'
import { server } from './core/server'
import { connect } from './core/database'

(async () => {
  config()
  try {
    await connect()
    await server().start()
  } catch (error) {
    console
      .error('Failed to start application', error)
  }
})()
