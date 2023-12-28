const ApiError = require('@exceptions/api-error')

function verify(db) {
	return function (req, res, next) {
		res.json({})
	}
}
module.exports = verify