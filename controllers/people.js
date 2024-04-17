const peopleRouter = require('express').Router()
const Person = require('../models/person')


peopleRouter.get('/',(req,res) =>{
  Person.find({})
  .then(persons =>{
    res.json(persons)
  })
})

peopleRouter.get('/:id', (req,res, next) =>{
    
  Person.findById(req.params.id)
  .then(person =>{
    person 
      ? res.json(person)
      : res.status(404).end()
  })
  .catch(error => next(error))
})

peopleRouter.delete('/:id',(req, res,next) =>{
  
  Person.findByIdAndDelete(req.params.id)
    .then( result =>{
      res.status(204).end()
    })
    .catch(error => next(error))    
})


peopleRouter.post('/',  (req,res, next)=>{

  const body = req.body

  if(body.name === undefined || body.number === undefined){
    return res.status(400).json({
      error: 'Name or number missing'
    })
  }  
  

    const person = new Person({        
        name: body.name, 
        number: body.number,
    })  
  person.save()
    .then(savedPerson =>{
      res.json(savedPerson)
    })
    .catch(error => next(error))
    
})

peopleRouter.put('/:id',(req, res, next) =>{

  const {name, number} = req.body
  const person = {
    name,
    number,
  }

  Person.findByIdAndUpdate(req.params.id, person, {new:true, runValidators:true, context:'query'})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})



module.exports = peopleRouter