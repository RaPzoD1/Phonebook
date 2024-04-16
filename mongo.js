const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password argument');
    process.exit(1)
}

const password = process.argv[2]

const data = {
    name: process.argv[3],
    number: process.argv[4]
}

const url = 
    `mongodb+srv://rapzod:${password}@cluster0.pgmuwrz.mongodb.net/phoneBook?
    retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneNumber = mongoose.model('PhoneNumber',phoneNumberSchema)


if(process.argv.length > 3){
    console.log(process.argv.length);
        const phoneNumber = new PhoneNumber({
            name: data.name,
            number: data.number,
        })

        phoneNumber.save().then(result =>{
            console.log(`added ${data.name} ${data.number} to phonebook`);
            mongoose.connection.close()
        })
    // process.exit(1)
} else {
    PhoneNumber.find({}).then(response =>{
        console.log('phonebook: ');
        response.forEach(pNumber =>{
        console.log(`${pNumber.name} ${pNumber.number}`) 
        })
        mongoose.connection.close()
    })
}

