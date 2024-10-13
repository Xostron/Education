// Функциональное программирование

// *************** Замыкание ***************
const arr = [7, 1, 5, 21, -1, 0, 100]

function fn1(arr) {
	return function fn(x) {
		return arr.toSorted((a, b) => a - b).filter((el) => el >= x)
	}
}

const f1 = fn1(arr)
const r1 = f1(10)
console.log("r1", r1)

// *************** Композиция и конвейер ***************
const arr1 = [
	{ order: 2, id: "abc2" },
	{ order: 10, id: "abc10" },
	{ order: 3, id: "abc3" },
]
// фильтрация
function flt(arr, key, value, cbF) {
	return arr.filter(cbF(key, value))
}
function cbF(key, value) {
	return (el) => el?.[key] === value
}

const r2 = flt(arr1, "id", "abc2", cbF)
console.log("r2", r2)

// сортировка
function sort(arr, key) {
	return arr.toSorted((a, b) => a?.[key] - b?.[key])
}
const r3 = sort(arr1, "order")

console.log("r3", r3)

// Какое-то действие по отфильрованному и отсортированному массиву по каждому элементу
function run(arr) {
	const result = {}
	arr.forEach((el) => {
		result[el.id] = {
			order: el.order,
			id: el.id,
			name: `${el?.order}-${el?.id}`,
		}
	})
	return result
}
const r4 = run(r3)
console.log("r4", r4)

// reduce
const r5 = arr1.reduce((acc, el) => (acc += el?.order), 0)
console.log("r5", r5)

// Композиция - выполнение функций по порядку справа налево
function sort1(arr) {
	return arr.toSorted((a, b) => a.order - b.order)
}
function flt1(arr) {
	return arr.filter((el) => el.order >= 1)
}

function compose(fns) {
	return function (arr) {
		return fns.reduceRight((acc, fn) => fn(acc), arr)
	}
}
const rr6 = compose([run, sort1, flt1])
const r6 = rr6(arr1)
console.log("r6", r6)

// *******************
function compose2(fns) {
	return function (arr, key, value, cbF) {
		const r = fns.reduceRight((acc, fn, idx) => {
            console.log('@',idx, acc)
            return fn(acc, key, value, cbF)
		}, arr)
        return r
	}
}

function cbF2(key, value){
    return (el)=>el[key]>=value
}

const rr7 = compose2([run, sort, flt])
const r7 = rr7(arr1, "order", 3, cbF2)
console.log("r7", r7)

// Конвейер - выполнение функций по порядку слева направо
function pipe(fns) {
    return function (arr, key, value, cbF) {
		const r = fns.reduce((acc, fn, idx) => {
            console.log('@', idx, acc)
            return fn(acc, key, value, cbF)
		}, arr)
        return r
	}
}
const rr8 = pipe([flt, sort, run])
const r8 = rr8(arr1, "order", 3, cbF2)
console.log("r8", r8)

// Каррирование
