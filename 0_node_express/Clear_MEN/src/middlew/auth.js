const ApiError = require('@exceptions/api-error')
const { validateAccess } = require('@service/token-service')
const { ObjectId } = require('mongojs')

module.exports = function (req, res, next) {
	// Проверка авторизации пользователя
	try {
		const company = req.headers.company ?? null
		const market = req.headers.market ?? null

		req.info = {
			user: {
				auth: false,
			},
			market: {
				id: null,
				code: market,
			},
			company: {
				id: null,
				code: company,
			},
		}

		// Получаем акцесс токен из хедера
		const auth = req.headers.authorization
		if (!auth) return next()

		// Валидируем токен
		const access = auth.split(' ')[1]
		if (!access) return next()

		const user = validateAccess(access)
		if (!user) return next()

		// Если мы из WEB, то пишем информацию о площадке и компании
		if (!market && user.market?.id)
			req.info.market.id = ObjectId(user.market.id)
		if (!company && user.company?.id)
			req.info.company.id = ObjectId(user.company.id)

		// Дополняем информацию о пользователе
		user.auth = true
		user.id = ObjectId(user.id)

		// Записываем все о пользователе
		req.info.user = user
		next()
	} catch (e) {
		console.log(e)
		return next(ApiError.Unauthorized(1))
	}
}
