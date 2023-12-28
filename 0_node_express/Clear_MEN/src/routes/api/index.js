const express = require('express')
const router = express.Router()
const client = require('./client')


function api(db) {
	client(router, db)
	return router
}

module.exports = api
