import { Platform } from 'react-native'
import * as Application from 'expo-application'
import * as Device from 'expo-device'

// адрес сервера API
// const url = 'https://play-api.flet.su/', //Production
// const url = 'http://192.168.1.101:3100/', //Рома
// const url = 'http://192.168.1.103:3100/', //Саша
// const url = 'http://192.168.1.104:3100/', //Юра
const url = 'http://192.168.1.107:3100/' //Аскар
// const url = 'http://192.168.1.110:3100/', //Сергей
// код маркета
const market = '2023-3'
// url для изображений
const img = `${url}market/${market}/img/`
// добавление url для изображений
function urlImg(file) {
	if (!file) return '#'
	if (!Array.isArray(file)) {
		if (file.toLowerCase().startsWith('http')) return file
		return img + file
	}
	return file.map(el => {
		if (!el) return '#'
		if (el.toLowerCase().startsWith('http')) return el
		return img + el
	})
}
// версия приложения
const version = Application.nativeApplicationVersion + ' (' + Application.nativeBuildVersion + ')'
// id приложения + платформа
const idApp = Application.applicationId + '.' + Platform.OS
// имя устройства
const device = Device.brand +' '+ Device.modelName
// демо версия
const demo = false

export {url, market, urlImg, version, idApp, device, demo}
