// скачивание по ссылке файла из public
const click = (obj, ms, story, data, d, action) => {
	const code = data.curData.values.fld.code
	const href = dataUrl.url + `/file/temp/category_${code}.xlsx`
	const link = document.createElement('a')
	link.href = href
	link.download = '*.xlsx'
	link.click()
	// для скачивания картинок (без открытия предпросмотра)
	// fetch(href)
	// 	.then((res) => res.blob())
	// 	.then((blob) => {
	// 		const link = document.createElement('a')
	// 		link.href = URL.createObjectURL(blob)

	// 		link.download = 'dump_play.zip'
	// 		link.click()
	// 	})
	return status.action
}