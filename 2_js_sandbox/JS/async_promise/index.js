// Асинхронная функция - возвращает результат через 2сек
// function fnAsync(idx) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			console.log(new Date().toISOString(), "fnAsync", idx)
// 			resolve(idx)
// 		}, 2000)
// 	})
// }

//================= Неправильная обработка множества fnAsync
// function main2() {
// 	return new Promise((resolve, reject) => {
// 		const arr = Array(5).fill(1)
// 		for (const key in arr) {
// 			fnAsync(key)
// 		}
// 		resolve()
// 	})
// }

// main2()
// 	.then((_) => console.log(new Date().toISOString(), "Готово!"))
// 	.catch((err) => console.log("Error", err))

//================= Правильная обработка - паралельное выполнение множества fnAsync
// function main1() {
// 	return new Promise((resolve, reject) => {
// 		const arr = Array(5).fill(1)
// 		const p = arr.map((el, idx) => fnAsync(idx))
// 		Promise.all(p)
// 			.then((r) => {
// 				console.log("main", new Date().toISOString(), r)
// 				resolve(r)
// 			})
// 			.catch(console.log)
// 	})
// }

// main1()
// 	.then((_) => console.log("Готово!", new Date().toISOString()))
// 	.catch((err) => console.log("Error", err))

//================= Правильная обработка последовательное исполнение множества fnAsync
// async function main3() {
// 	const arr = Array(5).fill(1)
// 	for (const key in arr) {
// 		await fnAsync(key)
// 	}
// 	return
// }

// main3()
// 	.then((_) => console.log(new Date().toISOString(), "Готово!"))
// 	.catch((err) => console.log("Error", err))

const a = Promise.resolve(1)
const c = Promise.resolve(2)
const b = Promise.resolve(3)

// Promise.all([a, b, c])
// 	.then((r) => {
// 		console.log("all", r)
// 	})
// 	.catch((err) => console.log("error:", err))

// Promise.allSettled([a, b, c])
// 	.then((r) => {
// 		console.log("allSettled", r)
// 	})
// 	.catch((err) => console.log("error settled", err))

function fn() {
	return new Promise((resolve, reject) => {
		a.then((r) => {
			console.log(1, r)
			if (r === 1) {
				resolve(10)
				// return Promise.reject({ r })
				throw new Error()
			}
			console.log("after")
			return b
		})
			.then((r) => {
				console.log(2, r)
				return c
			})
			.then((r) => {
				console.log(3, r)
				resolve(r)
			})
			.catch((err) => {
				console.log(55, err)
				reject(err)
			})
	})
}

fn()
	.then((r) => console.log("finish", r))
	.catch((err) => console.log(5, err))
