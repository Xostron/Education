import * as SecureStore from 'expo-secure-store'

import vapi from 'http/vapi'
import { mf } from 'tools/date'

// загрузка товаров из локал. хранилища в корзину асинк.
function loadBsk() {
	// SecureStore.deleteItemAsync('basket')
	return new Promise((resolve, reject) => {
		SecureStore.getItemAsync('basket')
		.then(res => {
			if (!res) resolve([])
			resolve(JSON.parse(res))
		})
		.catch(reject)
	})
}
// запись товаров в локал. хранилище
function saveBsk(list) {
	if (!list.length) { // очистка
		return SecureStore.deleteItemAsync('basket')
	}
	SecureStore.setItemAsync('basket', JSON.stringify(list))
	.catch(console.log)
}

// получение списока товаров для корзины
function product( list ) {
	return new Promise((resolve, reject) => {
		list = list.reduce((s, el) => {
			const id = el.id.toString().split(',')[0]
			s.add(id)
			return s
		}, new Set())
		const opt = {
			method: 'GET',
			url: 'api/client/product/list/' + mf(null,'HH:mm'),
			params: { list: JSON.stringify(list) },
		}
		vapi(opt)
		.then(r => {
			const o = {}
			r.forEach((el) => o[el._id] = el)
			resolve(o)
		})
		.catch(err => reject('Не удалось получить список товаров для корзины.\n' + err))
	})
}

export { product, loadBsk, saveBsk }
