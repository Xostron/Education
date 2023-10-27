import { useEffect, useState } from "react";

// import initial from 'src/app/local/initial'
import useWarn from 'src/shared/ui/warn'

export default function useHome() {
	const [refresh, setRefresh] = useState(null)
	const warn = useWarn()

	useEffect(_ => {
		if (!refresh) return
		setRefresh(false)
		// initial()
		// 	.catch(err => warn(err))
		// 	.finally(_ => setRefresh(false))
	}, [refresh])

	return [refresh, setRefresh]
}