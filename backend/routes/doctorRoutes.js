const router =  require('express').Router() 
const { getDoctorInfo, updateProfile, getDoctorById, doctorAppointments, updateStatus } = require('../controllers/doctorCtrl')
const authMiddleware = require('../middlewares/authMiddleware')


//get single doctor
router.post('/getDoctorInfo', authMiddleware, getDoctorInfo )
router.post('/updateProfile', authMiddleware, updateProfile)
router.post('/getDoctorById', authMiddleware, getDoctorById)
router.get('/doctor-appointments', authMiddleware, doctorAppointments)
router.post('/update-status', authMiddleware, updateStatus)

module.exports = router