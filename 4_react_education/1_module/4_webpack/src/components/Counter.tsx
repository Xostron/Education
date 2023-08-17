import { useState } from "react";
import './style.scss'

export function Counter() {
	const [count, setCount] = useState(0);
	function increment() {
		setCount(count + 1);
	}
	return (
		<div className='wrapper'>
			<h1>{count}</h1>
			<button onClick={increment}>Increment</button>
		</div>
	);
}
