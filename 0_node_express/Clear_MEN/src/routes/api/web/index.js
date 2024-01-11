const version = require('@middlew/version')
const todo = require('./todo')


function client(router, db) {
	router.use('/client', version())
	todo(router, db)
	router.get('/client/test', (req, res, next) => {
		const result = 'test client'
		res.json({ result })
	})
}

module.exports = client
