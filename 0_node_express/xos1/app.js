const express = require("express")
const pug = require("pug")
const path = require("path")
const bodyParser = require("body-parser")
const handlers = require("./lib/handlers")

const app = express()
const port = process.env.PORT || 3000

// механизм представления pug
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// middlewares
// public - статические ресурсы (картинки, стили и т.д.)
app.use(express.static(__dirname + "/public"))
// для парсинга body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// маршруты
app.get("/", handlers.home)
// app.get("/play", handlers.play)
app.get("/login", handlers.login)
app.get("/:id", (req, res) => {
  // id games
  const id = req.params.id
  res.redirect(303, `/game/${id}`)
})
app.get("/game/:id", (req, res) => {
  // console.log('req = ',req)
  res.render("fox-menu", {
    uid: `http://localhost:${port}/game/${req.params.id}`,
  })
})
app.get("/play/:id", (req, res) => {
  // console.log('req = ',req)
  console.log("online = ", req.params.id)
  // {uid:`http://localhost:${port}/play/online/${req.params.id}`}
  // res.redirect(303, `/online/${req.params.id}`)
  res.render('fox-online')
})
app.get("/online/:id", (req, res) => {
  console.log("render online")
  // ,{uid:`http://localhost:${port}/game/${req.params.id}`
  res.render("fox-online")
})


// api
app.post("/api/login", handlers.api.create_login)
// middlewares - 404, 500 - рендеринг страниц для ошибок
app.use(handlers.serverError)
app.use(handlers.notFound)

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Сервер запущен на http://localhost:${port}` + "\nCtrl+C для завершения."
    )
  })
} else {
  module.exports = app
}
