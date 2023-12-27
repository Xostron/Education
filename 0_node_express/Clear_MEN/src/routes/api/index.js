const express = require('express')
const router = express.Router()
const version = require('@middlew/version')
const client = require('./client')


function api(db) {
	router.use('/client', version())
	client(router, db)
	return router
}

module.exports = api
