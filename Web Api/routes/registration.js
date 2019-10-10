
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt') 
const { User, userValidation }  = require('../models/users')



//Registering user

router.post('/', async (req , res) => {    
    
    
    const { error } = userValidation(req.body);    
    if(error) res.status(400).json({ message: error.details[0].message })

    let newUser = await User.findOne(req.params.email)
    if(newUser) res.status(400).json({ "message": "user already registerd" })

     newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password
    })
    try {          
        const salt = await bcrypt.genSalt(10)   
        newUser.password = await bcrypt.hash(newUser.password , salt) 
        if(newUser.email == 'haile209@gmail.com')  newUser.isAdmin = true
        const result =  await newUser.save()
        res.status(201).json(result)
        const token = newUser.generateAuthToken()
        res.header('x-auth-token',token).send(newUser)
        res.json({ mesasage: token.message })
    } 
    catch(err){
    res.status(400).json({ message: err.message })
     }
})

module.exports = router;
