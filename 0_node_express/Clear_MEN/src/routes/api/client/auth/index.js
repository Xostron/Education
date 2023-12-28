// const login = require('./login');
// const verify = require('./verify');
// const logout = require('./logout');
// const refresh = require('./refresh');
const signup = require('./signup');

function auth(router, db) {
    // Signup
	router.post('/client/signup', signup(db));
	// // Login
	// router.post('/client/login', login(db));
	// // verify
	// router.post('/client/verify', verify(db));
	// // Logout
	// router.post('/client/logout', logout(db));
	// // refresh
	// router.post('/client/refresh', refresh(db));
}

module.exports = auth;