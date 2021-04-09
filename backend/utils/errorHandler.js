const errorHandler = (error, req, res, next) => {
  if(error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TypeError') {
    return res.status(400).json({
      error: 'Bad Request'
    })
  }
  next(error)
}

module.exports = errorHandler