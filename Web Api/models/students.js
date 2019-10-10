const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    middleName: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        minlength: 5,
        maxlength: 50, 
        required: true 
    },
    studentId:{
        type: Number,
        unique: true,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
})



module.exports = mongoose.model('Student' , studentSchema)