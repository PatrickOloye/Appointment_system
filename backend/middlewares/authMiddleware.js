const JWT = require('jsonwebtoken')


module.exports = (req, res, next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1]
    JWT.verify(token,process.env.JWT_SECRETE,(err, decode)=>{
        if(err){
            return res.status(200).send({
                message: 'Auth failed',
                success: false
            })
        }else{
            req.body.userId = decode.id
            next()
        }
    })
    } catch (error) {
        console.log(error.message);
        res.status(401).send({
            message: 'Auth failed',
            success: false
        })
    }

}