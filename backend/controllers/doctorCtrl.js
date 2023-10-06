const Doctor = require("../models/docModel")
const User = require('../models/AppointmentModel')

const Appointment = require('../models/AppointmentModel')



const getDoctorInfo = async(req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true, 
            message: 'Doctor data fetching was successfull',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error occured while getting doctor data'
        })
    }
}


//update Doctor Profile 
const updateProfile = async(req, res) =>{
    try {
        const doctor = await Doctor.findOneAndUpdate({userId:req.body.userId}, req.body)
        res.status(201).send({
            success: true,
            message: 'doctor profile updated',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Doctor profile was not updated',
            error
        })
    }
}


const getDoctorById = async(req, res) => {
    try {
        const doctor = await Doctor.findOne({_id:req.body.doctorId})
        // console.log(req.body)
        // console.log("food:", doctor)
        res.status(200).send({
            success: true,
            response: 'Single Doctor Info fetched',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error is single doctor file'
        })
    }
}

const doctorAppointments = async(req, res) =>{
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId})
        const appointments = await Appointment.find({doctorId: doctor._id})
        res.status(200).send({
            success: true, 
            message: "Doctor Appointments fetched Successfully",
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while fetching doctors appointment'
        })
    }
}

const updateStatus = async(req, res) =>{
    try {
        const {appointmentsId, status} = req.body
        const appointments = await Appointment.findByIdAndUpdate(appointmentsId, {status})
        // const userNum = appointments.userId
        console.log(appointments)
        const user = await User.findOne({ _id: appointments.userId });
            console.log(user)
        const notification = user.notification

        notification?.push({
            type: 'status updated',
            message: `your appointment has been ${status}`,
            onClickPath: '/doctor-appointments'
        })
        await user.save() 
        res.status(200).send({
            success: true,
            message: "Appointment Status updfated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating status'
        })
    }
}

module.exports = {getDoctorInfo, updateProfile, getDoctorById, doctorAppointments, updateStatus}