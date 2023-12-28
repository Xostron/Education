const ApiError = require('@exceptions/api-error')

function signup(db) {
	return function (req, res, next) {
		try {
			const o = req.body
			console.log('@@@ SIGNUP ', o)
			res.json({ result: 'signup' })
		} catch (error) {
			next(ApiError.BadRequest(e.toString()))
		}
	}
}

module.exports = signup
