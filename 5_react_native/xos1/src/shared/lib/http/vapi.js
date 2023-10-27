import api from 'http'
// type - 'full' (полный ответ), 'error' - res.data.error
export default function vapi(option, type=null) {
	return new Promise((resolve, reject) => {
		api(option)
		.then(res => {
			if (type === 'full') return resolve(res)
			res = (type === 'error') ? res.data : res.data.result
			resolve( res )
		})
		.catch(reject)
	})
}
