const express = require("express");
const request = require("request");
const pug = require("pug");
const bodyParser = require("body-parser");
const path = require("path");
const multiparty = require("multiparty");
const cors = require("cors");
const http = require("http")
const fs = require("fs")

// const app = express();
// const port = process.env.PORT || 3020;

// // Middlewares - промежуточные ПО
// // механизм представления pug
// app.use(cors());
// app.use(express.json("application/json"));
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// // Подключение статических файлов, к ним могут
// // обращаться клиенты через браузер,например,
// // http://localhost:3020/image/test.jpg
// app.use(express.static(__dirname + "/public"));

// app.use((req, res, next) => {
//   console.log("middleware1");
//   next();
// });

// // api обработка формы - файлы
// app.post("/api/form-file", (req, res) => {
//   const form = new multiparty.Form();
//   form.parse(req, (err, fields, files) => {
//     if (err) return res.status(500).send({ error: "error" });
//     console.log("fields = ", fields);
//     console.log("files = ", files);
//     // console.log("headers = ", req.headers["content-type"]);
//     // res.status(200).send({msg:'btn1 - OK'})
//     // запрос от сервера2 к серверу1
//     request.get(
//       {
//         headers: { "content-type": "application/json" },
//         url: `http://localhost:3010/api/save-file`,
//         body: JSON.stringify({ msg: "server2: Отправление файлов", files }),
//       },
//       // обработчик ответа от сервера1
//       (err, serverRes, body) => {
//         if (!err) {
//           // сервер 1: Файлы получены
//           res.status(202).send(JSON.parse(body));
//         } else {
//           res
//             .status(400)
//             .send({ msg: `Server2: Нет ответа от Сервера1` });
//         }
//       }
//     );
//   });
// });

// // тест отправление файлов
// app.post("/api/btn1", (req, res) => {
//   const form = new multiparty.Form();
//   form.parse(req, (err, fields, files) => {
//     if (err) return res.status(500).send({ error: "error" });
//     console.log("fields = ", fields);
//     console.log("files = ", files);
//     console.log("headers = ", req.headers["content-type"]);
//     res.status(200).send({ msg: "btn1 - OK" });
//   });
//   // const msg = req.body
//   // const img = req.files
//   // const headers = req.headers["content-type"]
//   // console.log('btn 1 = ',msg,img,headers)
//   // res.status(200).send({msg:'btn1 - OK'})
// });
// // тест отправление объекта JSON
// app.post("/api/btn2", (req, res) => {
//   const msg = req.body;
//   const headers = req.headers["content-type"];
//   console.log("btn 2 = ", msg, headers);
//   res.status(200).send({ msg: "btn2 - OK" });
// });
// // Маршруты
// // главная страница - отправка файла на веб-сервер,
// // веб-сервер - отправляет файл на удаленный сервер
// app.get("/", (req, res) => {
//   // res.send("<h1>TEST xostron2</h1>");
//   res.render("fox-main");
// });

http.createServer((request,response)=>{
  // информация о запросе от клиента (браузера)
console.log("URL:", request.url)
console.log("Тип запроса:", request.method)
console.log("Agent", request.headers["user-agent"])
console.log("Все заголовки:", request.headers)



  if (request.url === "/about"){
    let data = ""
    request.on("data", chunk=>{
      data+=chunk
      console.log(1)
    })
    // response.setEncoding('utf-8');
    request.on("end",()=>{
      console.log("request.on.end",data)
      
      response.end("Для отображения русского текста использовать 2 аргумент encoding")
    })
  }else{
    fs.readFile("views/about.html", (err,data)=>response.end(data))
  }
}).listen(3020, ()=>console.log("Сервер запущен по адресу http://localhost:3020"));



// app.listen(port, () => {
//   console.log(`server2 started on port = ${port}`);
// });

/* 
Сервер2:

функции:
 - Рендер страницы формы
 - обработка формы
 - api котрая принимает данные из формы и переотправляет на сервер1
*/
