const ApiError = require('@exceptions/api-error')
const { validateAccess } = require('@service/token-service')
const { ObjectId } = require('mongojs')

module.exports = function (req, res, next) {
	// Проверка авторизации пользователя
	try {
		req.info = {
			user: {
				auth: false,
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
		
		// Дополняем информацию о пользователе
		user.type = 'web'
		user.auth = true
		user.id = ObjectId(user.id)
		
		// Записываем все о пользователе
		req.info.user = user
		console.log('@@@ AUTH = ', user)
		next()
	} catch (e) {
		console.log(e)
		return next(ApiError.Unauthorized(1))
	}
}
