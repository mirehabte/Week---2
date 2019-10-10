const mongoose = require('mongoose')
const validator = require('validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
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
    dateOfBirth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 250,
        unique: true,
        required: true,
        validate: value => {
            if(!validator.isEmail(value))
            throw new Error ({ error: 'Invalid email'})            
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 250
    },
    isAdmin:{
        type: Boolean,
        default: false
    } 
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id, _isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    return token
}

function userValidation(user){
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        middleName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50),
        dateOfBirth: Joi.string().required(),
        email: Joi.string().min(5).max(250).email(),
        password: Joi.string().min(8).max(250)
    }
        return Joi.validate(user, schema)
}

module.exports.userValidation = userValidation 
module.exports = mongoose.model('User' , userSchema)