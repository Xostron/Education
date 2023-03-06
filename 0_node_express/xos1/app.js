const express = require('express')
const pug = require('pug');
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// маршруты
app.get('/',(req,res)=>{
    res.render("home",{title:"Xostron8", text:"sdfasfsdfsdfsdf"})
})

app.get('/play',(req,res)=>{
    res.render("play",{title:"xos", text:"PLAY"})
})

// middlewares
app.use((req,res)=>{
    res.type('text/plain')
    res.status(404)
    res.send('404-Not found page')
})

app.use((err,req,res,next)=>{
    console.error("Message err = ",err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500-ERROR SERVER')
})


app.listen(port, ()=>{
    console.log(`Сервер запущен на http://localhost:${port}` +
    '\nCtrl+C для завершения.' )
})








// Render a set of data
// console.log(compiledFunction({
//   name: 'Timothy'
// }));
// "<p>Timothy's Pug source code!</p>"