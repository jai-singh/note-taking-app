const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const notesRouter = require('./controllers/notes')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const errorHandler = require('./utils/errorHandler')
require('dotenv').config()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/notes', notesRouter)
app.use('/api/signup', userRouter)
app.use('/api/signin', loginRouter)
app.use(errorHandler)
module.exports = app