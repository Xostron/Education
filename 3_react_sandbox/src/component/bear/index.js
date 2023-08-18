import useStoreZustand from "../../store/zustand";

export default function Bear() {
	// const bears = useStoreZustand((state) => state.bears);
	// const hndlInc = useStoreZustand((state) => state.inc);
	// const hndlRmv = useStoreZustand((state) => state.rmv);
	const { bears, hndlInc, hndlRmv, fetch, todo } = useStoreZustand(
		(state) => ({
			bears: state.bears,
			hndlInc: state.inc,
			hndlRmv: state.rmv,
			fetch: state.getTodo,
			todo: state.todo,
		})
	);

	return (
		<>
			<h1>{bears} around here...</h1>
			<button onClick={hndlInc}>+1</button>
			<button onClick={hndlRmv}>Remove all</button>
			<button onClick={fetch}>Fetch</button>
			<p>{todo === "..." ? todo : JSON.stringify(todo, null, 2)}</p>
		</>
	);
}
