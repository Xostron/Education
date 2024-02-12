// преобразовать Hex во Float
const HexToFloat32 = (a, b) => {
	a = a.toString(16)
	b = b.toString(16)
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

// преобразовать Float в Hex
const Float32ToHex = (float32) => {
	const getHex = (i) => ('00' + i.toString(16)).slice(-2)
	var view = new DataView(new ArrayBuffer(4))
	view.setFloat32(0, float32)
	return Array.apply(null, { length: 4 })
		.map((_, i) => getHex(view.getUint8(i)))
		.join('')
}

// преобразовать целое число в Hex
const DecToHex = (dec) => {
	return dec.toString(16)
}

// преобразовать Hex в целое число
const HexToDec = (hex) => {
	return parseInt(hex, 16)
}

function HexToBin(hex) {
	return ''
}

function BinToHex(bin) {
	return bin.toString(16)
}

// Пример
const n = 25
const hex = ['41a8', '0000']
const bin = '01000001101010000000000000000000'

const float1 = HexToFloat32(hex[1], hex[0])
const hex1 = Float32ToHex(float1)
const bin_hex = BinToHex(bin)
const dec_hex = DecToHex(n)

console.log('== Исходное число==', n)

console.log('== Преобразованное во Float==', float1)
console.log('== Обратно преобразованное в Hex==', hex1)
console.log('== bin to hex ==', bin_hex)
console.log('== dec to hex ==', dec_hex)

