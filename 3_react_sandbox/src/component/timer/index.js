import timer from "../../store/mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function Clock() {
    // запуск интервала, при удалении компонента - интервал отменяем
	useEffect(() => {
		const t = setInterval(() => {
			timer.update();
		}, 1000);
		return () => {
			clearInterval(t);
		};
	}, []);
	return <button onClick={() => timer.reset()}>{timer.sec}</button>;
}

// для того чтобы mobx понимал нужно ли отрендеривать компонент
// оборочиваем его в функцию observer, которая наблюдает за состоянием компонента
export default observer(Clock);
