/* VARIABLES */
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const addMovie = require('../model/addMovie')
const fs = require('fs')
const path = require('path')
const multer  = require('multer')


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



/* GET HOMEPAGE */
router.get('/', (req, res) => {
    res.render('index')
})

/* GET MOVIES */
router.get('/get', async (req, res) => {
    let cards = await addMovie.find({})
    res.send(cards)
})

/* DELETE MOVIE */
router.delete('/remove', async (req, res) => {
    const id = await new mongoose.Types.ObjectId(req.body.id);
    const filename = await req.body.filename;
    try{
        let card = await addMovie.deleteOne({id: id})

        let filePath = `public/img/${filename}`; 
        fs.unlinkSync(filePath);

        res.sendStatus(200)
    }catch(error) {
        res.sendStatus(400)
    }
})

/* UPDATE MOVIE */
router.put('/update',upload, async (req, res) => {
    const id = await new mongoose.Types.ObjectId(req.body.id);
    const filename = await req.body.filename;
    const findedMovie = await addMovie.findOne({_id: id})
    
    if(req.body.movieName !== '' && req.body.desc !== ''){
        findedMovie.movieName = req.body.movieName
        findedMovie.desc = req.body.desc
        findedMovie.save()
        res.sendStatus(200)
    }else{
        res.sendStatus(400)
    }
})


module.exports = router