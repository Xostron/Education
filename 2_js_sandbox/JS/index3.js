console.log("Index 3");

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
function get(i) {
	return new Promise((resolve, reject) => {
		setTimeout(()=>resolve(i),1000)
	});
}
// a()
// b()
// get().catch(err=>console.log('@',err))

// let promise = Promise.resolve();
async function d() {
	for (let i = 0; i < 10; i++) {
		const r = await get(i);
		console.log(r);
	}
}
d()