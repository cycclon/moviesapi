const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
let hp

// CREATE PASSWORD HASH
async function hashPassword(pass) {
  hp = await bcrypt.hash(pass, 10)
}


async function comparePassword(pass, hash) {
  const result = await bcrypt.compare(pass, hash)
  return result
}

// GET ALL USERS
router.get('/', async (req, res)=>{
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// GET SINGLE USER
router.get('/:id', getUser, async (req, res)=>{
  res.json(res.user)
})

// VALIDATE PASSWORD
router.post('/validatepwd/:id', getUser, async (req, res)=>{
  const result = await comparePassword(req.body.password, res.user.password)
  res.status(201).json({ validated: result })
})

// CREATE USER
router.post('/', async (req, res)=>{  
  await hashPassword(req.body.password)
  //console.log(hp)
  const user = new User({
    username: req.body.username,
    password: hp
  })
 
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// DELETE USER
router.delete('/:id', getUser, async (req, res)=>{
  try {
    await res.user.deleteOne()
    res.json({message: `User ${res.user.username} deleted`})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// UPDATE WATCHED/RECOMENDED MOVIES
router.patch('/:id', getUser, async (req, res)=>{
  try {
    res.user.watchedmovies = req.body.watchedmovies
    res.user.recommendations = req.body.recommendations
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// UPDATE RECOMMENDED MOVIES
// router.patch('/:id', getUser, async (req, res)=>{
//   try {
//     res.user.recommendations = req.body.recommendations
//     const updatedUser = await res.user.save()
//     res.json(updatedUser)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// MIDDLEWARE TO GET A SINGLE USER
async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if(user == null){
      return res.status(404).json({ message: 'Cannot find user'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.user = user
  next()
}

module.exports = router