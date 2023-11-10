console.log(
	'%c Создание или модифицирование свойства объекта ',
	'color:yellow; background:black'
)

let myObject = {}
console.log('@1 = ', myObject)

// определяет новое свойство или модифицировать существующее свойство объекта.
Object.defineProperty(myObject, 'name', {
	// значение свойства
	value: 'xostron',
	// указаывает можно ли изменить значение свойства
	writable: true,
	// указывает будет ли свойство перечисляемым при использовании цикла for...in
	enumerable: true,
	// указывает можно ли удалить или изменить атрибуты (writable, enumerable) свойства
	configurable: true,
})
Object.defineProperty(myObject, '__name', {
	// значение свойства
	value: 'myObject',
	// указаывает можно ли изменить значение свойства
	writable: true,
	// указывает будет ли свойство перечисляемым при использовании цикла for...in
	enumerable: true,
	// указывает можно ли удалить или изменить атрибуты (writable, enumerable) свойства
	configurable: true,
})
console.log('@2 = ', myObject)

myObject.name = 'XosTron'
console.log('@3 = ', myObject)

for (const key in myObject) {
	console.log('MyObject key = ', key, ' : ', myObject[key])
}

// ************************************************************************************
console.log(
	'%c Протоколирование при помощи Proxy ',
	'color:yellow; background:black'
)
function makeLoggable(obj) {
	return new Proxy(
		obj,
		// создадим новый прокси объект с целевым объектом obj
		{
			get: (obj, property) => {
				console.log(
					`%c [${
						obj.__name ?? 'object'
					}] Reading property  ${property} : ${obj[property]}`,
					'color:#777'
				)
				return obj[property]
			},
			set: (obj, property, value) => {
				console.log(
					`%c [${
						obj.__name ?? 'object'
					}] Writing property  ${property} : ${value}`,
					'color:green'
				)
				obj[property] = value
			},
		}
	)
}

myObject = makeLoggable(myObject)

myObject.name = '@Xostron'
myObject.type = 'telegram'
myObject.name
myObject.type

// ************************************************************************************
console.log(
	'%c Измерение производительности при помощи Proxy ',
	'color:yellow; background:black'
)

function isPrime(number, x) {
	if (number < 2) return false
	for (let i = 2; i < number; i++) {
		if (number % i === 0) return false
	}
	return true
}

// обертываем функцию в оболочку прокси объекта
isPrime = new Proxy(
	isPrime,
	//apply() - метод перехвата (также как и get,set из примера выше)
	// - вызывается каждый раз, когда прокси объект вызывается как функция
	{
		apply: (obj, thisArg, args) => {
			console.time('isPrime')
			const result = obj.apply(thisArg, args)
			console.timeEnd('isPrime')
			console.log('@obj = ', obj)
			console.log('@thisArg = ', thisArg)
			console.log('@args = ', args)
			return result
		},
	}
)

isPrime(129, 12)

// ************************************************************************************
console.log(
	'%c map - возврат функций и разложение в одноранговый массив',
	'color:yellow; background:black'
)
data = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
function foo1(id) {
	return 'foo1'
}
function foo2(id) {
	return 'foo2'
}
const p = data.map((el) => [foo1(el._id), foo2(el._id)]).flat()
console.log('Результат: ',p)
