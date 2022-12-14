import mongoose from 'mongoose'

/**
 * Connect to database.
 *
 * @returns {Promise} Resolve if connected.
 */
export const connectToDatabase = async () => {
  mongoose.connection
    .on('error', (err) => console.error(`MongoDB error: ${err}`))
    .on('connected', () => console.log('MongoDB connected.'))
    .on('disconnected', () => console.error('MongoDB disconnected.'))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.error('MongoDB disconnected due to application termination.')
      process.exit(0)
    })
  })

  return mongoose.connect(process.env.DB_CONNECTION_STRING)
}
