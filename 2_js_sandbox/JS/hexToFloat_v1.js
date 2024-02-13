// преобразовать Hex во Float
const HexToFloat32 = (hex) => {
	const int = parseInt(hex, 16)
	if (!int) return 0
	const sign = int >>> 31 ? -1 : 1
	let exp = ((int >>> 23) & 0xff) - 127
	let mantissa = ((int & 0x7fffff) + 0x800000).toString(2)
	let float32 = 0
	for (i = 0; i < mantissa.length; i += 1) {
		float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0
		exp--
	}
	return float32 * sign
}

// преобразовать Float в Hex
function Float32ToHex(float32) {
	const getHex = (i) => ('00' + i.toString(16)).slice(-2)
	var view = new DataView(new ArrayBuffer(4))
	view.setFloat32(0, float32)
	return Array.apply(null, { length: 4 })
		.map((_, i) => getHex(view.getUint8(i)))
		.join('')
}

// преобразовать целое число в Hex
function DecToHex(dec) {
	return dec.toString(16)
}

// преобразовать Hex в целое число
function HexToDec(hex) {
	return parseInt(hex, 16)
}

// =========================================================
// преобразовать массив[int] во Float
function ArrIntToFloat32(arr) {
	const a = arr[0].toString(16)
	const b = arr[1].toString(16)
	const int = parseInt(b + a, 16)
	if (!int) return 0
	const sign = int >>> 31 ? -1 : 1
	let exp = ((int >>> 23) & 0xff) - 127
	let mantissa = ((int & 0x7fffff) + 0x800000).toString(2)
	let float32 = 0
	for (i = 0; i < mantissa.length; i += 1) {
		float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0
		exp--
	}
	return float32 * sign
}

// преобразовать float в массив[int]
function Float32ToArrInt(float) {
	const getHex = (i) => ('00' + i.toString(16)).slice(-2)
	const view = new DataView(new ArrayBuffer(4))
	view.setFloat32(0, float)
	const arrHex = Array(4)
		.fill(null)
		.map((_, i) => getHex(view.getUint8(i)))
	const a = parseInt(arrHex[0] + arrHex[1], 16)
	const b = parseInt(arrHex[2] + arrHex[3], 16)
	return [b, a]
}

// Преобразование hex -> binary
function HexTobin(hex) {
	return ('00000000' + parseInt(hex, 16).toString(2))
}
// Преобразование arr[int] -> binary
function ArrintToBin(arr){
	const a = arr[0].toString(16)
	const b = arr[1].toString(16)
	return HexTobin(b+a)
}
// Преобразование float -> binary
function FloatToBin(float){
	const arr = Float32ToArrInt(float)
	return ArrintToBin(arr)
}

// ********************************************************
// function floatTobin
// Пример, исходные данные
// float = 71.9
const n = [55656, 17039]

const float1 = ArrIntToFloat32(n)
const hex2 = Float32ToArrInt(float1)
const bin = ArrintToBin(n)
const bin2 = FloatToBin(float1)

console.log('== Исходные данные массив[int]==', n)
console.log('== Преобразуем массив[int] во Float==', float1)
console.log('== Преобразуем Float в массив[int]==', hex2)
console.log('== Преобразуем массив[int] в bin ==',bin)
console.log('== Преобразуем float в bin ==',bin)