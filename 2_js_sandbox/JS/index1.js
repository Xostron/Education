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
// const data = [1, 2, 3, 4, 5]
// const obj = {}

// function a(el) {
// 	return new Promise((resolve, reject) => {
// 		const p = []
// 		for (let index = 0; index < 10000000; index++) {
// 			p.push(index)
// 		}
// 		resolve(el)
// 	})
// }

// async function b() {
// 	try {
// 		const result = []
// 		for (const el of data) {
// 			const q = await a(el)
// 			result.push(el + q)
// 			console.log(111)
// 		}
// 		throw Error('@@@ error')
// 	} catch (error) {
// 		throw error
// 	}
// }

// async function c1() {
// 	try {
// 		obj['b'] = await b()
// 		console.log(333, obj)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

// c1().finally((_) => {
// 	console.log('repeat')
// 	c1()
// })

// // *****************************************************
// const r1 = { start: false }
// const r2 = { start: true }
// const r3 = { start: null }
// const r4 = {}
// console.log(typeof r1.start, typeof r2.start, typeof r3.start, typeof r4.start)
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
// Клонирование объекта
// const o = {
// 	id: 1,
// 	coef: 100,
// 	foo: function () {
// 		console.log('foo', this.id)
// 	},
// }

// const arr = []
// for (let i = 0; i < 3; i++) {
// 	const r = {}
// 	Object.assign(r, o)
// 	console.log(r)
// 	r.id = i
// 	arr.push(r)
// }
// o.id = 5
// console.log('arr', arr)

// ********************** ООП **********************
// class Client {
// 	name = ''
// 	surname = ''
// 	lastname = ''
// 	addressId = ''
// 	contactId = ''
// 	_id = ''
// 	constructor(obj) {
// 		const { name, surname, lastname, addressId, contactId, _id } = obj
// 		this.name = name
// 		this.surname = surname
// 		this.lastname = lastname
// 		this._id = _id
// 		this.addressId = addressId
// 		this.contactId = contactId
// 	}
// 	fullName() {
// 		return this.name + ' ' + this.surname + ' ' + this.lastname
// 	}
// 	foo(a) {
// 		console.log('aaa')
// 		return a + a
// 	}
// 	// Перегрузка выполняется последний
// 	foo(a) {
// 		console.log('aaa1')
// 		return a + a
// 	}
// }
// class Employee extends Client {
// 	constructor(obj) {
// 		const { companyId, date1, date2, name } = obj
// 		super(obj)
// 		this.companyId = companyId
// 		this.date1 = date1 ?? null
// 		this.date2 = date2 ?? null
// 	}
// 	fullName() {
// 		const a = super.fullName()
// 		return this.companyId + ' ' + a
// 	}
// }
// const c1 = { name: 'xos', surname: 'x2', lastname: 'x3', _id: '1', contactId: '2', addressId: '3' }
// const client1 = new Client(c1)
// console.log(client1.fullName())
// console.log(client1.foo(1))
// console.log(client1.foo('as'))
// const emp1 = new Employee({ companyId: 'asdfg123asfd88kjkk7', date1: new Date(), name: 'xostron' })
// console.log(emp1.fullName())
// // Полиморфизм: 1. Параметрический (истинный) - переопределение методов у наследуемых классах
// // 2. ad-hoc (мнимый) - 2 одинаково названные функции внутри класса, которые делают разные вещи в зависимости от типа входных параметров - перегрузка

// // Композиция классов - Класс Car состоит из дочерних классов Engine, Wheel, у Car есть метод drive, который вызывает методы drive дочерних классов (этот прием называется делегирование)
// // Агрегация классов - Класс Car и класс AI, отличие от композиции в том что Engine и Wheel классы создаются при создании класса Car, при удалении класса Car
// // при удалении класса Car они также удалятся, класс AI создается отдельно и передается в Car параметром в конструкторе
// class Engine {
// 	drive() {
// 		console.log('engine go')
// 	}
// }
// class Wheel {
// 	drive(i) {
// 		console.log('wheel rotate', i)
// 	}
// }
// class AI {
// 	code = 'Автопилот'
// 	version = 0
// 	update() {
// 		++this.version
// 	}
// }
// class Car {
// 	wheels = []
// 	constructor(ai) {
// 		// Агрегация
// 		this.ai = ai
// 		// Композиция
// 		this.engine = new Engine()
// 		this.wheels.push(new Wheel())
// 		this.wheels.push(new Wheel())
// 		this.wheels.push(new Wheel())
// 		this.wheels.push(new Wheel())
// 	}
// 	drive() {
// 		this.engine.drive()
// 		for (let i = 0; i < this.wheels.length; i++) {
// 			this.wheels[i].drive(i)
// 		}
// 	}
// }

// const ai = new AI()
// const car = new Car(ai)
// console.log(ai)
// console.log(car)
// ai.update()
// console.log(ai)
// ai.update()
// console.log(ai)
// console.log(car)

// Интерфейсы и Абстрактные классы
// Интерфейс описывает содержание объекта
// interface IAI {
// 	code: String;
// 	update(): void;
// }
// Абстрактный класс - интерфейс + в нем можно определять методы с логикой

//Внедрение зависимостей Dependency Injection

// const a = {
// 	name: 'xos',
// 	surname: 'Tron',
// 	foo() {
// 		console.log(222, this.name)
// 	},
// 	func() {
// 		console.log(333)
// 		this.foo()
// 	},
// }
// console.log(111, a)
// a.func()

// const r = {
// 	1:{val:true},
// 	2:{val:false},
// 	3:{val:false},
// 	get total(){
// 		return this[1]
// 	}
// }

// console.log(r)

// const a = [1,2,3]
// for (const v of a) {
// 	if (v===1) break
// 	console.log(v)
// }

// a.forEach(el=>{
// 	if (el===1) return
// 	console.log('A',el)
// })

// reduce
// const t = '00:01'
// const t1 = '01:01'

// const r = t.split(':').reduce((acc, val, i) => {
// 	if (i === 0) {
// 		acc = +val * 60 * 60 * 1000
// 	}
// 	if (i === 1) {
// 		acc += +val * 60 * 1000
// 	}
// 	return acc
// }, 0)

// const r1 = t1.split(':').reduce((acc, val, i) => {
// 	if (i === 0) {
// 		acc = +val * 60 * 60 * 1000
// 	}
// 	if (i === 1) {
// 		acc += +val * 60 * 1000
// 	}
// 	return acc
// }, 0)

// console.log(r, r1)

// const data = {
// 	100: { 1: null },
// 	write(buildingId, sectionId, type, obj) {
// 		this[buildingId] = {
// 			...this?.[buildingId],
// 			[sectionId]: {
// 				...this?.[buildingId]?.[sectionId],
// 				[type]: { ...this?.[buildingId]?.[sectionId]?.[type], ...obj },
// 			},
// 		}
// 	},
// 	read(buildingId, sectionId, type) {
// 		return { ...this?.[buildingId]?.[sectionId]?.[type] }
// 	},
// 	clear(buildingId, sectionId, type) {
// 		if (this?.[buildingId]?.[sectionId]?.[type] != null) this[buildingId][sectionId][type] = null
// 	},
// }
// console.log(111, data)
// let a = data.read(100, 1, 'antibliz')
// data.clear(100, 1, 'antibliz')
// console.log(222, a)

// data.write(100, 1, 'antibliz', { a: 1, b: 2, c: 3 })
// data.write(100, 1, 'over_vlv', { a: 100 })
// console.log(333, data)

// a = data.read(100, 1, 'antibliz')
// console.log(444, a)

// a.b = 1000
// data.write(100, 1, 'antibliz', a)
// // data.clear(100, 1, 'antibliz')
// console.log(555, a)
// console.log(666, data)

// console.log(777, 1 < a.z && 1> a.y)

// let a = data.read(1, 1, 'vent')
// console.log(333, 0, data)
// console.log(111, a)
// if (!a?.byTime?.endWait) {
// 	a = { ...a, byTime: { ...a?.byTime, endWait: 42 } }
// 	a.byTime.sum = a.byTime.endWait + 8
// }
// a.byTime.endWork = 12
// console.log(222, a)

// data.write(1, 1, 'vent', a)

// console.log(333, data)

// const r = [1]
// const r1 = [r[0], r[0]]
// console.log(444, r, r1)

// const a = {
// 	a: 1,
// 	b: 2,
// 	c: 3,
// 	a1: 1,
// 	b1: 2,
// 	c1: 3,
// 	a2: 1,
// 	b2: 2,
// 	c2: 3,
// 	a3: 1,
// 	b3: 2,
// 	c3: 3,
// }
// let a2 = {
// 	a: 1,
// 	b: 2,
// 	c: 3,
// 	a1: 1,
// 	b1: 2,
// 	c1: 3,
// 	a2: 1,
// 	b2: 2,
// 	c2: 3,
// 	a3: 1,
// 	b3: 2,
// 	c3: 3,
// }
// const o = { test: 12, test2: 42, r: 'qwe', r1: 'qwe1', r2: 'qwe2', r3: 'qwe3', r4: 'qwe4', r5: 'qwe5', r6: 'qwe6' }
// const o2 = { test: 12, test2: 42, r: 'qwe', r1: 'qwe1', r2: 'qwe2', r3: 'qwe3', r4: 'qwe4', r5: 'qwe5', r6: 'qwe6' }

// const t1 = +new Date().getTime()
// Object.assign(a, o)
// const t2 = +new Date().getTime()
// const t3 = t2 - t1
// console.log(111, a, t3)

// const q1 = +new Date().getTime()
// a2 = { ...a2, ...o2 }
// const q2 = +new Date().getTime()
// const q3 = q2 - q1
// console.log(111, a2, q3)

// console.log(1, 0 || null)
// console.log(2, 1 || null)
// console.log(3, undefined || null)

// console.log(4, 0 ?? null)
// console.log(5, 1 ?? null)
// console.log(6, undefined ?? null)

// let value
// let v
// if (value > 1000000 || value < -1000000 || isNaN(value)) v = 1
// console.log(777, isNaN(undefined))

// console.log(888, +false, +true)

// const a = [false, false, false, true]
// const b = [true, true, true, true]
// const r = a.some((el) => el === true)
// const u = b.every(el=>el===true)

// console.log(111, r, u)

// const t1 = new Date() - 150060000
// const t2 = new Date()
// console.log(222, t2 - t1)
// function getElapsed(ms) {
// 	const _sec = 1000
// 	const _min = 60 * 1000
// 	const _hour = 3600 * 1000
// 	const _day = 24 * 3600 * 1000

// 	const day = Math.trunc(ms / _day)
// 	const hour = Math.trunc((ms - day * _day) / _hour)
// 	const min = Math.trunc((ms - day * _day - hour * _hour) / _min)
// 	const sec = Math.trunc((ms - day * _day - hour * _hour - min * _min) / _sec)

// 	return [day, hour, min, sec]
// }

// const q = getElapsed(t2 - t1)
// console.log(q)

// const w = 1
// console.log(333, typeof w != 'object')

// const v = [{id:1, type:'out'},{id:2, type:'in'},{id:3, type:'out'}]

// const vIn = v.find(el=>el.type==='in')
// const vOut = v.filter(el=>el.type==='out')
// console.log(vIn, vOut)

// const o = {
// 	d1: { begin: '21:00', end: '23:59' },
// 	d2: { begin: '21:00', end: '00:00' },
// 	d3: { begin: '21:00', end: '00:05' },
// 	d4: { begin: '21:00', end: '01:00' },
// 	d5: { begin: '17:00', end: '19:00' },
// }
// const time1 = new Date().toLocaleTimeString('ru', {
// 	hour: 'numeric',
// 	minute: 'numeric',
// })
// console.log(111, o.drying.begin, o.drying.end)
// console.log(222, time1)

// function timeVal(str) {
// 	const a = str.split(':')
// 	const val = +a[0] * 100 + +a[1]
// 	return val
// }

// o2 = {
// 	d1: { begin: timeVal('21:00'), end: timeVal('23:59') },
// 	d2: { begin: timeVal('21:00'), end: timeVal('00:00') },
// 	d3: { begin: timeVal('21:00'), end: timeVal('00:05') },
// 	d4: { begin: timeVal('21:00'), end: timeVal('01:00') },
// 	d5: { begin: timeVal('17:00'), end: timeVal('19:00') },
// }

// console.log(333, o2)
// Напишите, пожалуйста, программу (функцию или метод),
// которая будет печатать числа от 0 до 1000,
// кратные трём и не кратные пяти, сумма цифр в которых меньше десяти.
// function fn() {
// 	const r = []
// 	for (let i = 0; i < 1000; i++) {
// 		if (i % 3 === 0 && i % 5 !== 0) {
// 			const sum = i
// 				.toString()
// 				.split("")
// 				.reduce((acc, c) => (acc += +c), 0)
// 			if (sum > 10) continue
// 			console.log(i, sum)
// 			r.push(i)
// 		}
// 	}
// 	return r
// }
// const data = fn()
// console.log(data)

// import fs from 'fs'
// import path from 'path'
const path = require('path')
const fs = require('fs')

const file = path.resolve('public/file.txt')
const out = path.resolve('public/out.txt')


const read = fs.createReadStream(file, "utf-8")
read.on("data", (chunk) => {
	const r = chunk.split('\r\n')
	console.log(111, r)
})
read.on('end',(d)=>{
	read.close()
})
const write = fs.createWriteStream(out, 'utf-8')

write.on('')