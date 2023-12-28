const ApiError = require('@exceptions/api-error')
const { getV } = require('./fn')

/**
 * Провверка версии клиентского приложения
 * @returns
 */
function version() {
	return function (req, res, next) {
		// версия и имя клиента
		const version = req.headers.version ?? ''
		const name = req.headers.name ?? ''
		// поддерживаемые версии сервером
		const data = getV()
		console.log(version, name)

		// !!! Доступ для всех (для тестов)
		// if (!version || !name) {
		// 	console.log('Доступ разрешен: версия и имя клиента - не проверяются')
		// 	return next()
		// }

		// Проверка сборки клиента с сервором
		const v = data.find((el) => el.id.includes(name))

		// проверка версии мобильного приложения клиента
		if (v?.ok.includes(version) || v?.part.includes(version)) return next()

		return next(ApiError.Unsupported('Не поддерживается версия приложения'))
	}
}
module.exports = version
