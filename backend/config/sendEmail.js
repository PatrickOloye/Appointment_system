const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.EMAIL_SERVICE,
    auth:{
        user: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD
    }
})

module.exports = {
    
    verificationEmail: async(senderAddress, link)=>{
    let error = false
    try {
        await transporter.sendMail({
            from: '<Specialists@noreply.com>',
            to: senderAddress,
            subject: 'Email Verification',
            html: `Please verify your email by clicking the link: || <a href=${link}>here</a> <br/> <br/> Please note that the link expires in 24 hours`
        })
    } catch (e) {
        console.log(e.message)
        error = true
    }
   return error
},
    forgotPasswordEmail: async(senderAddress, link)=>{
    let error = false
    try {
        await transporter.sendMail({
            from: '<Specialists@noreply.com>',
            to: senderAddress,
            subject: 'Reset Password',
            html: `Please reset your password by clicking the link: || <a href=${link}>here</a> <br/> <br/> Please note that the link expires in 24 hours`
        })
    } catch (e) {
        console.log(e.message)
        error = true
    }
   return error
},
}