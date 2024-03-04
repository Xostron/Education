// // преобразовать Hex во Float
// const HexToFloat32 = (hex) => {
// 	const int = parseInt(hex, 16)
// 	if (!int) return 0
// 	const sign = int >>> 31 ? -1 : 1
// 	let exp = ((int >>> 23) & 0xff) - 127
// 	let mantissa = ((int & 0x7fffff) + 0x800000).toString(2)
// 	let float32 = 0
// 	for (i = 0; i < mantissa.length; i += 1) {
// 		float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0
// 		exp--
// 	}
// 	return float32 * sign
// }

// // преобразовать Float в Hex
// function Float32ToHex(float32) {
// 	const getHex = (i) => ('00' + i.toString(16)).slice(-2)
// 	var view = new DataView(new ArrayBuffer(4))
// 	view.setFloat32(0, float32)
// 	return Array.apply(null, { length: 4 })
// 		.map((_, i) => getHex(view.getUint8(i)))
// 		.join('')
// }

// // преобразовать целое число в Hex
// function DecToHex(dec) {
// 	return dec.toString(16)
// }

// // преобразовать Hex в целое число
// function HexToDec(hex) {
// 	return parseInt(hex, 16)
// }

// // =========================================================
// // преобразовать массив[int] во Float
// function ArrIntToFloat32(arr) {
// 	const a = arr[0].toString(16)
// 	const b = arr[1].toString(16)
// 	const int = parseInt(b + a, 16)
// 	if (!int) return 0
// 	const sign = int >>> 31 ? -1 : 1
// 	let exp = ((int >>> 23) & 0xff) - 127
// 	let mantissa = ((int & 0x7fffff) + 0x800000).toString(2)
// 	let float32 = 0
// 	for (i = 0; i < mantissa.length; i += 1) {
// 		float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0
// 		exp--
// 	}
// 	return float32 * sign
// }

// // преобразовать float в массив[int]
// function Float32ToArrInt(float) {
// 	const getHex = (i) => ('00' + i.toString(16)).slice(-2)
// 	const view = new DataView(new ArrayBuffer(4))
// 	view.setFloat32(0, float)
// 	const arrHex = Array(4)
// 		.fill(null)
// 		.map((_, i) => getHex(view.getUint8(i)))
// 	const a = parseInt(arrHex[0] + arrHex[1], 16)
// 	const b = parseInt(arrHex[2] + arrHex[3], 16)
// 	return [b, a]
// }

// // Преобразование hex -> binary
// function HexTobin(hex) {
// 	return '00000000' + parseInt(hex, 16).toString(2)
// }
// // Преобразование arr[int] -> binary
// function ArrintToBin(arr) {
// 	const a = arr[0].toString(16)
// 	const b = arr[1].toString(16)
// 	return HexTobin(b + a)
// }
// // Преобразование float -> binary
// function FloatToBin(float) {
// 	const arr = Float32ToArrInt(float)
// 	return ArrintToBin(arr)
// }

// // ********************************************************
// // function floatTobin
// // Пример, исходные данные
// // float = 71.9
// // const n = [55656, 17039]
// // const n = [16406, 24127]
// const n = [24127, 16406]

// const float1 = ArrIntToFloat32(n)
// const hex2 = Float32ToArrInt(float1)
// const bin = ArrintToBin(n)
// const bin2 = FloatToBin(float1)

// console.log('== Исходные данные массив[int]==', n)
// console.log('== Преобразуем массив[int] во Float==', float1)
// console.log('== Преобразуем Float в массив[int]==', hex2)
// console.log('== Преобразуем массив[int] в bin ==', bin)
// console.log('== Преобразуем float в bin ==', bin)

// const arr = [
// 	[1, 2],
// 	[10, 2],
// 	[5, 1],
// 	[6, 1], [7,3],[7,8]
// ]
// const flt = []

// for (let i = 0; i < arr.length; i++) {
// 	row = arr[i]
// 	const n = arr.slice(i + 1)
// 	if (!n.length) break
// 	let flag = false
// 	n.forEach((el) => {
// 		if (row[1] === el[1]) {
// 			flt.push(el)
// 			flag = true
// 		}
// 	})
// 	if (flag) flt.push(row)
// }
// console.log('@', flt)

// console.log('Является ли массивом = ',Array.isArray(arr))
// function hasDuplicates(array) {
//     var valuesSoFar = Object.create(null);
//     for (var i = 0; i < array.length; ++i) {
//         var value = array[i];
//         if (value in valuesSoFar) {
// 			valuesSoFar[value]+=1
//             continue
//         }
//         valuesSoFar[value] = 1;
//     }
//     return valuesSoFar
// }

// const array = [1,2,3,4,1,2]
// console.log(hasDuplicates(array))



class DummyClient {
	async connect() {
		return new Promise((resolve) => {
			setTimeout(
				() => {
					console.log('connect')

					resolve()
				},

				2000
			)
		})
	}
	async doSomething() {
		console.log('done something')
	}
}

class ApiWrapper {
	#client
	#connect
	constructor() {
		this.#client = new DummyClient()
		this.#connect = this.#client.connect()
	}

	async doSomething() {
		await this.#connect
		this.#client.doSomething()
	}
}

const run = async () => {
	const api = new ApiWrapper()

	await Promise.all([api.doSomething(), api.doSomething(), api.doSomething(), api.doSomething()])
}

run()
