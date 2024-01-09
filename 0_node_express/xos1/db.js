const mongoose = require('mongoose')
const connectionString = "mongodb://127.0.0.1:27017/fox"


// подключение к БД
mongoose.connect(connectionString)
const db = mongoose.connection

db.on('error', err=>{
    console.error('Ошибка MongoDB: '+err.message)
    process.exit(1)
})

db.once('open',()=>console.log('Установлено соединение с MongoDB'))

