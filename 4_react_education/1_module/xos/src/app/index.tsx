import { Routing } from '../pages';
import "./index.scss";
import { withProviders } from './providers';

function App() {
	return (
		<div className='app dark'>
			<h1>Базовая настройка webpack, React, Typescript, sass(scss)</h1>
			<Routing/>
		</div>
	);
}

export default withProviders(App)
