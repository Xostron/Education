import { useState } from "react";
import style from "./style.module.scss";

export function Counter() {
	const [count, setCount] = useState(0);
	function increment() {
		setCount(count + 1);
	}
	return (
		<div className={style.wrapper}>
			<h1>{count}</h1>
			<button onClick={increment}>Increment</button>
		</div>
	);
}
