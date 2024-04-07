const express = require('express')
const morgan = require('morgan')
const app = express() 

const cors = require('cors')

morgan.token('body',(req,res)=>{
  if(req.method !== "POST"){
    return 'no data to show'
  }
  return JSON.stringify(req.body)
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/',(req, res) =>{
    res.send("<h1>Welcome to persons api</h1>")
})

app.get('/api/persons',(req,res) =>{
    res.send(persons)
})

app.get('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(!person){
        res.status(404).end()
    }
     res.send(person)
})

app.delete('/api/persons/:id',(req, res) =>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const getRandomId = () =>{
    const min = Math.ceil(1)
    const max = Math.floor(9999999)
    return Math.floor(Math.random() * (max - min) +  min)
}

app.post('/api/persons',(req,res)=>{

    if(!req.body.name) {
        return res.status(400).json({
          error: 'Name missing'
        })
      }
    if(!req.body.number) {
        return res.status(400).json({
          error: 'number missing'
        })
      }    
    const person = {
        id: getRandomId(),
        name: req.body.name, 
        number: req.body.number
    }

    const addPerson = () =>{
        persons = persons.concat(person) 
        res.json(person)
    }

    persons.some(person => person.name.toLowerCase() === req.body.name.toLowerCase()) 
        ? res.status(400).json({error:'name must be unique'})
        : addPerson()

    
})

app.get('/info',(req,res) =>{

    const count = persons.length
    const clock = new Date()

    const inf = `Phonebook has info for ${count} people <br/> ${clock}`   

    res.send(inf)
})








const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})