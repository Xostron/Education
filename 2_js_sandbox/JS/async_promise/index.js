// Асинхронная функция - возвращает результат через 2сек
function fnAsync(idx) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(new Date().toISOString(), "fnAsync", idx)
			resolve(idx)
		}, 2000)
	})
}

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

