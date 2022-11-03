const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>, the name and number')
  process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://arul:${password}@fullstack-part3.t8vujvu.mongodb.net/?retryWrites=true&w=majority`


const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 2 && process.argv.length < 5) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
      
}


mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: name,
      number: number,
    })

    return person.save()
  })
  .then(() => {
    console.log('person saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))