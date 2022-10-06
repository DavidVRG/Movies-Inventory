/* ENV CONFIG */
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')

/* BASIC SETS */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/* ROUTES SET */
const indexRoute = require('./routes/index')
const addRoute = require('./routes/add')

/* MONGODB/MONGOOSE */
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => {console.log(error)})
db.on('open', () => {console.log('MongoDB Connected!')})

/* ROUTES USE */
app.use('/', indexRoute)
app.use('/add', addRoute)


app.listen(process.env.PORT || 3000)