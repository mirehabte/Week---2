const express = require('express')
const router = express.Router() 
const User  = require('../models/users')
const auth = require('../middlewares/auth')


//Displaying all registered users
router.get('/', auth, async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)        
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Displaying one user
router.get('/:id', getUser , async (req,res) => {
res.json(registeredUser)
})

//Updating one user
router.patch('/:id', auth, getUser, async (req,res) => {
    if (req.body.name != null) {
        res.registeredUser.name = req.body.name
      }
      if (req.body.middleName != null) {
        res.registeredUser.middleName = req.body.middleName
      }
      if (req.body.lastName != null) {
          res.registeredUser.lastName = req.body.lastName
      }
      if (req.body.dateOfBirth != null){
          res.registeredUser.dateOfBirth = req.body.dateOfBirth
      }
      if (req.body.email != null){
          res.registeredUser.email = req.body.email
      }
      if(req.body.password != null){
          res.registeredUser.password = req.body.password
      }
      try{
          const updateUser = await res.registeredUser.save()
          res.json(updateUser)
      }catch(err){
          res.status(400).json({ message: err.message})
      }
    })

//Deleting one user 
router.delete('/:id', auth, getUser , async (req,res) => {
   try{
    await res.registeredUser.remove()
    res.json({ "message": "User deleted" })
   }catch(err){
       res.status(500).json({ message: err.message})
   }
})



async function getUser(req,res,next){
    let registeredUser 
try{ 
    registeredUser = await User.findById(req.params.id)
    if(registeredUser == null) res.status(404).json({ "message": "Can not find User"})
}catch(err){
    res.status(500).json({ message: err.message})
}
res.registeredUser = registeredUser
next()
}

   
     
module.exports = router;