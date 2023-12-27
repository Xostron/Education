const express = require('express')
const router = express.Router()
const web = require('./web')

function api(db) {
	web(router,db)
	return router
}

module.exports = api