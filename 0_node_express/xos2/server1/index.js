const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3010;

// Middlewares - промежуточные ПО
// Подключение статических файлов к ним могут
// обращаться клиенты через браузер,например,
// http://localhost:3000/test.jpg
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api
app.get("/api/save-file", (req, res) => {
  console.log("server1 hi!");
  const msg = req.body;
  console.log(msg);
  res.status(202).send({ msg: "server1 send" });
});

// Маршруты
// Главная страница
app.get("/", (req, res) => {
  res.send(`
  <h1>API Xostron1</h1>
  <br>
  Обработка файла и сохранение на сервер
  `);
});

app.listen(port, () => {
  console.log(`server1 started on port = ${port}`);
});
