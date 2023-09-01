import Card from "shared/ui/card"
import "./styles/index.scss"

export default function App() {
	return (
		<div className='app'>
			<h1>Базовая настройка webpack, React, Typescript, sass(scss)</h1>
			<Card />
			<p>__IS_DEV__ = {__IS_DEV__+''} - глобальная переменная </p>
		</div>
	)
}
