const ApiError = require('@exceptions/api-error')
// const { getV } = require("./fn")

/**
 * Провверка версии клиентского приложения
 * @returns
 */
function version() {
	return function (req, res, next) {
		const v = req.headers.version
		// console.log(v)
		v ? next() : next(ApiError.Unsupported('Не передана версия!'))
	}
	// 	// Время последнего изменения файла;
	// 	const data = getV()
	// 	// Проверка авторизации пользователя
	// 	try {
	// 		const name = req.headers?.name ?? "<no name>"
	// 		const version = req.headers?.version ?? "<no version>"
	// 		const market = req.headers?.market ?? "<no market>"
	// 		const company = req.headers?.company ?? "<no company>"

	// 		// !!! Доступ для всех
	// 		// if (!version || !name) return next();
	// 		const info = ` <${
	// 			req.info?.user?.phone ?? "noAuth"
	// 		}>: ${market} - ${company} - ${name} - ${version}`

	// 		//Полный доступ для EXPO на Android & iOS
	// 		if (name.toLowerCase().includes("host.exp.exponent")) return next()

	// 		// проверка запроса от клиента моб. приложения
	// 		if (!version)
	// 			return next(ApiError.Unsupported("Не передана версия!" + info))

	// 		// проверка наименования сборки мобильного приложения
	// 		v = data.find((el) => el.id.includes(name))
	// 		// !!! Доступ для всех
	// 		// if (!v) return next();
	// 		if (!v)
	// 			return next(
	// 				ApiError.Unsupported("Нет доступных версиий!" + info)
	// 			)

	// 		// проверка версии мобильного приложения клиента
	// 		if (v.ok.includes(version) || v.part.includes(version))
	// 			return next()

	// 		return next(ApiError.Unsupported("Нет в списках!" + info))
	// 	} catch (e) {
	// 		console.error(e)
	// 		return next(ApiError.Unsupported("Ошибка: " + e.toString()))
	// 	}
	// }
}
module.exports = version
