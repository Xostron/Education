const ApiError = require('@exceptions/api-error')

/**
 * Middleware - Дополнение req информацией 
 * @param {Object} db
 */
function info(db) {
	return function (req, res, next) {
		try {
			next()
			// ошибки
			// console.log('[middlewinfo.js] error: ', err)
			// next(ApiError.BadRequest('Не корректно указана компания!'))
		} catch (error) {
			console.log('[middlewinfo.js] error: ', error)
			next(ApiError.Unauthorized(2))
		}
	}
}

module.exports = info
