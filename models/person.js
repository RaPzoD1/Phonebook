const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (v) =>{
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} es un numero invalido. Debe tener la forma de dos o tres números seguido de un guion y números.`            
        }
    },
})

personSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)