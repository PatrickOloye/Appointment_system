const jwt = require('jsonwebtoken')


module.exports = (data) =>{
    return jwt.sign(data, process.env.JWT_SECRETE, {expiresIn: '1d'})
}