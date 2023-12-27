const version = require('@middlew/version')
const todo = require('./todo')

function client(router, db) {
	router.use('/client', version())
	router.get('/client/test', (req, res, next) => {
		const result = 'test client'
		res.json({ result })
	})
	todo(router, db)
}

module.exports = client
