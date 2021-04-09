const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  date: {
    type: String,
    required: true
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note