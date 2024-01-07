const ApiError = require('@exceptions/api-error')

function refresh(db) {
	return function (req, res, next) {
		res.json({})
	}
}
module.exports = refresh