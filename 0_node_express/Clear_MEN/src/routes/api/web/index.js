function web(router, db) {
	router.use('/web', (req, res, next) => {
		res.status(200).json({ result: 'ok' })
	})
}

module.exports = web
