const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-9jztp.mongodb.net/phonebookapp?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
})

const Person = mongoose.model('person', personSchema)

if ( process.argv.length>3 ) {
 
const contact = new Person({
  name: process.argv[3],
  number: process.argv[4],
  important: true,
})
contact.save().then(result => {
  console.log('Contact saved!')
  mongoose.connection.close()
})
} else {
Person.find({important:true}).then(result => {
  result.forEach(person => {
    console.log(person.name + person.number)
  })
  mongoose.connection.close()
})
}

