import { config } from 'dotenv'
import { server } from './core/server'
import { connect } from './core/database'

async function main() {
  config()
  try {
    await connect()
    await server().start()
  } catch (error) {
    console
      .error('Failed to start application', error)
  }
}

main()
