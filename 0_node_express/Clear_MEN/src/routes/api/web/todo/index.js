const id = require('./id')
const list = require('./list')
const isAuth = require('@middlew/is_auth');

function todo(router, db) {
	router.route('/client/todo').all(isAuth('web')).get(list(db))

	router.route('/client/todo/:id').all(isAuth('web')).get(id(db))
	// .put()
	// .patch()
	// .delete()
}
module.exports = todo
