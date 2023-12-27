const ApiError = require('@exceptions/api-error');

function auth(t, role = []) {
	return function (req, res, next) {
		// Проверка авторизации пользователя
		try {
			t = t ? t : 'employee';
			type = req?.info?.user?.type === t;
			if (req?.info?.user?.auth && type) {
				const r = req?.info?.user?.role ?? [];
				if (role.length && !r.some((el) => role.includes(el)))
					return next(ApiError.Unauthorized(3));
				return next();
			}
			return next(ApiError.Unauthorized(3.2));
		} catch (e) {
			return next(ApiError.Unauthorized(4));
		}
	};
}
module.exports = auth;
