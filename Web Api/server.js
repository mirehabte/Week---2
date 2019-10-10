
const express = require('express')
const app = express()
const config = require('config')
const userRouter = require('./routes/user')
const regRouter = require('./routes/registration')
const loginRouter = require('./routes/login')
const studentRouter = require('./routes/student')
const staffRouter = require('./routes/staff')

/*if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}*/


const mongoose = require('mongoose')

mongoose.connect(config.get('DATABASE_URL'), {useCreateIndex:true, useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('Connected to Database ....'))
.catch((err) => console.error('Failed to connect' , err))

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())

app.use('/api/user' , userRouter)
app.use('/api/registration', regRouter)
app.use('/api/login' , loginRouter)
app.use('/api/student' , studentRouter)
app.use('/api/staff', staffRouter)



app.listen(process.env.PORT || 4000, () => console.log('Server Listening on port 4000'))



