const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

userRouter.post('/', async (req, res) => {
  const body = req.body  
  if(!body.password || !(body.password.length >= 8) || !body.username) {
    let error = ''
    if(!(body.password.length >= 8)) {      
       error = 'Password is too short'
       if(body.password.length === 0)  error = 'Password not provided'
    } else {
      error = 'Username not provided'
    } 
    return res.status(400).json({'error': error})
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