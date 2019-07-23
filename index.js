require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan=require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :postcontent'))
morgan.token('postcontent', (req, res) => { return JSON.stringify(req.body) })
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const Person = require('./models/contact')

let persons=[
    {
        "name": "Maija Meriaho",
        "number": "050-2677692",
        "important": true,
        "id": 12
      },
      {
        "name": "Marja Mustikka",
        "number": "050-2677694",
        "important": true,
        "id": 13
      },
      {
        "name": "Marja Mestikka",
        "number": "050-2677694",
        "important": true,
        "id": 10
      },
      {
        "name": "Taneli Tahvola",
        "number": "050-5355591",
        "important":true,
        "id":18
     },
      {
        "name": "Pekka Pouta",
        "number": "019-535456",
        "important": true,
        "id": 14
      },
      {
        "name": "Mari Metsä",
        "number": "08-5236223",
        "important": true,
        "id": 16
      },
      {
        "name": "Tiia Alanen",
        "number": "050-5325581",
        "important": true,
        "id": 17
      }
]
app.use(express.static('build'))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons.map(pers=>pers.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
      response.json(person.toJSON())
    })
      if (person===undefined) {
        return response.status(404).end()
      }
  })

app.get('/info', (req, res, next) => {
    const summa=persons.length
    const paiva=new Date()
      res.send(`<p>Yhteystietoja on yhteensä ${summa}.<br/>${paiva}
      </p>`)
  })

app.delete('/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }

app.post('/api/persons', (req, res, next)=>{
  const body = req.body
  if (body.name=== undefined) {
    return res.status(400).json({ 
      error: 'Nimi puuttuu' 
    })
  } 
  else if (body.number===undefined){
    return res.status(400).json({
      error: 'Numero puuttuu'
    })
  } else {
  const person = new Person({
    name:body.name,
    number:body.number,
    id: generateId(),
    important:body.important || true
  })
  
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
  }})

  const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
  }
  app.use(errorHandler)
  
const PORT = process.env.PORT  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})