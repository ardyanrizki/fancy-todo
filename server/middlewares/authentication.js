const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET)
        
        req.decoded = decoded
        next()
    } catch (error) {
        res.status(401).json({message: 'Invalid token'})
    }
}

module.exports = {authentication}