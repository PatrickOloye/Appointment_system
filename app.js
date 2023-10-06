const express = require('express')
const morgan = require('morgan')
const connectDb = require('./backend/config/db')
const userRoute = require('./backend/routes/userRoutes')
const adminRoute = require('./backend/routes/adminRoutes')
const docRoute = require('./backend/routes/doctorRoutes')
require('dotenv').config()
const cors = require('cors')

//mongodb connection
connectDb();

const app = express()

const port  = process.env.PORT || 3030

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/doc/user', userRoute)
app.use('/api/doc/admin', adminRoute)
app.use('/api/doc/doctor', docRoute)


app.listen(port, ()=>{
    console.log(`server running on ${process.env.NODE_MODE} mode on port ${process.env.PORT}`)
})


