/**
 * The starting point of the application.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { router } from './routes/router.js'

try {
  // Creates an Express application.
  const app = express()

  // Sets HTTP headers to make application more secure.
  app.use(helmet())

  // Allow client
  const allowedOrigins = process.env.ORIGINS.split(',')
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }))

  // Sets up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Parses requests of the content type application/json.
  app.use(express.json())

  // Registers routes.
  app.use(process.env.BASE_URL, router)

  // Error handler.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      if (err.status === 500) {
        err.message = 'An unexpected condition was encountered.'
      }

      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }

    // Development only!
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        cause: err.cause
          ? {
              status: err.cause.status,
              message: err.cause.message,
              stack: err.cause.stack
            }
          : null,
        stack: err.stack
      })
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
