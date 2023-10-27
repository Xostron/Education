import axios from 'axios'

import { url, market, device, version, idApp, demo } from 'src/app/local/init'
import zToken from 'src/app/store/token'
import { saveToken, clearToken } from 'src/app/store/token'
let wait = false

// Axios Interceptors
const api = axios.create({
	// Базавый url
	baseURL: url,
})

// Добавляем хедеры в запросы от клиента
api.interceptors.request.use((config) => {
	// Акцесс токен из store
	config.headers.Authorization = 'Bearer ' + zToken.getState().accessToken
	config.headers.market = market
	config.headers.version = version
	config.headers.name = idApp ?? 'client'
	return config
})

// Перехват ответа
api.interceptors.response.use(
	// Обработка ответа
	(response) => {
		return response
	},
	// Обрабатываем ошибку
	async (error) => {
		const original = error.config
		// 420 Ошибка весии клиента
		if (error?.response?.status === 420) {
			// init.setValid(false)
			const msg = error.response?.data?.message ?? ''
			return Promise.reject(msg)
		}
		// 401 Авторизация пользователя
		let val = error?.response?.status === 401
		val = val && error?.config
		val = val && !error?.config?._isRetry
		if (val) {
			function pause(){
				return new Promise(res => setTimeout(res, 200))
			}
			if (wait) {
				let max = 100
				while (wait && max--) {await pause() }
				return api.request(original)
			}
			wait = true
			// Ставим метку чтобы не зациклиться
			original._isRetry = true
			try {
				// Выполняем рефреш
				const u = demo ? `${url}api/auth/refresh` : `${url}api/client/refresh`
				const response = await axios(
					{
						url: u,
						method: 'POST',
						headers: {
							market,
							version,
							name: idApp,
						},
						data: {
							refreshToken: useToken.getState().refreshToken,
							type: 'demo',
							// token: token.pushToken,
							device
						},
					}
				)
				if (!response) {
					// Ничего не получилось Очищаем токены и переходим на авторизацию
					// console.log('API interceptors 401 error: ', error)
					await clearToken()
					wait = false
					return Promise.reject(error)
				}
				// Сохраняем новый токен и Повторно выполняем запрос
				await saveToken(response.data)
				wait = false
				// console.log('api.request(original)', original)
				return api.request(original)
			} catch (e) {
				wait = false
				// console.log('API interceptors error: ', e)
				clearToken()
				return Promise.reject(e)
			}
		}
		throw error
	}
)

export default api
