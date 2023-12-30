const version = require('@middlew/version')
const todo = require('./todo')
const auth = require('./auth')

function client(router, db) {

	router.use('/client', version())

	auth(router, db)
	
	router.get('/client/test', (req, res, next) => {
		const result = 'test client'
		res.json({ result })
	})

	todo(router, db)
}

module.exports = client
