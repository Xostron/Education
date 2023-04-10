const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3010;
// Создаем каталог для хранения файлов (если он еще не существует)
console.log(__dirname);
const fileDir = path.resolve(__dirname, "download");
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir);
}
console.log(fileDir);

// Middlewares - промежуточные ПО
// Подключение статических файлов к ним могут
// обращаться клиенты через браузер,например,
// http://localhost:3010/test.jpg
app.use(express.json("application/json"));
app.use(express.static(__dirname + "/public"));
app.use(cors());

// api обработка сообщения от сервера
app.get("/api/save-file", (req, res) => {
  const { msg, files } = req.body;
  console.log(" = ", msg, files);
  saveFile(files.image);
  res.status(202).send({ msg: "server1: Файлы получены" });
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

function saveFile(files) {
  files.forEach((file, idx) => {
    const fileNameParse = file.originalFilename.split(".");
    const fileExt = fileNameParse[fileNameParse.length - 1];
    const fileName = `${Date.now()}_${idx}.${fileExt}`;
    console.log("@file = ", fileDir, fileName, file);
// oldPath - путь до временной папки, куда помещается переданный файл
    const oldPath = file.path;
    // наш путь куда следует сохранить фал
    const newPath = `${fileDir}/${fileName}`;
// копируем файл из временной папки в нашу папку
    let readStream = fs.createReadStream(oldPath);
    let writeStream = fs.createWriteStream(newPath);
    readStream.pipe(writeStream);
    readStream.on("end", function () {
      /* copied */
    });
    readStream.on("error", function (err) {
      /* error */
    });
  });
}


/*
Сервер1:

Есть api  для сохранения файла, запрос от сервера2 отправляет данные на сервер1
*/