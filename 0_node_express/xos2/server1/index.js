const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 8010;
// Создаем каталог для хранения файлов (если он еще не существует)

const fileDir = path.resolve(__dirname, "download");
if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
}

// Middlewares - промежуточные ПО
// Подключение статических файлов к ним могут
// обращаться клиенты через браузер,например,
// http://localhost:3010/test.jpg
// enable files upload
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(express.json({limit: '500mb'}));
// app.use(express.urlencoded({limit: '500mb'}));
app.use(express.static(__dirname + "/public"));
app.use(cors());

// api обработка сообщения от сервера
app.post("/api/save-file", (req, res) => {
    // const { msg, files } = req.body;
    console.log(" REQ.body = ", req.body);
    console.log(" REQ.files = ", req.files);
    // saveFile(files.image).then(console.log).catch(console.log)
    res.status(202).json({ msg: "server1: Файлы получены" });
});

// Маршруты
// Главная страница
app.get("/", (req, res) => {
    res.send(`
  <h1>API Xostron1</h1>
  <br>
  Прием файла от сервера2 и сохранение в папке server1/download
  `);
});

app.listen(port, () => {
    console.log(`server1 started http://localhost:${port}`);
});

function saveFile(files) {
    const uploads = [];
    files.forEach((file, idx) => {
        const fileNameParse = file.originalFilename.split(".");
        const fileExt = fileNameParse[fileNameParse.length - 1];
        const fileName = `${Date.now()}_${idx}.${fileExt}`;
        // console.log("@file = ", fileDir, fileName, file);
        // // oldPath - путь до временной папки, куда помещается переданный файл
        //     const oldPath = file.path;
        //     // наш путь куда следует сохранить фал
        //     const newPath = `${fileDir}/${fileName}`;
        // // копируем файл из временной папки в нашу папку
        //     let readStream = fs.createReadStream(oldPath);
        //     let writeStream = fs.createWriteStream(newPath);
        //     readStream.pipe(writeStream);
        //     readStream.on("end", function () {
        //       /* copied */
        //     });
        //     readStream.on("error", function (err) {
        //       /* error */
        //     });
        // Сохранение файла
        let p = new Promise((resolve, reject) => {
            file.mv(fileDir, function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
        uploads.push(p);
    });
    return Promise.all(uploads);
}

/*
Сервер1:

Есть api  для сохранения файла, запрос от сервера2 отправляет данные на сервер1
*/
