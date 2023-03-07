const express = require("express")
const pug = require("pug")
const path = require("path")
const handlers = require("./lib/handlers")

const app = express()
const port = process.env.PORT || 3000

// механизм представления pug
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// public - статические ресурсы
app.use(express.static(__dirname + "/public"))

// маршруты
app.get("/", handlers.home)

app.get("/play", handlers.play)

// middlewares - 404, 500
app.use(handlers.notFound)

app.use(handlers.serverError)

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Сервер запущен на http://localhost:${port}` + "\nCtrl+C для завершения."
    )
  })
} else {
  module.exports = app
}

// Render a set of data
// console.log(compiledFunction({
//   name: 'Timothy'
// }));
// "<p>Timothy's Pug source code!</p>"
