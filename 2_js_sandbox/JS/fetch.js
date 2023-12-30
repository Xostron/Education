// const tq = "https://dummyjson.com/todos";
// async function getTodos(url) {
// 	const res = await fetch(url);
// 	console.log("@ res", res);
// 	data = await res.json();
// 	return data;
// }
// getTodos(tq).then(console.log);

// eventloop пример 1
// setTimeout(() => console.log(1), 0);
// setTimeout(() => console.log(2), 0);
// Promise.resolve(3).then(console.log);
// console.log("4");

// eventloop пример 1
// console.log('start')
// setTimeout(() => console.log(2), 0)
// Promise.resolve().then((_) => {
// 	setTimeout(() => {
// 		console.log(0)
// 	}, 0)
// })
// Promise.resolve().then((_) => console.log('promise1'))
// console.log('mid')
// const p = new Promise((resolve) => {
// 	console.log('p')
// 	resolve()
// })
// setTimeout(() => console.log(3), 0)
// Promise.resolve().then((_) => console.log('promise2'))
// p.then((_) => console.log('promise3'))
// console.log('end')

// const b = {
// 	a: 1,
// 	b: {
// 		a: 10,
// 		b: 100,
// 		c: 1000,
// 	},
// };

// const c = JSON.parse(JSON.stringify(b)); //глуюокое клонирование
// const d = b; //ссылка
// const e = { ...b }; //не глубокое клонирование

// // не глубокое клонирование
// const f = {};
// Object.assign(f, b);

// // глубокое клонирование - новая функция поддерживается только новыми браузерам
// const g = structuredClone(b)

// b.b.a = 42;
// b.a = 420;
// console.log("b", b);
// console.log("c", c);
// console.log("d", d);
// console.log("e", e);
// console.log("f", f);
// console.log("g", g);

// isNun, number
// const obj = {
// 	A1: 1,
// 	B1: 2,
// 	AA1: 3,
// 	AB1: 4,
// 	A2: 1,
// 	B2: 2,
// 	AA2: 3,
// 	AB2: 4,
// 	A3: 1,
// 	B3: 2,
// 	AA3: 3,
// 	AB3: 4,
// };
// const ref = ["A", "B", "AA", "AB"];

// for (const key in obj) {
// 	const n = isN(key);
// 	if (n < 2) continue;
// 	console.log("@", key, n, obj[key]);
// }

function isN(k) {
	const n = k.slice(1)
	if (+n === +n) {
		return +n
	}
	return isN(n)
}

// console.log('Nan = ', NaN, typeof NaN, NaN===NaN,NaN==NaN, NaN==1)

const obj = {
	A1: 1,
	B1: 2,
	AA1: 3,
	AB1: 4,
	A2: 1,
	B2: 2,
	AA2: 3,
	AB2: 4,
	A3: 1,
	B3: 2,
	AA3: 3,
	AB3: 4,
}

const rows = main(obj)
mutation(rows)
console.log("Result = ", rows)

function main(obj) {
	const rows = []
	const has = []
	const raw = Object.entries(obj)

	for (const key in obj) {
		const n = isN(key)
		if (has.includes(n)) continue
		const prd = raw.reduce((o, el) => {
			console.log(el[0], el[1])
			if (+el[1] === 4) o = { ...o, [el[0]]: el[1] }
			return o
		}, {})
		console.log("@ prd= ", prd)
		has.push(n)
		rows.push(prd)
	}
	return rows
}

function mutation(rows) {
	rows.forEach((el, idx) => {
		// с элементом не мутирует
		// el = {...el, 'AB1':10}
		// записывать в исходный массив
		rows[idx] = { ...rows[idx], AB1: el["AB1"] * 10 }
	})
}

// пропустить итерацию, выйти из цикла нельзя
// [1,2,3,4,5].forEach(v=>{
// 	if (v===3) return
// 	console.log(v)
// })

// [1,2,3,4,5].some(v=>{
// 	if (v===3) return true
// 	console.log(v)
// })

const in3 = [1, 2, 3, 4, 5].every((v) => v >= 1)
console.log(in3)
