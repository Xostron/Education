import timer from "../../store/mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function Clock() {
	// запуск интервала, при удалении компонента - интервал отменяем
	useEffect(() => {
		const t = setInterval(() => {
			timer.update();
			timer.todo++
		}, 1000);
		return () => {
			clearInterval(t);
		};
	}, []);
	return (
		<>
		TEXT lang {timer.todo }
			<button onClick={() => timer.lang()}>{timer.sec}</button>
		</>
	);
}

// для того чтобы mobx понимал нужно ли отрендеривать компонент
// оборочиваем его в функцию observer, которая наблюдает за состоянием компонента
export default observer(Clock);
