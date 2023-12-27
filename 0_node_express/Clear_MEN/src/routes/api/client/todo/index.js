const id = require('./id')
const list = require('./list')

function todo(router, db) {
	router
		.route('/client/todo')
		// .all()
		.get(list(db))
	router
		.route('/client/todo/:id')
		// .all()
		.get(id(db))
	// .put()
	// .patch()
	// .delete()
}
module.exports = todo
