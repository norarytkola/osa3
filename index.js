const express = require('express')
const app = express()


const persons=[
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

app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo</h1>')
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const yhteystieto = persons.find(person => person.id === id)
    response.json(yhteystieto)
  })
  app.get('/api/persons/:info', (request, response) => {
      const summa=persons.length
      console.log(summa)
      response.send(`<h1>Yhteystietoja on yhteensä ${summa}.</h1>`)
  })

const port = 3001
app.listen(port, () =>{
console.log(`Server running on port ${port}`)
})