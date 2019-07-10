const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan=require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :postcontent'))
morgan.token('postcontent', (req, res) => { return JSON.stringify(req.body) })
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))



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



app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const yhteystieto = persons.find(person => person.id === id)
      if (yhteystieto) {
        response.json(yhteystieto)
      } else {
        return response.status(404).end()
      }
  })
  app.get('/info', (req, res) => {
      const summa=persons.length
      const paiva=new Date()
      res.send(`<p>Yhteystietoja on yhteensä ${summa}.<br/>${paiva}
      </p>`)
  })

  app.delete('/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

  response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (req, res)=>{
    const body = req.body
  if (!body.name) {
    return res.status(400).json({ 
      error: 'Nimi puuttuu' 
    })
  } 
  else if (!body.number){
    return res.status(400).json({
      error: 'Numero puuttuu'
    })

  } else {
  const i=persons.length
  for (let a=0;  a < i; a++){
    if (persons[a].name===body.name){
      return res.status(400).json({
        error: 'Nimi on jo yhteystiedoissa'
      })
    } else if (persons[a].number===body.number){
    return res.status(400).json({
      error: 'Numero on jo puhelinluettelossa.'
    })}
 }
   
  const person = {
    name:body.name,
    number:body.number,
    id: generateId(),
    important:body.important || true
  }
  
  persons = persons.concat(person)
  res.json(person)
  }
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})