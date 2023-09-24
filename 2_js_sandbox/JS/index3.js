console.log("Index 3");
// event loop - микротаски и макротаски
console.log("start");
setTimeout(() => console.log(2), 0);
Promise.resolve().then((_) => {
	setTimeout(() => {
		console.log(0);
	}, 0);
});
Promise.resolve().then((_) => console.log("promise1"));
console.log("mid");
const p = new Promise((resolve) => {
	console.log("p");
	resolve();
});
setTimeout(() => console.log(3), 0);
Promise.resolve().then((_) => console.log("promise2"));
p.then((_) => console.log("promise3"));
console.log("end");
/* 
ответ:
start
mid
p
end
promise1
promise2
promise3
2
3
0
выполняется start, заносится в макротаски (2), заносится в микротаски (setTimeout(0)), заносится в микротаски (setTimeout(0), promise1)
выполняется mid, выполняется p (сохранение в переменную р), заносится в макротаски (2, 3), заносится в микротаски (setTimeout(0), promise1, promise 2, promise3)
выполняется end, проверка и выполнение всех микротасков: сначала setTimeout(0), который заносится в макротаски (2, 3, 0)
выполнение оставшиъ микротасков promise1, promise 2, promise3, 
начинается выполнение макротаска (setTimeout2), проверка микротасков - она пуста, выполнение микротаска (setTimeout3), проверка микротасков - она пуста
начинается выполнение макротаска (setTimeout0), проверка микротасков - она пуста, макротаски - пусты - Ожтдание макрозадач (события мыши и т.д.)
*/


// async function main(){
//     console.log('a')
//     await sleep(2000)
//     console.log('b')
//     await sleep(2000)
//     console.log('d')
// }

// function sleep(ms){
//     return new Promise((resolve)=>setTimeout(resolve,ms))
// }

// main()
// console.log('c')

// console.log('start')
// setTimeout(()=>console.log('time 1'))
// Promise.resolve().then(()=>console.log('promise 1'))
// setTimeout(()=>console.log('time 2'))
// Promise.resolve().then(()=>console.log('promise 2'))
// console.log('end')

// async function a() {
// 	try {
//         console.log('start')
// 		let user = await get();
//         throw new Error('msg')
//         console.log(user)
// 		return user;
// 	} catch (error) {
// 		console.log('@@@',error);
// 	}
// }
// const b = a()
// console.log(b);

// function get() {
// 	return new Promise((resolve) => {resolve(5)});
// }

// console.log(await Promise.resolve('Hi'))

// async function a(){
//     get().then(console.log)
// }
// async function b(){
//     const r = await get()
//     console.log('b = ',r)
// }
// function get(i) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(()=>resolve(i),1000)
// 	});
// }
// a()
// b()
// get().catch(err=>console.log('@',err))

// let promise = Promise.resolve();
// async function d() {
// 	for (let i = 0; i < 10; i++) {
// 		const r = await get(i);
// 		console.log(r);
// 	}
// }
// d()
