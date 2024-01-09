const login = require('./login')
const signup = require('./signup')

function auth(router, db) {
	// Войти
	router.post('/auth/login', login(db))
	// Регистрация
	router.post('/auth/signup', signup(db))
}

module.exports = auth
