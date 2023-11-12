const mongoose = require('mongoose')
const url = process.env.DB_URL + process.env.DB_NAME
mongoose.connect('mongodb://localhost:27017/chatApp').then(() => {
    console.log('database connected.')
}).catch((error) => {
    console.log('database not connected, error : ', error)
})