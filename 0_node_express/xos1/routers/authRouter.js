const Router = require('express')
const router = new Router()
const apiAuth = require('./authController')

router.post('/registration',apiAuth.registration)
router.post('/login',apiAuth.login)
router.get('/users',apiAuth.getUsers)

module.exports = router


