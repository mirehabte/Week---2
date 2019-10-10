const mongoose = require('mongoose')


const staffSchema = new mongoose.Schema({
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
    gender:{
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        minlength: 5,
        maxlength: 250,
        required: true
    }     
})

    

module.exports = mongoose.model('Staff' , staffSchema)
