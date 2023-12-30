const ApiError = require('@exceptions/api-error');

module.exports = function (err, req, res, next) {
	let log = 'Ошибка сервера:' + err;
	if (err instanceof ApiError) {
		log = null;
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}
	if (log) {
		console.log(log);
		console.log(err);
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка сервера!' });
};
