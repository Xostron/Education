const ApiError = require('@exceptions/api-error');
const { infU, infM, infC } = require('./fn');
/**
 * Middleware - Дополнение req информацией о пользователе, market, company (для любых пользователей)
 * @param {Object} db
 */
function info(db) {
	return function (req, res, next) {
		try {
			const user = req.info?.user ?? null;
			const market = req.info?.market ?? {};
			const company = req.info?.company ?? {};

			const a = [];
			// инфо пользователя
			a.push(infU(db, user));
			// инфо маркета
			if (!market.code && !market.id) a.push(null);
			else {
				const q = market.code
					? { code: market.code }
					: { _id: market.id };
				a.push(infM(db, q));
			}
			// Инфо компании
			if (!company?.code && !company?.id) a.push(null);
			else {
				const q = company.code
					? { code: company.code }
					: { _id: company.id };
				a.push(infC(db, q));
			}
			Promise.all(a)
				.then(([u, mar, cmp]) => {
					if (mar) {
						req.info.user.market = mar;
						req.info.market = mar;
					}
					if (cmp) {
						req.info.user.company = cmp;
						req.info.company = cmp;
					}
					if (u) req.info.user = { ...user, ...u };
					next();
				})
				.catch((err) => {
					console.log('[middlewinfo.js] error: ', err);
					next(ApiError.BadRequest('Не корректно указана компания!'));
				});
		} catch (error) {
			console.log('[middlewinfo.js] error: ', error);
			next(ApiError.Unauthorized(2));
		}
	};
}

module.exports = info;
