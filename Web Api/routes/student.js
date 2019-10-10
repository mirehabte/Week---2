const express = require('express')
const router = express.Router()
const Students = require('../models/students')
const auth = require('../middlewares/auth')


//Registering Students
router.post('/', auth, async (req , res) => {   

    let newStudent = await Students.findOne(req.params.email)
    if(newStudent) res.status(400).json({ "message": "Student already exists"})

  newStudent = new Students({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        studentId: req.body.studentId,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        grade: req.body.grade
    })
    try {   
       const result =  await newStudent.save()
        res.status(201).json(result)
        console.log(result)
    } 
    catch(err){
    res.status(400).json({ message: err.message })
     }
})


//Getting all students
router.get('/', auth, async (req,res) => {
    try{
    const students = await Students.find()
    //res.json(students)
    res.render('students',{ students: students })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})


//Getting one student
router.get('/:id', getStudent, async (req,res) => {
    res.json(registeredStudent)
})


//Updating one student
router.patch('/:id', auth, getStudent, async (req,res) => {
    if (req.body.name != null) {
        res.registeredStudent.firstName = req.body.firstName
      }
      if (req.body.middleName != null) {
        res.registeredStudent.middleName = req.body.middleName
      }
      if (req.body.lastName != null) {
          res.registeredStudent.lastName = req.body.lastName
      }
      if(req.body.studentId != null){
          res.registeredStudent.studentId = req.body.studentId
      }
      if (req.body.dateOfBirth != null){
          res.registeredStudent.dateOfBirth = req.body.dateOfBirth
      }
      if (req.body.email != null){
          res.registeredStudent.gender = req.body.gender
      }
      if(req.body.password != null){
          res.registeredStudent.grade = req.body.grade
      }
      try{
          const updateStudent = await res.registeredStudent.save()
          res.json(updateStudent)
      }catch(err){
          res.status(400).json({ message: err.message})
      }
})


//Deleting one student
router.delete('/:id', auth, getStudent, async (req,res) => {
     try{
        await res.registeredStudent.remove()
        res.json({ "message": "Student deleted"})
     }catch(err){
         res.status(500).json({ message: err.message })
     }
})


async function getStudent (req,res,next){
    let registeredStudent
    registeredStudent = await Students.findById (req.params.id)
try{ 
    
    if(registeredStudent == null) res.status(404).json({ "message": "Can not find Student"})
}catch(err){
    res.status(500).json({ message: err.message})
}
res.registeredStudent = registeredStudent
next()
}



module.exports = router