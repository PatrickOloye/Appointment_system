const { loginUser, registerUser, authController,  applyDoctor, getAllNotifications, deleteAllNotifications,getAllDoctors, bookAppointment, bookingAvailability, userAppointments, forgotPassword, verifyToken, resetPassword, verifyEmail } = require('../controllers/userCtr')
const authMiddleware = require('../middlewares/authMiddleware')

const router = require('express').Router()


router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/verifyToken', verifyToken)
router.post('/resetPassword', resetPassword)
router.post('/verifyEmail', verifyEmail)
router.post('/forgotPassword', forgotPassword)
router.post('/getUserData', authMiddleware, authController)
router.post('/apply-doctor', authMiddleware, applyDoctor)
router.post('/getAllNotifications', authMiddleware, getAllNotifications)
router.post('/deleteAllNotifications', authMiddleware, deleteAllNotifications)
router.get('/getAllDoctors', authMiddleware, getAllDoctors)
router.post('/book-appointment', authMiddleware, bookAppointment)
router.post('/bookingAvailability', authMiddleware, bookingAvailability)
router.get('/user-appointments', authMiddleware, userAppointments)

module.exports = router