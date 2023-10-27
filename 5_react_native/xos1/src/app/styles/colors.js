const light = {
	"primary": "rgb(125, 35, 229)",
	"onPrimary": "rgb(255, 255, 255)",
	"primaryContainer": "rgb(237, 220, 255)",
	"onPrimaryContainer": "rgb(41, 0, 85)",
	"secondary": "rgb(0, 104, 116)",
	"onSecondary": "rgb(255, 255, 255)",
	"secondaryContainer": "rgb(151, 240, 255)",
	"onSecondaryContainer": "rgb(0, 31, 36)",
	"tertiary": "rgb(0, 104, 116)",
	"onTertiary": "rgb(255, 255, 255)",
	"tertiaryContainer": "rgb(151, 240, 255)",
	"onTertiaryContainer": "rgb(0, 31, 36)",
	"error": "rgb(186, 26, 26)",
	"onError": "rgb(255, 255, 255)",
	"errorContainer": "rgb(255, 218, 214)",
	"onErrorContainer": "rgb(65, 0, 2)",
	"background": "rgb(255, 251, 255)",
	"onBackground": "rgb(29, 27, 30)",
	"surface": "rgb(255, 251, 255)",
	"onSurface": "rgb(29, 27, 30)",
	"surfaceVariant": "rgb(232, 224, 235)",
	"onSurfaceVariant": "rgb(74, 69, 78)",
	"outline": "rgb(123, 117, 127)",
	"outlineVariant": "rgb(204, 196, 207)",
	"shadow": "rgb(0, 0, 0)",
	"scrim": "rgb(0, 0, 0)",
	"inverseSurface": "rgb(50, 47, 51)",
	"inverseOnSurface": "rgb(245, 239, 244)",
	"inversePrimary": "rgb(215, 186, 255)",
	"elevation": {
		"level0": "transparent",
		"level1": "rgb(249, 240, 254)",
		"level2": "rgb(245, 234, 253)",
		"level2": "rgb(255, 255, 255)",
		"level3": "rgb(241, 227, 252)",
		"level4": "rgb(239, 225, 252)",
		"level5": "rgb(237, 221, 251)"
	},
	"surfaceDisabled": "rgba(29, 27, 30, 0.12)",
	"onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
	"backdrop": "rgba(51, 47, 55, 0.4)"
}
const dark = {
	"primary": "rgb(215, 186, 255)",
	"onPrimary": "rgb(68, 0, 135)",
	"primaryContainer": "rgb(97, 0, 189)",
	"onPrimaryContainer": "rgb(237, 220, 255)",
	"secondary": "rgb(206, 194, 218)",
	"onSecondary": "rgb(53, 45, 64)",
	"secondaryContainer": "rgb(76, 67, 87)",
	"onSecondaryContainer": "rgb(235, 221, 247)",
	"tertiary": "rgb(242, 183, 194)",
	"onTertiary": "rgb(75, 37, 46)",
	"tertiaryContainer": "rgb(101, 59, 68)",
	"onTertiaryContainer": "rgb(255, 217, 223)",
	"error": "rgb(255, 180, 171)",
	"onError": "rgb(105, 0, 5)",
	"errorContainer": "rgb(147, 0, 10)",
	"onErrorContainer": "rgb(255, 180, 171)",
	"background": "rgb(29, 27, 30)",
	"onBackground": "rgb(231, 225, 230)",
	"surface": "rgb(29, 27, 30)",
	"onSurface": "rgb(231, 225, 230)",
	"surfaceVariant": "rgb(74, 69, 78)",
	"onSurfaceVariant": "rgb(204, 196, 207)",
	"outline": "rgb(149, 142, 153)",
	"outlineVariant": "rgb(74, 69, 78)",
	"shadow": "rgb(0, 0, 0)",
	"scrim": "rgb(0, 0, 0)",
	"inverseSurface": "rgb(231, 225, 230)",
	"inverseOnSurface": "rgb(50, 47, 51)",
	"inversePrimary": "rgb(125, 35, 229)",
	"elevation": {
		"level0": "transparent",
		"level1": "rgb(38, 35, 41)",
		"level2": "rgb(44, 40, 48)",
		"level3": "rgb(50, 45, 55)",
		"level4": "rgb(51, 46, 57)",
		"level5": "rgb(55, 49, 62)"
	},
	"surfaceDisabled": "rgba(217, 217, 217, 0.12)",
	"onSurfaceDisabled": "rgba(217, 217, 217, 0.38)",
	"backdrop": "rgba(51, 47, 55, 0.4)"
}

// Возвращает функцию, которая принемает цвет в формате HEX
// и возвращает цвет (черный или белый)
// в зависимости от яркости принемаемого цвета
function labelColor() {
	const obj = {}
	return c => {
		if (obj[c]) return obj[c]
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c)
		if (!result) result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(c)
		if (!result) obj[c] = '#000000'
		else {
			let count = 0
			result.reduce((i, el) => count += parseInt(el, 16) > 170 ? 1 : 0, count)
			obj[c] = count > 1 ? '#000000' : '#ffffff'
		}
		return obj[c]
	}
}

const fn = labelColor()

export { light, dark, fn, labelColor }
