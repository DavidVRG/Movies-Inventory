/* VARIABLES */
const express = require('express')
const router = express.Router()
const multer  = require('multer')
const path = require('path')
const mongoose = require('mongoose')
const addMovie = require('../model/addMovie')

/* MULTER SETTINGS */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
  })

function fileFilter (req, file, cb) {  
 
    if(file.originalname !== '' && req.body.movieName !== '' && req.body.desc !== ''){
        cb(null, true)
    }else{
        cb(null, false);
    }
}

const upload = multer({ storage: storage , fileFilter: fileFilter}).single('image')


/* GET ADD PAGE */
router.get('/', (req, res) => {
    res.render('add/index')
})

/* POST A NEW MOVIE */
router.post('/', upload, async (req, res) => {

    try{
        const file = await req.file.filename
        const movieName = await req.body.movieName
        const desc = await req.body.desc

        const movie = await new addMovie({
            movieName: movieName,
            desc: desc,
            filename: file
        })

        const newMovie = await movie.save()

        res.render('add/index', {
            message: 'New movie added!'
        })
    }catch (error) {
        res.render('add/index', {
            errorMessage: 'Input fields or the image field is empty!'
        })
    }
    
})

module.exports = router