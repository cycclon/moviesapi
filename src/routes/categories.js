const express = require('express')
const router = express.Router()
const Category = require('../models/category')

// GET CATEGORIES
router.get('/', async (req, res)=>{
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// GET SINGLE CATEGORY
router.get('/:id', getCategory, async (req, res)=>{
  res.json(res.category)
})

// CREATE CATEGORY
router.post('/', async (req, res)=>{
  const category = new Category({
    name: req.body.name
  })

  try {
    const newCategory = await category.save()
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// UPDATE CATEGORY
router.patch('/:id', getCategory, async (req, res)=>{
  if (req.body.name != null){
    res.category.name = req.body.name
    res.category.showDetails = req.body.showDetails
  }

  try {
    const updatedCategory = await res.category.save()
    res.json(updatedCategory)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// DELETE CATEGORY
router.delete('/:id', getCategory, async (req, res)=>{
  try {
    await res.category.deleteOne()
    res.json({ message: 'Deleted Category'})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// MIDDLEWARE TO GET A SINGLE CATEGORY
async function getCategory(req, res, next) {
  let category
  try {
    category = await Category.findById(req.params.id)
    if(category == null){
      return res.status(404).json({ message: 'Cannot find cateogory'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.category = category
  next()
}

module.exports = router