function createZip() {
	return new Promise((resolve, reject) => {
		// определяем файлы json в папке /dump
		const source = path.resolve(baseSrc, 'dump')
		const files = fs.readdirSync(source).filter((item) => item.includes('.json'))
		// создаем в папке dump файл архива
		const zip = path.join(baseSrc, 'public', 'dump', `dump.zip`)
		const output = fs.createWriteStream(zip)
		const archive = archiver('zip', {
			zlib: { level: 9 }, // Sets the compression level.
		})
		// подписка на события
		output.on('close', function () {
			// console.log('Сборка архива окончена. ', archive.pointer() + ' total bytes')
			resolve({})
		})

		output.on('end', function () {
			// console.log('Data has been drained')
		})

		archive.on('warning', function (err) {
			if (err.code === 'ENOENT') {
				// log warning
				console.log('Warning: ', err)
			} else {
				// throw error
				reject(err)
			}
		})
		// открываем архивный файл для записи
		archive.pipe(output)
		// добавляем файлы в архив
		files.forEach((file) => {
			const f = path.join(baseSrc, 'dump', file)
			archive.append(fs.createReadStream(f), { name: file })
		})
		// закрываем архивный файл
		archive.finalize()
	})
}


function cur(db, data, page, req) {
	return new Promise((resolve, reject) => {
		saveOld()
			.then((_) => {
				console.log("Экспортируем БД")
				exportDump()
				resolve({})
			})
			.catch((err) => {
				console.log(err)
				reject(err)
			})
	})
}