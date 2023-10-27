import { useEffect, useState } from 'react'

import api from 'http'
import useWarn from 'src/shared/ui/warn'

export default function useOrders(refresh) {
	const warn = useWarn()
	const [fetching, setFetching] = useState(false)
	const [data, setData] = useState(null)
	const load = (ignore) => {
		setFetching(true)
		const opt = {
			method: 'GET',
			url: 'api/client/order'
		}
		api(opt)
			.then(res => {
				if (!ignore) setData(res.data.result)
			})
			.catch(err => warn('Не удалось получить информацию о заказах'))
			.finally(_ => setFetching(false))
	}
	useEffect(_ => {
		let ignore = false
		load(ignore)
		return _ => ignore = true
	}, [refresh])
	return { data, fetching, load}
}