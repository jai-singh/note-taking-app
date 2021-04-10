const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

userRouter.post('/', async (req, res) => {
  const body = req.body  
  if(!body.password || !(body.password.length >= 8) || !body.username) {
    if(!(body.password.length >= 8)) {
      res.status(400).json({'error': 'Password is too short'})
    } else {
      res.status(400).json({'error': 'Password or Username not provided'})
    }     
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

  const userForToken = {
    userName: savedUser.username,
    id: savedUser.id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res
    .status(201)
    .send({ token, username: user.username, name: user.name})
})


module.exports = userRouter