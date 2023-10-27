import { create } from 'zustand'

const zToken = create((set, get) => ({
	isAuth: null,
	accessToken: null,
	refreshToken: null,
	//обновление данных
	set: (r) => {
		 return set(state => {
			for (let key in r) {
				state[key] = r[key]
			}
			return state
		})
	},
	setUser: (o) => {set({user:[...get().user, o]})},
}))

export default zToken
