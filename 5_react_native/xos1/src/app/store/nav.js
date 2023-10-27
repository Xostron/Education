import { create } from 'zustand'

const zVal = create((set, get) => ({
	value: 'catalog',
	//обновление данных
	set: (r) => {
		 return set(state => {
			for (let key in r) {
				state[key] = r[key]
			}
			return state
		})
	},
	setValue: val => {
		set({value: val})
	},
}))
export default zVal
