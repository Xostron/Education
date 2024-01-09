/**
 * Выборки документов из коллекции
 * @param {Object} db БД
 * @param {String} code Код колекции
 * @param {Object} q Параметры Фильтрация
 * @returns
 */
function find(db, code, q, sort) {
	return new Promise((resolve, reject) => {
		if (sort) return db[code].find(q).sort(sort, (err, docs) => (err ? reject(err) : resolve(docs)))

		db[code].find(q, (err, docs) => (err ? reject(err) : resolve(docs)))
	})
}

/**
 * Поиск одиночного документа
 * @param {Object} db БД
 * @param {String} name Коллекция
 * @param {Object} q Параметры поиска
 * @param {Object} s Параметры Сортировки
 * @returns
 */
function findOne(db, name, q, s) {
	return new Promise((resolve, reject) => {
		if (!s) return db[name].findOne(q, (err, doc) => (err ? reject(err) : resolve(doc)))

		return db[name]
			.findOne(q)
			.sort(s)
			.limit(1, (err, doc) => (err ? reject(err) : resolve(doc.at(0))))
	})
}

/**
 * Вставки данных в коллекцию
 * @param {Object} db БД
 * @param {String} name Наименование коллекции
 * @param {Object|Array} data Данные для вставки
 * @returns {Object} Результат выполнения
 */
function insert(db, name, data) {
	return new Promise((resolve, reject) => {
		db[name].insert(data, (err, doc) => {
			if (err) return reject(err)
			resolve(doc)
		})
	})
}

/**
 * Удаление документов в коллекции
 * @param {Object} db БД
 * @param {String} name Наименование коллекции
 * @param {Object} query Параметры выборки
 * @returns
 */
function remove(db, name, query) {
	return new Promise((resolve, reject) => {
		db[name].remove(query, (error, doc) => {
			if (error) return reject(error)
			resolve(doc)
		})
	})
}

/**
 * Частичное обновление документа
 * @param {Object} db БД
 * @param {String} name Наименование коллекции
 * @param {Object} query Параметры выборки
 * @param {Object} obj Данные для обновления
 * @param {Object} opt Доп опции Опции
 * @returns
 */
function update(db, name, query, obj = {}, opt = {}) {
	return new Promise((resolve, reject) => {
		db[name].update(query, obj, opt, (error, doc) => {
			if (error) return reject(error)
			resolve(doc)
		})
	})
}

/**
 * Проверка на уникальность поля
 * @param {Object} db БД
 * @param {String} name Наименование коллекции
 * @param {Object} q Параметры выборки
 * @param {ObjectId} _id ссылка на документ
 * @returns
 */
function unique(db, name, q, _id) {
	return new Promise((resolve, reject) => {
		findOne(db, name, q)
			.then((doc) => {
				if (!doc) return resolve(true)
				if (doc._id.toString() === _id) return resolve(true)
				resolve(false)
			})
			.catch(reject)
	})
}

/**
 * Поиск курсором
 * @param {Object} db БД
 * @param {String} name Наименование коллекции
 * @param {Object} q Параметры выборки
 * @param {Function} p Promise функция для обработки докумнта в data получает в параметрах итоговый массив и документ
 * @param {Object} s Параметры сортировки
 * @param {Object} l Параметр ограничения кол-ва записей
 */
function cursor(db, name, q = {}, p, s, l) {
	return new Promise((resolve, reject) => {
		const arr = []
		let count = 0
		let end = false
		// const cur = s ? db[name].find(q).sort(s) : db[name].find(q);
		const cur = db[name].find(q)
		if (s) cur.sort(s)
		if (l) cur.limit(l)

		cur.on('error', reject)
		cur.on('end', (_) => {
			end = true
			if (count) return
			resolve(arr)
		})
		cur.on('data', (doc) => {
			++count
			/**
			 * Запускаем переданную функцию
			 * Если есть ответ то он добавляется к итоговому массиву
			 */
			p(doc, arr)
				.then((r) => {
					if (r) arr.push(r)
					if (--count) return
					if (!end) return
					resolve(arr)
				})
				.catch((err) => {
					cur.destroy()
					reject(err)
				})
		})
	})
}
module.exports = { find, findOne, insert, remove, update, unique, cursor }
