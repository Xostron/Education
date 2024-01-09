const express = require('express')
const request = require('request')
const pug = require('pug')
const bodyParser = require('body-parser')
const path = require('path')
const multiparty = require('multiparty')
const cors = require('cors')
const http = require('http')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const axios = require('axios')

const app = express()
const port = process.env.PORT || 8020

// ******************* Middlewares - промежуточные ПО
app.use(cors())
// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
)
app.use(express.json('application/json'))
// механизм представления pug
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// Подключение статических файлов, к ним могут
// обращаться клиенты через браузер,например,
// http://localhost:3020/image/test.jpg
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
	console.log('middleware1')
	next()
})
// *********************************************************

// api обработка формы - файлы
app.post('/api/form-file', (req, res) => {
	// console.log("@@@req.body=", a);
	// console.log("@@@req.files=", req.files);
	const data = {
		msg1: req.body?.msg1,
		msg2: req.body?.msg2,
		files: req.files?.xostron ?? '',
	}
	console.log('data = ' + data)
	// не передается большой объект
	// Работает (1способ)
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		headers: {
			'Content-Type': 'application/json',
		},
		url: `http://localhost:8010/api/save-file`,
		data: JSON.stringify(data),
	}
	axios
		.request(config)
		.then((_) => res.status(200).json('Ok'))
		.catch((err) => {
			res.status(400).json(`Error:${err}`)
		})

	// Работает (2способ)
	//     const q = {
	//         headers: { "content-type": "application/json" },
	//         url: `http://localhost:8010/api/save-file`,
	//         body: JSON.stringify(data),
	//     };
	//     request.post(q, (err, serverRes, body) => {
	//         // обработчик ответа от сервера1
	//         if (err) {
	//             res.status(400).send({
	//                 msg: `Server2: Нет ответа от Сервера1`,
	//             });
	//         }
	//         res.status(200).send(JSON.parse(body));
	//     });
})

//*****************************************тест отправление файлов
app.post('/api/btn1', (req, res) => {
	const form = new multiparty.Form()
	form.parse(req, (err, fields, files) => {
		if (err) return res.status(500).send({ error: 'error' })
		console.log('fields = ', fields)
		console.log('files = ', files)
		console.log('headers = ', req.headers['content-type'])
		res.status(200).send({ msg: 'btn1 - OK' })
	})
	// const msg = req.body
	// const img = req.files
	// const headers = req.headers["content-type"]
	// console.log('btn 1 = ',msg,img,headers)
	// res.status(200).send({msg:'btn1 - OK'})
})
//************************************** */ тест отправление объекта JSON
app.post('/api/btn2', (req, res) => {
	const msg = req.body
	const headers = req.headers['content-type']
	console.log('btn 2 = ', msg, headers)
	res.status(200).send({ msg: 'btn2 - JSON' })
})
//************************************** */ Маршруты
// главная страница - отправка файла на веб-сервер,
// веб-сервер - отправляет файл на удаленный сервер
app.get('/', (req, res) => {
	// res.send("<h1>TEST xostron2</h1>");
	res.render('fox-main')
})

// http.createServer((request,response)=>{
//   // информация о запросе от клиента (браузера)
// console.log("URL:", request.url)
// console.log("Тип запроса:", request.method)
// console.log("Agent", request.headers["user-agent"])
// console.log("Все заголовки:", request.headers)

//   if (request.url === "/about"){
//     let data = ""
//     request.on("data", chunk=>{
//       data+=chunk
//       console.log(1)
//     })
//     // response.setEncoding('utf-8');
//     request.on("end",()=>{
//       console.log("request.on.end",data)

//       response.end("Для отображения русского текста использовать 2 аргумент encoding")
//     })
//   }else{
//     fs.readFile("views/about.html", (err,data)=>response.end(data))
//   }
// }).listen(3020, ()=>console.log("Сервер запущен по адресу http://localhost:3020"));

app.listen(port, () => {
	console.log(`server2 started on http://localhost:${port}`)
})
