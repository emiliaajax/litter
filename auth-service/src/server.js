import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'

/**
 * Express server.
 */
const main = async () => {
  const app = express()

  // Enable application/json.
  app.use(express.json({ limit: '500kb' }))

  // Helmet HTTP headers.
  app.use(helmet())

  // Logger middleware.
  app.use(logger('dev'))

  // Handle errors.
  app.use((err, req, res, next) => {
    if (!err.status) err.status = 500

    // Filtered/unfiltered errors.
    if (req.app.get('env') !== 'development') {
      return res.status(err.status).json({
        message: err.message,
        status: err.status
      })
    }
    return res.status(err.status).json(err)
  })

  // Start express server.
  app.listen(process.env.PORT, () => {
    console.log(`Server has started at http://localhost:${process.env.PORT}/
    Press Ctrl-C to terminate...`)
  })
}

main().catch(console.error)
