const express = require('express')
const router = express.Router()
const auth = require('./auth');
const web = require('./web')


function api(db) {
	auth(router,db)
	web(router, db)
	return router
}

module.exports = api
