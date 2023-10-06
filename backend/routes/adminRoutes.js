const { getAllUsers, getAllDoctors, changeAccountStatus } = require('../controllers/adminCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = require('express').Router()


router.get('/getallusers', authMiddleware, getAllUsers)
router.get('/getalldoctors', authMiddleware, getAllDoctors)
router.post('/changeAccountStatus', authMiddleware, changeAccountStatus)

module.exports  = router