function checkRange(begin, end) {
	const cur = +new Date()
		.toLocaleTimeString("ru-RU", { hour: "numeric", minute: "numeric" })
		.split(":")
		.join("")
	begin = begin ? +begin.split(":").join("") : 0
	end = end ? +end.split(":").join("") : 0
	// Запрет выключить
	if (begin === end && end === 0) return false
	// Запрет включить
	if (begin === end && end !== 0) return true
	// 1 случай проверки
	if (begin !== 0 && begin > end) {
		// Запрет включить
		if (cur >= begin || cur < end) return true
		// Запрет выключить
		return false
	}
	// 2 случай проверки
	if (begin < end) {
		// Запрет включить
		if (cur >= begin && cur < end) return true
		// Запрет выключить
		return false
	}
	// по-умолчанию Запрет выключить
	return false
}

const a = { begin: "23:59", end: "00:01" }

console.log("Запрет ", checkRange(a.begin, a.end), a)
