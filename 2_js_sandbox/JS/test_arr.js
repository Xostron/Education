// // сортировка
// const arr = [10, 9, 8, 7, 1, 23, 4, 5]
// // arr.sort((a, b) => (a > b ? 1 : -1))
// // console.log(arr)

// // Пропуск итерации forEach
// arr.forEach((el) => {
// 	if (el === 10 || [4, 23, 1].includes(el)) return
// 	console.log('=', el)
// })
// const t= {a:null}
// console.log(!t.a)
// // Изменение элементов в forEach
// // arr.forEach((el, idx) => {
// // 	if (el === 10 || [4, 23, 1].includes(el)) return
// // 	console.log('=', el)
// // 	arr[idx] = 888
// // })
// // console.log('arr = ', arr)

// // Изменение объектов
// // const el = {
// // 	id: 1,
// // 	name: 'warhammer',
// // }
// // function change(el) {
// // 	const ctg = { ...el, id: 10 }
// // 	console.log(ctg)
// // 	return ctg
// // }

// // // change(el)
// // console.log('el = ', change(el), el)

// // выход из вложенных циклов
// const data = {
// 	1: [
// 		{
// 			id: 1,
// 			name: 'w1',
// 		},
// 		{
// 			id: 2,
// 			name: 'w2',
// 		},
// 		{
// 			id: 3,
// 			name: 'w3',
// 		},
// 	],
// 	2: [
// 		{
// 			id: 4,
// 			name: 'q1',
// 		},
// 		{
// 			id: 5,
// 			name: 'q2',
// 		},
// 		{
// 			id: 6,
// 			name: 'q3',
// 		},
// 	],
// 	3: [
// 		{
// 			id: 7,
// 			name: 's1',
// 		},
// 		{
// 			id: 8,
// 			name: 's2',
// 		},
// 		{
// 			id: 9,
// 			name: 's3',
// 		},
// 	],
// }

// const el = {
// 	id: 1,
// 	name: '',
// }

// console.log('start', el, data)

// for (const key in data) {
// 	let exit = false
// 	for (const obj of data[key]) {
// 		if (obj.id === el.id) {
// 			el.name = obj.name
// 			console.log('++', el.id)
// 			exit = true
// 			break
// 		}
// 		console.log('+')
// 	}
// 	if (exit) break
// 	console.log('@', key)
// }

// console.log('end', el, data)

// nested(data, el)
// console.log('end2', el, data)

// function nested(data, el) {
// 	for (const key in data) {
// 		for (const obj of data[key]) {
// 			if (obj.id === el.id) {
// 				el.name = obj.name
// 				console.log('++', el.id)
// 				exit = true
// 				return
// 			}
// 			console.log('+')
// 		}
// 		console.log('@', key)
// 	}
// }

// const ctg = { _id: 1, name: 'ctg' }
// const add = { _idx: 10, msg: 'ID не найден' }

// const d = { ...ctg, add: { ...add, msg: 'Данная категория содержит товары' } }

// console.log('@@@ = ', d)

// const qwe = [
// 	{
// 		_id: null,
// 		name: 'Игровой ноутбук',
// 		adult: '',
// 		parent: '62b586718cc3629ad770e15e',
// 		idx: 0,
// 		err: 'Категория с товарами',
// 	},
// 	{
// 		_id: null,
// 		name: 'Офисный ноутбук',
// 		adult: '',
// 		parent: '62b586718cc3629ad770e15e',
// 		idx: 1,
// 		err: 'Категория с товарами',
// 	},
// 	{
// 		_id: '62b586718cc3629ad770e15e',
// 		name: 'Ноутбуки',
// 		adult: '',
// 		parent: null,
// 		idx: 2,
// 	},
// 	{ _id: null, name: 'Категория 1', adult: '', parent: 1 },
// 	{ _id: null, name: 'Категория 2', adult: '', parent: 1 },
// 	{ _id: 1, name: 'Категория', adult: '', parent: null },
// 	{
// 		_id: '64a3b6b9d2c2caf93b79521a',
// 		name: 'Test+',
// 		adult: '',
// 		parent: null,
// 		idx: 6,
// 	},
// 	{
// 		_id: 2,
// 		name: 'Test1',
// 		adult: 'Да',
// 		parent: '64a3b6b9d2c2caf93b79521a',
// 		idx: 7,
// 		err: 'Категория с товарами',
// 	},
// 	{ _id: 3, name: 'Test1.1', adult: '', parent: 2 },
// 	{ _id: null, name: 'Test1.1.1', adult: '', parent: 3 },
// 	{
// 		_id: null,
// 		name: 'Test1.1.2',
// 		adult: '',
// 		parent: 4,
// 		err: 'Ссылка на ID не найдена',
// 	},
// 	{
// 		_id: null,
// 		name: 'Test1.1.3',
// 		adult: '',
// 		parent: 4,
// 		err: 'Ссылка на ID не найдена',
// 	},
// 	{
// 		_id: '63bc1c68964dbe7144b27b1f',
// 		name: 'Товары дня +++',
// 		adult: '',
// 		parent: null,
// 		idx: 12,
// 	},
// 	{
// 		_id: null,
// 		name: 'Товары со скидкой 20%',
// 		adult: '',
// 		parent: '63bc1c68964dbe7144b27b1f',
// 		idx: 13,
// 		err: 'Категория с товарами',
// 	},
// 	{
// 		_id: null,
// 		name: 'Товары со скидкой 20%',
// 		adult: '',
// 		parent: '63bc1c68964dbe7144b27b1f',
// 		idx: 14,
// 		err: 'Категория с товарами',
// 	},
// 	{ _id: null, name: 'Apple', adult: '', parent: 5 },
// 	{ _id: null, name: 'Samsung', adult: '', parent: 5 },
// 	{
// 		_id: 5,
// 		name: 'Смартфоны',
// 		adult: '',
// 		parent: 5,
// 		err: 'Ссылка на ID равен ID',
// 	},
// ]

// function totalError(arr) {
// 	for (const el of arr) {
// 		if (el?.err) continue
// 		for (const x of arr) {
// 			if (el.parent && el.parent === x._id) {
// 				el.err = 'связанная ошибка'
// 				break
// 			}
// 		}
// 	}
// }
// console.log(qwe)
// totalError(qwe)
// console.log(qwe)

// const arr = [{ a: 1 }]
// console.log(arr)
// arr.length = 3
// console.log(arr)

// reduce ***************************************
// const obj = {
// 	description: {
// 		short: 'www@com',
// 		extra: 'qwe',
// 		feature: '007',
// 	},
// }
const key = ['description', 'feature']

// const r = key.reduce((acc, k, idx) => {
// 	console.log('@ = ', acc, k, idx)
// 	if (idx === 0) return (acc = obj[k])
// 	return (acc = acc[k])
// }, {})
// console.log(r)

// const a = [{a:1, b:2}]
// const s = a[0]
// console.log('@@@ s = ', s)

// выход из цикла for in
// const object = { a: 1, b: 2, c: 3, d: 4, e: 5 }
// let ref
// for (const key in object) {
// 	if (key === 'c') break
// 	console.log(key)
// 	ref = object[key]
// }
// console.log(ref)

// const prd = key.reduce((acc, el, idx) => {
// 	acc[el] = idx
// 	return acc
// }, {})

// console.log('PRD = ', prd)

// const o={}
// o['q']?.['w']=1
// console.log(o)

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
// 	'!ref': 100,
// }
// const ref = ['A', 'B', 'AA', 'AB']

// for (const key in obj) {
// 	const n = getN(key)
// 	if (n < 2) continue
// 	console.log('@@@', key, obj[key], n)
// }

// function getN(k) {
// 	const n = k.slice(1)
// 	if (+n === +n) {
// 		return +n
// 	}
// 	console.log('@ n', k, n, n.length)
// 	if (n.length > 1) return getN(n)
// 	return null
// }

// const n = new Date()
// console.log(n)
// const r = n.toLocaleString().split(',')[0]
// console.log(r)

// console.log(!!'d'===true, !'d'==false, 'd'==false, 'd'==true, 'd'===false, 'd'===true)

// const e = [1,2,3,4,5]
// const [a,...b]=e
// console.log(a,b)

// let str='hELlo'
// str.toLowerCase()
// let b1 = '' ?? 'asd'
// console.log(b1)
// const p = {a:2, b:1}
// const res = Object.values(p).every(v=>!!v)
// console.log('null = ', !!p.a, res)

// const obj1 = {
//     a: new Date('2023','11','25'),
//     b: new Date()
// }
// const r1 = JSON.stringify(obj1)

// const r2 = JSON.parse(r1)

// console.log(obj1, r1, r2)

// ref = ['_id', 'name', 'a']
// w = ['a', 'name']

// function inclusion(ref, incl) {
// 	return ref.length >= incl.length &&
//     incl.every((value, index) => ref.includes(value))
// }

// const r = inclusion(ref, w)
// console.log(r)

// const r = new Date('asd')
// console.log(r)

// const a = { value: 1, date1: '2023.12.25', date2:'2023.12.25' }
// const b = ''
// const c = { value: '30', date: '2023.12.25' }
// const d = undefined
// const e = { value: 10 }

// function checkObj(obj) {
// 	for (const key in obj) {
// 		if (key === 'value') {
// 			if (!obj[key] || !(+obj[key] === +obj[key])) return null
// 		}
// 		if (['date', 'date1', 'date2'].includes(key)) {
// 			if (new Date(obj[key]) == 'Invalid Date') return null
// 			obj[key] = new Date(obj[key])
// 		}
// 	}
// 	if (typeof obj === 'object') return Object.keys(obj).length >= 2 ? obj : null
// 	return null
// }

// console.log('a = ', checkObj(a))
// console.log('b = ', checkObj(b))
// console.log('c = ', checkObj(c))
// console.log('d = ', checkObj(d))
// console.log('e = ', checkObj(e))

// Q().then((r) => console.log('result = ', r))
// function Q() {
// 	return new Promise((resolve, reject) => {
// 		const a = 1,
// 			b = 2,
// 			c = 3
// 		Q1()
// 			.then((data) => {
// 				console.log('Q1 = ', data)
// 				if (a === 2) return Q2()
// 				return resolve(10)
// 			})
// 			.then((d) => {
// 				console.log('==',d)
// 				return Q3(d)
// 			})
// 			.then(resolve)
// 			.catch(reject)
// 	})
// }

// function Q1() {
// 	return new Promise((resolve, reject) => {
// 		return resolve(1)
// 	})
// }
// function Q2() {
// 	return new Promise((resolve, reject) => {
// 		return resolve(2)
// 	})
// }
// function Q3(d) {
// 	return new Promise((resolve, reject) => {
// 		return resolve(d)
// 	})
// }

// Валидация мобильного номера телефона (Только для РФ)
function validPhone(phone) {
	let regex = /^(\+7|7|8|1)9([0-9]{9})$/
	// Все российские номера
	// let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
	return regex.test('' + phone)
}
const r = validPhone(19095801234)
console.log('valid phone = ', r)

// возврат совпадений
let str = 'Любо, братцы, любо!'
const y = str.match(/любо/gi)
console.log(y)

// очистить строку от символов
let q = '@I!# l$ove y@ou@'
const w = q.replace(/@|!|#|\$/g, '')
console.log(w)


// Главный цикл
// function control() {
// 	return new Promise((resolve, reject) => {
// 		const obj = JSON.parse(data)
// 		// Прочитать оборудование (файлы json)
// 		readAll(obj)
// 			// Опрос модулей по сети
// 			.then((_) => read(obj))
// 			// Подготовка данных для клиента
// 			.then((v) => value(v, obj))
// 			// Отправка на клиент
// 			.then(cValue)
// 			// Подготовка: Переключение режимов и Пуск склада
// 			.then((_) => {
// 				// Стоп склада
// 				toOffBuild(obj)
// 				// Подготовка к авто
// 				toAuto(obj)
// 				// Переход в ручной режим
// 				toMan(obj)
// 				// Выкл секций
// 				toOff(obj)
// 			})
// 			// Анализ входов
// 			.then((_) => {})
// 			// Автоматический режим
// 			.then((_) => {
// 				auto(obj)
// 			})
// 			// Ручной режим
// 			.then((_) => {
// 				// Калибровка клапанов
// 				tuneup(obj)
// 			})
// 			// Выхода: Команды управления
// 			.then((_) => convCmd(obj))
// 			// Выхода: Блокировки
// 			.then((_) => writeLock(obj))
// 			// Выхода: Запись в модули
// 			.then((_) => writeVal(obj.output))
// 			// Запись в retain файл json
// 			.then((_) => save(obj))
// 			// Отправка на клиент: аварийные сообщения
// 			.then(() => {
// 				const alarmS = dataAlarmS.state
// 				// console.log(111, 'EXTRA', dataExtra?.['65d4aed4b47bb93c40100fd5']?.['65d4aee3b47bb93c40100fd6'])
// 				// console.log(111, JSON.stringify(alarmS, null, ' '))
// 				cAlarm(alarmS)
// 			})
// 			.then(() => resolve(true))
// 			// Обработка ошибок
// 			.catch(exception)
// 			// Цикл
// 			.finally((_) => {
// 				console.log('Cycle time', +new Date().getTime() - store.tick, 'ms')
// 				setTick()
// 				setTimeout(control, 1000)
// 			})
// 	})
// }


1717159363397 1717159347681 15716 50 7858 7858 1717159371255
333 {
  begin: 1717159347681,
  vlvIn: true,
  overtime: 7858,
  end: 1717159371255
}
111 ventByDura {
  begin: 1717159347681,
  vlvIn: true,
  overtime: 7858,
  end: 1717159371255
} ventByTime null