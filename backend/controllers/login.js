const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
  
  if(!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Username password did not match'
    })
  }

  const userForToken = {
    userName: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name})
})

loginRouter.put('/', async (req, res) => {
  const body = req.body  
  const decodedToken = jwt.verify(req.token, config.SECRET)
  
  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null ? false : await bcrypt.compare(body.currentPassword, user.passwordHash)
  
  if(!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Username password did not match'
    })
  }

  const saltRounds = 10 
  const newPasswordHash = await bcrypt.hash(body.newPassword, saltRounds)

  const updatedProperty = {
    passwordHash: newPasswordHash
  }

  await User.findByIdAndUpdate(decodedToken.id, updatedProperty, (error, result) => {
    if(error) {
      res.status(500).json({
        error: 'Something went wrong'
      })
    } else {
      res.status(200).json({
        msg: 'Successfully updated the password'
      })
    }
  })

})


module.exports = loginRouter