import { create } from 'zustand'
import { product, loadBsk, saveBsk } from './fn'
// хранилице для корзины
const useBasket = create((set, get) => ({
	list: [],
	name: 'КОРЗИНУ',
	data: {},
	clear: _ => set({list: []}),
	load() {
		loadBsk()
		.then(list => {
			set({ list })
			product(list)
			.then(data => set({ data }))
			.catch(err => console.log('Не удалось получить список товаров для корзины.\n' + err))
		})
		.catch(console.log)
	},
	inc( id, info ) {
		const list = get().list
		const idx = list.findIndex(el => el.id === id)
		if (idx === -1) {
			list.push({id, count: 1})
			const data = get().data
			data[info._id] = info
			set({ data })
		}
		else ++list[idx].count
		set({ list })
		saveBsk( list )
	},
	dec( id ) {
		const list = get().list
		const idx = list.findIndex(el => el.id === id)
		if (idx === -1) return
		--list[idx].count
		set({ list })
		if (list[idx].count <= 0) get().del(id)
		else saveBsk( list )
	},
	del( id ) {
		const list = get().list.filter(el => el.id !== id)
		set({ list })
		saveBsk( list )
		const _id = id.toString().split(',')[0]
		const i = list.findIndex(el => el.id.toString().includes(_id))
		if (i > -1) return
		const data = get().data
		delete data[_id]
		set({ data })
	},
	count( id ) {
		const l = get().list
		const idx = l.findIndex(el => el.id === id)
		return l[idx]?.count ?? ''
	},
	qt() {
		const len = get().list.length
		return len ? len : null
	},
	// стоимость n товара с учетом скидки на товар или общей скидки (не дествует если есть скида на товар)
	cost( id, discount, total ) {
		const _id = id.toString().split(',')[0]
		const count = get().list.find(el => el.id === id)?.count ?? 0
		const d = get().data[_id]
		const price = total ?? d.price //? total : plc(item)
		// console.log('count', count, d.price);
		if (d.discount) return +(price * count).toFixed(2)

		const dsc = discount ? (100 - discount) / 100 : 1
		return +(price * count * dsc).toFixed(2)

		// const price = total ? total : plc(item)
		// const d = discount ? (100 - discount) / 100 : 1
		// if (item.discount) return price * item.count
		// return +(price * item.count * d).toFixed(2)
	},
}))

export default useBasket
