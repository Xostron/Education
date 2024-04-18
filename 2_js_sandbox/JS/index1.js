// console.log("index1.js");
// // *****************************************************
// const obj1 = {
// 	name: "xostron",
// 	q: 1,
// 	abc: "123",
// }
// let q = Object.getOwnPropertyNames(obj1)
// let w = Object.keys(obj1)
// // // let r = Object.getOwnPropertySymbols(obj)
// console.log("getOwnPropertyNames = ", q, w)
// // console.log('getOwnPropertySymbols = ',r)
// // *****************************************************
// const obj = { name: { f: 123, m: 456 } };
// // delete obj.name
// delete obj.owner;
// console.log("delete property = ", obj);
// // *****************************************************
// const doc = null
// console.log("obj ? ", !!doc)
// const doc1 = {}
// console.log("obj ? ", !!doc1)
// // *****************************************************
// console.log("PUSH obj")
// const result = []
// const doc = { name: "xos" }
// result.push(doc)
// console.log("@1 = ", result)
// doc.type = "x"
// console.log("@2 = ", result)
// // *****************************************************
// switch (false) {
// 	case !!null:
// 		console.log("null = ", !!null);
// 		break;
// 	case !!{}:
// 		console.log("{} =", !!{});
// 		break;
// 	default:
// 		break;
// }
// // *****************************************************
// const arr = Array(15).fill(0)
// console.log("@@@ create arr = ", arr)
// const arr1 = Array(15)
// 	.fill(0)
// 	.map((_, i) => ({
// 		id: i + 1,
// 		code: "proList",
// 		key: "screen" + (i + 1),
// 	}))
// 	arr1.unshift({ id: 0, code: "proList", key: "img" })
// console.log("@@@ create screen = ", arr1)
// // *****************************************************
// const id = {}
// const i = []
// console.log('object = ', id instanceof Array)
// console.log('arr = ')
// // *****************************************************
// // insert date in mongo by gui
// // { "$date": "2021-07-15T10:30:48.021Z" }
// // *****************************************************
// console.log(
// 	"filter: ",
// 	[1, 2, 3, 4, 5].filter((val) => val > 3)
// )

// const p = [
// 	{ id: 1, valid: true },
// 	{ id: 2, valid: false },
// 	{ id: 3, valid: false },
// ]
// function filter(arr) {
// 	return arr.filter((el) => el.valid)
// }
// console.log("filter 2: ", filter(p))
// // *****************************************************
// const obj2 = {
// 	name:'qwe',
// 	psw:'123'
// }
// const a1 = Object.entries(obj2)
// console.log('entries = ', a1)

// // **JSON циклические ссылки***************************************************
// const obj3 = {
// 	id: 123,
// 	name:'xos'
// }
// const obj4={
// 	id:410,
// }
// obj3.parent = obj4
// obj4.children = obj3
// console.log('obj3 = ',obj3)
// const j = JSON.stringify(obj3,['id','parent','name'], 2)
// console.log('obj3 Json = ', j)
// // *****************************************************
// console.log('NULL = ', null, typeof null, !!null, null || 'null+||', null ?? 'null??')
// *****************************************************
// event loop: очередь макрозадач (события, таймауты, скрипт) и микрозадач (промисы)
// console.log('start')
// setTimeout(()=>console.log('time 1'))
// Promise.resolve().then(()=>console.log('promise 1'))
// setTimeout(()=>console.log('time 2'))
// Promise.resolve().then(()=>console.log('promise 2'))
// console.log('end')
/* Алгоритм работы
 - синхронный код - исполнение сразу же start
 (сначала проверка очереди микрозадач = 0, их нет переход к выполнению макрозадач = 0)
- таймаут 1 - помещается в очередь макрозадач [time1]
- Промис 1 помещается в очередь микрозадач [promise1]
- Таймаут 2 - помещается в очередь макрозадач [time1,time2]
- Промис 2 помещается в очередь микрозадач [promise1, promise2]
- синхронный код - исполнение сразу же end
- (сначала проверка очереди микрозадач =[promise1, promise2] - выполнение всех микрозадач 
	очередь микрозадач = [], 
- выполнение макрозадачи time1 
(проверка очереди микрозадач = [])
выполнение макрозадачи time2
(проверка очереди микрозадач = [])
Ожидание задачи...


Result: 
start
end
promise1
promise2
time1
time2
*/

// *****************************************************
/*
БЭМ - блок_элемент_модификатор
например модальное окно: .modal__content_open {}
modal - блок - модальное окно
content - элемент - контентная часть
open - модификатор - окно открыто

*/
// *****************************************************
// function withRouter(component) {
// 	return () => component
// }
// function compose(func) {
// 	console.log("func = ", func)
// 	return func
// }

// const q1 = withRouter(10)
// const q2 = compose(q1)
// console.log(q2)

// // *****************************************************
// console.log("Array.isArray = ", Array.isArray([1, 2]))
// // *****************************************************
// const myIn = document.querySelector("#input1")
// console.log(myIn)
// myIn.addEventListener("change", (v) => {
// 	console.log("@@@ change = ", v, v.target.value, v.selectionStart)
// 	myIn.setSelectionRange(10,0)
// })

// map min max *****************************************************
// console.log('MAP')
// const arr= [1, 2, 3, 4, -5]
// const r = arr.filter((t) => {
// 	if (t === 3) {
// 		return { val: t }
// 	}
// })
// console.log(r)
// console.log(Math.min(...arr))

// const arrr = [{id:1}, {id:2}, {id:3}]
// const ind = arrr.indexOf()
// console.log('@', ind)

// forEach *****************************************************
// ;[1, 2, 3, 4, 5].forEach((el) => {
// 	if (el > 3) return
// 	console.log(el)
// })
// // Строки*****************************************************
// const a = 'Casdasdasd .json'
// console.log('aaaa', a.includes('.json'))
// // слияние массивов*****************************************************
// const q1 = [1,2,3]
// const q2 = [4,5,6]
// const q3 = [...q1, ...q2]
// const q4 = []

// console.log('111', q3, q4)
// *****************************************************
// const a = new Date()
// for (let i = 0; i < 10000000; i++) {}
// const b = new Date()
// console.log(b-a)
// const t = new Date().getTime() + 5000
// const t1 = new Date().getTime()
// console.log(t1, t)
// *****************************************************
// const a = { 1: { name: 'a', surname: 'aa' }, 2: { name: 'b', surname: 'bb' } }
// for (const key in a) {
// 	if (a[key].name === 'a') delete a[key]
// 	console.log(a[key])
// }

// a1=null
// b1=null
// console.log(a1===b1)
// *****************************************************
const data = [1, 2, 3, 4, 5]
const obj = {}

function a(el) {
	return new Promise((resolve, reject) => {
		const p = []
		for (let index = 0; index < 10000000; index++) {
			p.push(index)
		}
		resolve(el)
	})
}

async function b() {
	try {
		const result = []
		for (const el of data) {
			const q = await a(el)
			result.push(el + q)
			console.log(111)
		}
		throw Error('@@@ error')
	} catch (error) {
		throw error
	}
}

async function c1() {
	try {
		obj['b'] = await b()
		console.log(333, obj)
	} catch (error) {
		console.log(error)
	}
}

c1().finally((_) => {
	console.log('repeat')
	c1()
})

// *****************************************************
const r1 = { start: false }
const r2 = { start: true }
const r3 = { start: null }
const r4 = {}
console.log(typeof r1.start, typeof r2.start, typeof r3.start, typeof r4.start)
// цепочки обработки *****************************************************
// function a() {
// 	return new Promise()
// }

// new Promise((resolve, reject) => {
// 	reject('E1')
// })
// 	.then(() => {
// 		console.log('then1')
// 	})
// 	.finally(() => {
// 		console.log('finally1')
// 	})
// 	.catch(() => {
// 		console.log('catch1')
// 	})
// 	.then(() => {
// 		console.log('then2')
// 	})
// 	.catch(() => {
// 		console.log('catch2')
// 	})
// 	.finally(() => {
// 		console.log('finally2')
// 	})

// 	const sig = [1,2,34,5].find(el=>el===34)
// 	console.log('@@',sig)

// 	console.log(Number(false))
