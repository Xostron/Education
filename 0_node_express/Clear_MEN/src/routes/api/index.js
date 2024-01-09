const express = require('express')
const router = express.Router()
const auth = require('./auth');
const client = require('./client')


function api(db) {
	auth(router,db)
	client(router, db)
	return router
}

module.exports = api
