const express = require("express");
const request = require("request");
const pug = require("pug")
const bodyParser = require("body-parser");
const path = require("path");
const multiparty = require("multiparty")
const cors = require("cors")
const form = new multiparty.Form()
const app = express();
const port = process.env.PORT || 3020;

// Middlewares - промежуточные ПО
// механизм представления pug
app.use(cors())
app.use(express.json("application/json"))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// Подключение статических файлов, к ним могут
// обращаться клиенты через браузер,например,
// http://localhost:3020/image/test.jpg
app.use(express.static(__dirname + "/public"));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use((req,res,next)=>{
  console.log('middleware1')
  next()
})

// api
app.post("/api/form-file", (req, res) => {
const msg = req.body
const img = req.files.image
console.log(msg,img)

  request.get(
    // запрос от сервера к серверу
    {
      headers: { "content-type": "application/json" },
      url: `http://localhost:3010/api/save-file`,
      body: JSON.stringify({ msg: "server2 - may day!" }),
    },
    // обработчик ответа от сервера
    (err, serverRes, body) => {
      if (!err) {
        res.status(202).send(JSON.parse(body));
      } else {
        res
          .status(400)
          .send({ problem: `Hero Service responded with issue ${err}` });
      }
    }
  );
});


app.post("/api/btn1",(req,res)=>{
  const form = new multiparty.Form()
  form.parse(req, (err,fields,files)=>{
    if (err) return res.status(500).send({error:'error'})
    console.log('fields = ',fields)
    console.log('files = ',files)
    console.log('headers = ',req.headers["content-type"])
    res.status(200).send({msg:'btn1 - OK'})
  })
// const msg = req.body
// const img = req.files
// const headers = req.headers["content-type"]
// console.log('btn 1 = ',msg,img,headers)
// res.status(200).send({msg:'btn1 - OK'})
})

app.post("/api/btn2",(req,res)=>{
  const msg = req.body
  const headers = req.headers["content-type"]
  console.log('btn 2 = ',msg,headers)
  res.status(200).send({msg:'btn2 - OK'})
  })
// Маршруты
// главная страница - отправка файла на веб-сервер, 
// веб-сервер - отправляет файл на удаленный сервер 
app.get("/", (req, res) => {
  // res.send("<h1>TEST xostron2</h1>");
  res.render("fox-main")
});

app.listen(port, () => {
  console.log(`server2 started on port = ${port}`);
});
