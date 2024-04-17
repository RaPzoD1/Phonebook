const infoRouter = require('express').Router()
const Person = require('../models/person')


infoRouter.get('/',async (req,res) =>{

    const personsCount = await Person.find({})
  
    // console.log(personsCount);
    
      const count = personsCount.length
      const clock = new Date()
  
      const inf = `Phonebook has info for ${count} people <br/> ${clock}`   
  
      res.send(inf)
  })

  module.exports = infoRouter