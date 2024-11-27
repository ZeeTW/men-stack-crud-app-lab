require('dotenv').config()
const methodOverride = require('method-override')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log('Connected to DB')
})

const Cat = require('./models/cats.js')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.get('/cats', async (req, res) => {
  const allCats = await Cat.find()
  res.render('cats/index.ejs', { allCats })
})

app.get('/cats/new', (req, res) => {
  res.render('cats/new.ejs')
})

app.post('/cats', async (req, res) => {
  if (req.body.isCute === 'on') {
    req.body.isCute = true
  } else {
    req.body.isCute = false
  }
  await Cat.create(req.body)
  res.redirect('/cats')
})

app.get('/cats/:catId', async (req, res) => {
  const cat = await Cat.findById(req.params.catId)
  res.render('cats/show.ejs', { cat })
})

app.delete('/cats/:catId', async (req, res) => {
  await Cat.findByIdAndDelete(req.params.catId)
  res.redirect('/cats')
})

app.get('/cats/:catId/edit', async (req, res) => {
  const cat = await Cat.findById(req.params.catId)
  res.render('cats/edit.ejs', { cat })
})

app.put('/cats/:catId', async(req,res)=>{
  if(req.body.isCute === 'on'){
    req.body.isCute = true
  } else {
    req.body.isCute = false
  }
  await Cat.findByIdAndUpdate(req.params.catId, req.body)

  res.redirect(`/cats/${req.params.catId}`)
})

app.listen(3000, () => {
  console.log('Listening')
})
