const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

notesRouter.get('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.SECRET)

  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const notes = await Note
    .find({user: decodedToken.id})

  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const decodedToken = jwt.verify(req.token, config.SECRET)

  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const note = await Note
    .find({user: decodedToken.id, _id: id})

  res.json(note)
})

notesRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(req.token, config.SECRET)

  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    title: body.title,
    content: body.content,
    date: Date.now().toString(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.json(savedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const decodedToken = jwt.verify(req.token, config.SECRET)

  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const note = await Note
    .findById(id)

  if(note.user.toString() === decodedToken.id.toString()) {
    await Note.findByIdAndDelete(id)
    res.status(204).end()
  } else {
    res.status(401).json({
      error: 'Unauthorized'
    })
  }
})

notesRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body
  const decodedToken = jwt.verify(req.token, config.SECRET)

  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const note = await Note.findById(id)

  if(note.user.toString() === decodedToken.id.toString()) {
    const updatedProperty = {
      title: body.title,
      content: body.content
    }
  
    const updatedNote = await Note
      .findByIdAndUpdate(id, updatedProperty, {new: true} )
    
    res.json(updatedNote)
  } else {
    res.status(401).json({
      error: 'Unauthorized'
    })
  }
  
})

module.exports = notesRouter