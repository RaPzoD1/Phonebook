const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const peopleRouter = require('./controllers/people') 
const infoRouter = require('./controllers/info')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB: ',error.message)
    })

app.use(middleware.requestLogger)
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/persons',peopleRouter)
app.use('/info',infoRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app