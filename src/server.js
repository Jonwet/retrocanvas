import express from 'express'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectToDatabase } from './config/mongoose.js' // lint complaining its not used but if i dont have this i don't get localhost to my defined port so idk.

try {
  // Connect to MongoDB.
  // await connectToDatabase(process.env.DB_CONNECTION_STRING)

  // Creates an Express application.
  const app = express()

  app.get('/', (req, res) => {
    res.render('index') // Looks for views/index.ejs
  })

  // Get the directory name of this module's path.
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Set the base URL to use for all relative URLs in a document.
  const baseURL = process.env.BASE_URL || '/'

  // View engine setup.
  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  // app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
  app.set('layout extractScripts', true)
  app.set('layout extractStyles', true)
  // app.use(expressLayouts)

  app.use((req, res, next) => {
    // Pass the base URL to the views.
    res.locals.baseURL = baseURL

    next()
  })

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))

  // Serve static files.
  app.use(express.static(join(directoryFullName, '..', 'public')))

  // ---------------------------------------------------
  // ⚠️ WARNING: Development Environment Only!
  //             Detailed error information is provided.
  // ---------------------------------------------------

  // Starts the HTTP server listening for connections.
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${server.address().port}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
