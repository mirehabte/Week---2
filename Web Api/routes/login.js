const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Joi = require('joi')


//Login 
router.post('/', async(req,res) => { 

     const { error } = await validateLogin(req.body)
     if(error) res.status(400).send(error.details[0].message).json({ "message":"invalid input" })

     const user = await User.findOne({ email:req.body.email});
     if(!user) return  res.status(400).json({ "message": "invalid email or password" })      
     
     const validPassword = await bcrypt.compare(req.body.password, user.password)
     if(!validPassword) return res.status(400).json({"message": "invalid email or password"})

     const admin = await Staff.findOne({ isAdmin: true })
         
     if(validPassword && admin) res.status(200).json({ "message": "Admin Logged in"})
      else if(validPassword) res.status(200).json({ "message": "User Logged in"})
        else res.json({"message":"Unauthorized User"})   

        const token = user.generateAuthToken()    
        res.send(token)
          })



 function validateLogin(user){
      const schema = {
          email: Joi.string().min(5).max(250).email(),
          password: Joi.string().min(8).max(250)
          }
           return Joi.validate(user,schema)
     }


               
module.exports = router