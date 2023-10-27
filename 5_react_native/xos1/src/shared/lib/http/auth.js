import axios from 'axios'

import { url, market, device, version, idApp } from 'local/init'
import zToken from 'store/token'
import { clearToken, saveToken } from 'storage/token'
import user from 'store/user'
// import initial from 'local/initial'
import notice from 'cmp/notice'
const code = [400, 401, 406]
// Запрос Авторизации с логином и паролем
function auth2(login, password) {
	const config = {
		method: 'POST',
		headers: {
			market,
			version,
			name: idApp,
		},
		url: url +'api/auth/login',
		data: { login, password, type: 'demo' },
	}
	axios(config)
	.then(res => {
		saveToken(res.data)
	})
	.then(res => {
		// initial()
	})
	.catch(err => {
		const r = err.response
		if (r && code.includes(r.status)) return notice(r.data.message, 'w')
		notice('Ошибка авторизации.\n' + err, 'w')
	})
}
// Запрос Авторизации по номеру телефона
function auth(phone, setTimer, setLoading) {
	const config = {
		method: 'POST',
		timeout: 5000,
		headers: {
			market,
			version,
			name: idApp,
		},
		url: url +'api/client/login',
		data: { phone },
	}
	axios(config)
	.then(res => {
		if (res.data?.result?.timer) setTimer(+res.data.result.timer)
		setLoading(false)
	})
	.catch(err => {
		setLoading(false)
		if (err.response.status === 400) {
			return notice(err.response.data.message, 'w')
		}
		notice('Не удалось начать процесс авторизации.\n' + err, 'w')
	})
}
//Проверяем код и получаем токен
function verify(code, phone) {
	const config = {
		method: 'POST',
		headers: {
			market,
			version,
			name: idApp,
		},
		url: url +'api/client/verify',
		data: { phone, code, token: token.pushToken, device: device +' '+ Device.deviceName},
	}
	axios(config)
	.then(res => {
		saveToken(res.data)
	})
	.catch(err => {
		if (err.response.status === 400) {
			return notice(err.response.data.message, 'w')
		}
		notice('Не удалось закончить процесс авторизации.\n' + err, 'w')
	})
}
// Запрос на обновление токена
function refresh() {
	const config = {
		method: 'POST',
		headers: {
			market,
			version,
			name: idApp,
		},
		url: url +'api/auth/refresh',
		data: { refreshToken: useToken.getState().refreshToken },
	}
	axios(config)
	.then(res => {
		saveToken(res.data)
	})
	.catch(err => {
		clearToken()
		notice('Не удалось обновить токены авторизации.\n' + err, 'w')
	})
}
// Запрос на logout
function logout() {
	const config = {
		method: 'POST',
		headers: {
			market,
			version,
			name: idApp,
		},
		url: url +'api/auth/logout',
		data: { refreshToken: useToken.getState().refreshToken },
	}
	axios(config)
	.then(_ => user.clear())
	.catch(err => notice('Не удалось выполнить logout.\n' + err, 'w'))
	.finally(_ => clearToken())
}

export { auth, auth2, verify, refresh, logout }
