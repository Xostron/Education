const path = require('path');

const data = {
	baseDir: path.join(__dirname, '..'),
	linkhub: [
		// {id, url}
	],
};

// Базовая директрория проекта
const baseDir = data.baseDir;

// Путь к файлам на основе наименования компании и названия и типа
function filePath(company, file = '', type) {
	if (type)
		return path.join(
			data.baseDir,
			'public',
			'company',
			company,
			type,
			file
		);
	return path.join(data.baseDir, 'public', 'company', company, file);
}

// Получение пути к изображению по компании и наименованию
function imgPath(company, img = '') {
	return path.join(data.baseDir, 'public', 'market', company, 'img', img);
}

// Путь к шаблонам компании для формирования PDF из PUG
// Без указания компании путь будет к папке с базовыми шаблонами
function pugPdf(company) {
	if (company)
		return path.join(data.baseDir, 'views', 'pdf', 'company', company);
	return path.join(data.baseDir, 'views', 'pdf', 'base');
}
data.linkhub = process.env?.SMSC ? JSON.parse(process.env?.SMSC) : [];
// Получение массива адресов сервисов
function getSMS() {
	const arr = data.linkhub;
	if (arr.length === 1) return arr[0];
	if (arr.length === 2) {
		arr.reverse();
		return arr[0];
	}
	// добавляем элемент в конец
	arr.push(arr.shift());
	return arr[0];
}

module.exports = {
	data,
	baseDir,
	filePath,
	imgPath,
	pugPdf,
	getSMS,
};
