const auth = require('../middlewares/auth')
const express = require('express')
const router = express.Router()
const Staff = require('../models/staffs')


//Registering Staffs members
router.post('/', auth, async (req , res) => {    
    
    const newStaff = new Staff({
        firstName: req.body.firstName,
        middleName: req.body.middleName,        
        gender: req.body.gender,
        jobTitle: req.body.jobTitle,        
    })
    try {          
        const result =  await newStaff.save()
        res.status(201).json(result)
    } 
    catch(err){
    res.status(400).json({ message: err.message })
     }
})

//Getting all staff members
router.get('/', auth, async (req,res) => {
    try{
    const staff = await Staff.find()
    res.json(staff)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

//Getting one staff member
router.get('/:id', getStaff, async (req,res) => {
    res.json(registeredStaff)
})

//Updating one staff member
router.patch('/:id', auth, getStaff, async (req,res) => {
    if (req.body.firstName != null) {
        res.registeredStaff.firstName = req.body.firstName
      }
      if (req.body.middleName != null) {
        res.registeredStaff.middleName = req.body.middleName
      }
      if (req.body.gender != null){
        res.registeredStaff.gender = req.body.registeredStaff
      }      
      if(req.body.jobTitle != null){
        res.registeredStaff.jobTitle = req.body.jobTitle
      }     
      try{
        const updateStaff = await res.registeredStaff.save()
        res.json(updateStaff)
      }catch(err){
          res.status(400).json({ message: err.message})
      }
})

//Deleting one staff member
router.delete('/:id', auth, getStaff, async (req,res) => {
     try{
        await res.registeredStaff.remove()
        res.json({ "message": "Staff member deleted" })
     }catch(err){
         res.status(400).json({ message: err.message })
     }
})


async function getStaff (req,res,next){
    let registeredStaff
    registeredStaff = await Students.findById (req.params.id)
try{ 
    
    if(registeredStaff == null) res.status(404).json({ "message": "Can not find Staff member" })
}catch(err){
    res.status(400).json({ message: err.message})
}
res.registeredStaff = registeredStaff
next()
}



module.exports = router