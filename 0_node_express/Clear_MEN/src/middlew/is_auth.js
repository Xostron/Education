const ApiError = require('@exceptions/api-error')

function auth(type = 'web') {
	return function (req, res, next) {
		// Проверка авторизации пользователя
		try {
			const auth = req?.info?.user?.auth
			const t = req?.info?.user?.type
			if (auth && t === type) return next()
			return next(ApiError.Unauthorized(3))
		} catch (e) {
			return next(ApiError.Unauthorized(4))
		}
	}
}
module.exports = auth
