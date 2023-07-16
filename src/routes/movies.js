const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// GET ALL MOVIES
router.get('/', async (req, res)=>{
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// GET SINGLE MOVIE
router.get('/:id', getMovie, async (req, res)=>{
  res.json(res.movie)
})

// CREATE MOVIE
router.post('/', async (req, res)=>{
  const movie = new Movie({
    name: req.body.name,
    year: req.body.year,
    nominations: req.body.nominations,
    watched: req.body.watched
  })

  try {
    const newMovie = await movie.save()
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// UPDATE MOVIE
router.patch('/:id', getMovie, async (req, res)=>{
  if(req.body.name != null && req.body.watched != null){
    res.movie.name = req.body.name
    res.movie.watched = req.body.watched
  } else {
    res.status(400).json({message: 'Both the name and the watched fields are required'})
    return
  }
  res.movie.nominations = req.body.nominations
  res.movie.year = req.body.year

  try {
    const updatedMovie = await res.movie.save()
    res.json(updatedMovie)
  } catch (error) {
    res.status(400).json({message: error.message})
  }

})

// DELETE MOVIE
router.delete('/:id', getMovie, async (req, res)=>{
  try {
    await res.movie.deleteOne()
    res.json({ message: 'Deleted Movie'})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// MIDDLEWARE TO GET A SINGLE MOVIE
async function getMovie(req, res, next){
  let movie
  try {
    movie = await Movie.findById(req.params.id)
    if(movie == null){
      return res.status(404).json({ message: 'Cannot find movie'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.movie = movie
  next()
}

module.exports = router