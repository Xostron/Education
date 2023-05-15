const express = require("express");
const pug = require("pug");
const path = require("path");
require('dotenv').config()


const app = express();
const port = process.env.PORT || 8000

// определение папки для статических файлов
app.use(express.static(__dirname + "/public"));
// объявление движка pug
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "pug");
app.use(express.json("application/json"));

// api
app.post("/api/btn2", (req,res)=>{
    console.log(req.body)
  res.status(200).json({ninja:"Hattori"})
})

// маршруты
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.get("/login", (req, res) => {
    res.render("home");
});
// redirect - при не правильном маршруте, перенаправляет на домашнюю страницу
app.use("*", (req, res) => {
    res.redirect("/");
});



app.listen(port, () =>
    console.log(`Сервер запущен по адресу http://localhost:${port}`)
);
