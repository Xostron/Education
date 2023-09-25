// console.log("index1.js");
// // *****************************************************
const obj1 = {
	name: "xostron",
	q: 1,
	abc: "123",
}
let q = Object.getOwnPropertyNames(obj1)
let w = Object.keys(obj1)
// // let r = Object.getOwnPropertySymbols(obj)
console.log("getOwnPropertyNames = ", q, w)
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
console.log("PUSH obj")
const result = []
const doc = { name: "xos" }
result.push(doc)
console.log("@1 = ", result)
doc.type = "x"
console.log("@2 = ", result)
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
const arr = Array(15).fill(0)
console.log("@@@ create arr = ", arr)
const arr1 = Array(15)
	.fill(0)
	.map((_, i) => ({
		id: i + 1,
		code: "proList",
		key: "screen" + (i + 1),
	}))
	arr1.unshift({ id: 0, code: "proList", key: "img" })
console.log("@@@ create screen = ", arr1)
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

// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
