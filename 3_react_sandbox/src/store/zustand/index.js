import { create } from "zustand";

const useStoreZustand = create((set) => ({
	bears: 0,
	todo: "...",
	inc: () => set((state) => ({ bears: state.bears + 1 })),
	rmv: () => set({ bears: 0, todo: "..." }),
	getTodo: () => {
		fetch("https://jsonplaceholder.typicode.com/todos/" + getRandomInt(0,101))
			.then((f) => {
				return f.json();
			})
			.then((data) => set({ todo: data }))
			.catch((err) => new Error(err));
	},
}));
export default useStoreZustand;

function getData() {
	return new Promise((resolve, reject) => {
		fetch("https://jsonplaceholder.typecode.com/todos/1")
			.then((data) => {
				return data.json();
			})
			.then(resolve)
			.catch(reject);
	});
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
