import express from 'express'
import morgan from 'morgan'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const app = express()
const port = process.env.PORT || 3000

app.set('port', port)

app.use(morgan('combined'))

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port)
console.log('Server listening on *' + ':' + port) // eslint-disable-line no-console
