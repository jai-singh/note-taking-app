const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { response } = require('express')
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
  const body = req.body
  
  if(!body.password || body.password.length > 8 || !body.username) {
    console.log(body)
    res.status(400).json({'error': 'password or username not provided'})
    return
  }
  
  const saltRounds = 10   
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()
  
  res.json({'message': 'success'})
})

module.exports = userRouter