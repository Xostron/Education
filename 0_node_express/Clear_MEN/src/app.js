const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const indexRouter = require('@root/routes/index')
const api = require('@api/index')
// const pay = require('@pay/index')
// const other = require('@other/index')
const errorMiddleW = require('@middlew/error')
// const authMiddleW = require('@middlew/auth')
// const infoMiddleW = require('@middlew/info')
const clearTemp = require('../util/clear_tmp')

// Индентификатор текущего процесса иногда NODE_APP_INSTANCE
const id = process.env?.INSTANCE_ID ?? 0
// Максимальный размер тела запроса
const limit = process.env?.REQ_LIMIT ?? '50mb'
//Подписывание кук
const cookie_secret = process.env?.COOKIE_SECRET ?? '*65nwyTuLuIY'

function App(db) {
	const app = express()
	app.use(
		express.json({
			limit,
			inflate: true,
		})
	)
	// Временная папка
	const tempFileDir = path.join(__dirname, 'temp')
	// Очистка временной папки на главном инстансе при перезапуске процесса
	if (!id) clearTemp(tempFileDir)

	// Настройка загрузки файлов
	app.use(
		fileUpload({
			createParentPath: true,
			useTempFiles: true,
			tempFileDir,
			// safeFileNames: true,
			// debug: true,
		})
	)

	// Отключение CORS
	app.use(
		cors({
			credentials: true,
			origin: function (origin, callback) {
				return callback(null, true)
			},
		})
	)

	// Подключение pug
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'pug')

	app.use(logger('dev'))
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser(cookie_secret))
	// папка для статических файлов
	app.use(express.static(path.join(__dirname, 'public')))

	// HTML - приветсвие
	app.use('/', indexRouter)

	
	// Проверка Авторизации пользователя
	// app.use(authMiddleW)

	if (db) {
		// Дополнение данными из БД
		// app.use(infoMiddleW(db))
		// Наше API
		app.use('/api', api(db))
		// app.use('/pay', pay(db))
		// app.use('/other', other(db))
	}

	// Обработка ошибок
	app.use(errorMiddleW)
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		next(createError(404))
	})
	// error handler
	app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get('env') === 'development' ? err : {}
		// render the error page
		res.status(err.status || 500)
		res.render('error')
	})
	return app
}
module.exports = App
