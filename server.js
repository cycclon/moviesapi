require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open',()=>console.log('Connected to Database.'))

app.use(express.json())
app.use(cors())

// CATEGORIES
const categoriesRouter = require('./src/routes/categories')
app.use('/categories', categoriesRouter)

// MOVIES
const moviesRouter = require('./src/routes/movies')
app.use('/movies', moviesRouter)

//USERS
const usersRouter = require('./src/routes/users')
app.use('/users', usersRouter)

app.listen(process.env.PORT || 3001, () => console.log('Server started...'))