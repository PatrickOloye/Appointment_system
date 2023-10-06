const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Doctor = require("../models/docModel")
const Appointment = require('../models/AppointmentModel')
const moment = require('moment')
const tokenGen = require('../config/createToken')
const {verificationEmail, forgotPasswordEmail} = require('../config/sendEmail')

const registerUser = async(req, res) =>{
    try {
        const {fullName, email, password} = req.body
        const existingUser = await User.findOne({email: req.body.email})
        if(existingUser) {
            return res.status(400).send({Message: 'User Already Exists', success: false})
    }
    if(!fullName || !email || !password){
        return res.status(400).send({success: false, message: 'Please provide all inputs'})
    }
    
    
    if(password?.length < 8){
        return res.status(400).send({success: false, message:'Password length should be at least, eight characters'})
    }
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword
    const newUser = new User(req.body)
    await newUser.save()
    const token = tokenGen({email: newUser.email})

    const link = "http://"+req.hostname + ':3030/api/doc/user/verify?token='+ token;

    const sendEmail = await verificationEmail(newUser.email, link)
    if(sendEmail){
        return res.status(201).send({success: true, message: 'registration successfull. Error in sending verification email' })
    }
    res.status(201).send({success: true, message: 'registration successfull ' })
    } catch (error) {
        console.log(error);
       return  res.status(500).send({success: false, message: `registration failed. ${error.message} `})
    }
   
}


const loginUser = async(req, res) =>{
    const {email, password} = req.body
    try {
        if(!email || !password){
            return res.status(400).send({message:"Please provide all inputs"})
        }
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).send({success: false, message: "User not found"})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(400).send({success: false, message: 'invalid email or password'})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE, {
           expiresIn: '1d'  
        } )
        res.status(200).send({success: true, message: 'login successfull', token})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error in Login Ctrl ${error.message}`})
    }
    
}

const authController = async(req, res) =>{
    try {
        const user = await User.findById({_id: req.body.userId})
        // console.log(req.body.userId)
        user.password = undefined

        if(!user){
            return res.status(200).send({
                message: 'user not found',
                success: false
            })
        }else{
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}

const applyDoctor = async(req, res) =>{
    try {
        const newDoctor = await Doctor({...req.body, status: "pending" })
        await newDoctor.save()
        const adminUser = await User.findOne({isAdmin: true})
        const notification = adminUser.notification
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await User.findByIdAndUpdate(adminUser._id, {notification})
        res.status(201).send({
            success: true,
            message: `application successfull`
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while applying as a doctor"
        })
    }
}


const getAllNotifications = async(req, res) =>{
    try {
        const user = await User.findOne({_id:req.body.userId})
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: 'All notifications seen',
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error in notification',
            success: false,
            error
        })
    }
}

const deleteAllNotifications = async(req, res) => {
    try {
        const user = await User.findOne({_id:req.body.userId})
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(201).send({
            success: true, 
            message: 'notifications deleted successfully ',
            data: updatedUser

        }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'unable to delete all messages',
            error
        })
    }
}

const getAllDoctors = async(req,res) =>{
    try {
        const doctors = await Doctor.find({status:'approved'})
        res.status(200).send({
            success: true,
            message: "Doctors list fetched successfully",
            data:doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'an error occurred while fetching doctor data'
        })
    }
}

const bookAppointment = async(req,res) =>{
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time, 'HH:mm').toISOString()
        req.body.status = 'pending'
        const newAppointment = new Appointment(req.body)
        await newAppointment.save()
        const user = await User.findOne({_id: req.body.doctorInfo.userId})
        user.notification.push({
            type: 'Request-For-Appointment',
            message: `A new Request-for-Appointment from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        })
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Appointment Booked successfully'
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success: false,
            error,
            message: 'There was a problem while booking an appointment'
        })
    }
}

const bookingAvailability = async(req, res) =>{
    try {
        const date = moment(req.body.date, "DD-MM-YY").toISOString()
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, "HH:mm").add(1, 'hours').toISOString()
        const doctorId = req.body.doctorId
        const appointments = await Appointment.find({doctorId,
            date,
            time: {
                $gte:fromTime, $lte:toTime
            }
        })
        if(appointments.length > 0){
            return res.status(200).send({
                message: 'Appointment not availablle at this time',
                success: true
            })
        }else{
            return res.status(200).send({
                success: true,
                message: 'Time is available to book an appointment'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in booking"
        })
    }
}

const userAppointments = async(req, res) => {
    try {
        const appointments = await Appointment.find({
            userId: req.body.userId,
        });
        res.status(200).send({
            success: true,
            message: "User's Appointment is successfully fetched",
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error getting appointments"
        })
    }
}

const forgotPassword = async(req, res) =>{
    try {
        const {email} = req.body 
        if(!email) {
           return  res.status(400).send({success: false, mesage: 'Please provide your registered email address'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({
                success: false, 
                message: 'user is not found'
            })
        }

        const token = tokenGen({email: newUser.email})

    const link = "http://"+req.hostname + ':3030/api/doc/user/verifyToken?token='+ token;

    const sendEmail = await forgotPassword(newUser.email, link)
    if(sendEmail){
       return  res.status(200).send({success: true, message: 'please check your email for a reset link'})
    }else{
       return res.status(200).send({success: true, message: 'There was an issue in sending reset mail'})
    }

    } catch (error ) {
        console.log(error.message)
        res.status(500).send({
            success: false,
            error,
            message: "error getting appointments"
        })
    }
}

const verifyToken = async(req, res) =>{

    try {
        const {token} = req.query

    if(!token){
        return res.status(404).json({
            success: false,
            message: 'Invalid Token'
        })
    }
    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRETE)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send({
            success: false, 
            message: "Invalid Token ",
            error
        })
    }
    const user = await User.findOne({email: decodedToken.email })
    if(!user){return res.status(400).send({success: false, Message: 'user not found'})}
    res.status(200).send({
        status: true, 
        data: decodedToken.email
    })
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            success: false,
            message: " something went wrong",
            error
        })
    }
    
}

const resetPassword = async() =>{
    const {email,  newPassword, confirmNewPassword} = req.body
    try {
        if( !email || !newPassword || confirmNewPassword){
            return res.status(400).send({
                success: false, 
                message: 'Please provide all fields'
            })
        }
        const user = await User.findOne({email })
        if(!user){return res.status(400).send({success: false, Message: 'user not found'})}
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        req.body.newPassword = hashedPassword
        const updatedUser = await User.findOneAndUpdate({email}, {
            $set:{
                password: hashedPassword
            }
        })
        if(updatedUser){
            res.status(200).send({
                success: true,
                message: 'password updated successfully. Please log in'
            })
        }else{
            res.status(400).send({
                success: false, 
                message: "something went wrong"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'something went wrong'
        })
    }
}

const verifyEmail = async(req, res) =>{
    try {
        const {token} = req.query;
        if(!token){
            return res.status(404).json({
                success: false,
                message: 'Invalid Token'
            })
        }
        let decodedToken;
        try {
            decodedToken = await jwt.verify(token, process.env.JWT_SECRETE)
        } catch (error) {
            console.log(error.message)
            return res.status(400).send({
                success: false, 
                message: "Invalid Token ",
                error
            })
        }
        const user = await User.findOne({email: decodedToken.email })
        if(!user){return res.status(400).send({success: false, Message: 'user not found'})}
        user.verified = true
        await user.save()
        res.status(200).send({
            status: true, 
            message: "verification successfuill"
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success: false,
            message: 'something went wrong'
        })
    }
}

module.exports = {
    loginUser, registerUser, authController, applyDoctor, getAllNotifications, deleteAllNotifications, getAllDoctors, bookAppointment, bookingAvailability, userAppointments,forgotPassword, verifyToken, resetPassword, verifyEmail
}