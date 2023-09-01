import { useEffect, useState } from "react"
import { Button } from 'shared/ui/btn'

export const BugBtn = () => {
	const [err, setErr] = useState(false)
	useEffect(() => {
		if (err) throw new Error()
	}, [err])
	function hndlErr() {
		setErr((prev) => !prev)
	}
	return (
		<Button onClick={hndlErr} >
			Ошибка/Error
		</Button>
	)
}
