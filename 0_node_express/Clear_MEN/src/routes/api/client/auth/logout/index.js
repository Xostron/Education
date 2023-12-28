const ApiError = require('@exceptions/api-error')

function logout(db) {
	return function (req, res, next) {
		res.json({})
	}
}
module.exports = logout