require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/', async (req, res) => {
  res.render('index.ejs')
})

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log('Connected to DB')
})

const Cat = require('./models/cats.js')

app.get('/cats/new', (req, res) => {
  res.render('cats/new.ejs')
})

app.listen(3000, () => {
  console.log('Listening')
})
