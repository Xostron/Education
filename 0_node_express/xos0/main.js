const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responseCode = 200) {
	fs.readFile(__dirname + path, (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' })
			return res.end('500 - Внутрення ошибка')
		}
		res.writeHead(responseCode, { 'Content-Type': contentType })
		res.end(data)
	})
}

const server = http.createServer((req, res) => {
	const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
	switch (path) {
		case '':
			serveStaticFile(res, '/public/main.html', 'text/html')
			break
		case '/q':
			serveStaticFile(res, '/public/play.html', 'text/html')
			break
		case '/img/logo.png':
			serveStaticFile(res, '/public/img/logo.png', 'image/png')
			break
		case '/file/asd.txt':
			serveStaticFile(res, '/public/file/asd.txt', 'text/plain')
			break
		default:
			serveStaticFile(res, '/public/404.html', 'text/html')
			break
	}
})

server.listen(port, () =>
	console.log(
		`Server running success localhost:${port}
  push Ctrl+C for exit program`
	)
)
