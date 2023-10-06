const Doctor = require('../models/docModel')
const User = require('../models/User')


const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send({
            success:true,
            message: 'users data',
            data: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "an error occurred while getting users",
            error
        })
    }
}


const getAllDoctors = async(req, res) => {
    try {
        const doctors = await Doctor.find({})
        res.status(200).send({
            success: true,
            message: 'Doctors data list',
            data:doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'an error occurred while getting doctors',
            error
        })
    }
}

const changeAccountStatus = async(req, res) =>{
    try {
        const {doctorId, status} = req.body
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {status})
        const user = await User.findOne({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type: 'Request for Doctor Account',
            message: `Your request for a Doctor account has been ${status}`,
            onClickPath: '/notification'
        })
        user.isDoctor = true
        user.isDoctor = status === 'approved' ? true : false
        await user.save()
        res.status(201).send({
            success: true,
            message: 'Account status Updated',
            data: doctor,
             
        })
    } catch (error) {
        console.log(500)
        res.status(500).send({
            success: false,
            message: " error in the account status",
            error
        })
    }
}


module.exports = {
    getAllUsers,
    getAllDoctors,
    changeAccountStatus
}