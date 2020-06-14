import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)

const connectionStates = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconecting'
}

export const getConnectionState = () =>
  connectionStates[mongoose.connection.readyState] || connectionStates[0]

export const isConnected = () =>
  mongoose.connection.readyState === 1

export const connect = () => {
  console.log(new Date(), 'Database connected')
  return mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
}

export const disconnect = () => {
  console.log(new Date(), 'Database disconnect')
  return mongoose.disconnect(process.env.MONGO_DB_URI)
}
