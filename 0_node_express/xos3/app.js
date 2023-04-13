const express = require("express");
const pug = require("pug");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

// определение папки для статических файлов
app.use(express.static(__dirname + "/public"));
// объявление движка pug
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "pug");

// маршруты
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/reg", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("home");
});
// redirect - при не правильном маршруте, перенаправляет на домашнюю страницу
app.use("*", (req, res) => {
  res.redirect('/')
});

app.listen(port, () =>
  console.log(`Сервер запущен по адресу http://localhost:${port}`)
);

