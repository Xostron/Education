const express = require("express")
const pug = require("pug")
const path = require("path")
const bodyParser = require("body-parser")
const handlers = require("./lib/handlers")
const authRouter = require("./routers/authRouter")
const eventSource = require("./lib/eventSource")

const app = express()
const port = process.env.PORT || 3000
// Подключение БД
require("./db")

// механизм представления pug
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// middlewares
// public - статические ресурсы (картинки, стили и т.д.)
app.use(express.static(__dirname + "/public"))
// для парсинга body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// api
app.use("/api-auth", authRouter)

// Real time
app.get("/rt-connect", eventSource.connectRT)
app.post("/rt-new", eventSource.newMsg)

// модуль приложения
if (require.main === module) {
  // console.log("module = ",require.main)
  app.listen(port, () => {
    console.log(
      `Сервер запущен на http://localhost:${port}` + "\nCtrl+C для завершения."
    )
  })
} else {
  module.exports = app
}

// маршруты на страницы
// Домашняя - перенаправление на /game
app.get("/", handlers.home)

// Начальный экран игры
app.get("/game", (req, res) => {
  res.render("fox-main")
})

// экран - online
app.get("/online/:id", (req, res) => {
  res.render("fox-online", {
    uid: `http://localhost:${port}/online/${req.params.id}`,
  })
})

// экран - single
app.get("/single", (req, res) => {
  res.render("fox-single")
})

// авторизация
app.get("/login", handlers.login)

// middlewares - 404, 500 - рендеринг страниц для ошибок
app.use(handlers.serverError)
app.use(handlers.notFound)
