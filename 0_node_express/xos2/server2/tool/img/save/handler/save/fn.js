const webp = require("webp-converter");
const def = require("@dict/img");
const type = require("@dict/img/type");
const { imgPath } = require("@store");

// Получение настроек для конвертации
function getConf(code, key) {
    // Получаем насйтройки по коду и ключу
    let conf = def.find((el) => {
        return el.flt.includes(code) && el.list?.includes(key);
    });
    //Нет в списке, вернем Все типы
    if (!conf) return type;

    // Только выбранные типы
    if (conf.yes && conf.yes.length)
        return type.filter((el) =>
            el.flt.some((s) => (conf?.yes ? conf?.yes.includes(s) : false))
        );
    // За исключением выбранных
    if (conf.no && conf.no.length)
        return type.filter((el) =>
            el.flt.some((s) => (conf?.no ? !conf?.no.includes(s) : true))
        );

    // Сохраняем как есть без конвертации
    return null;
}

// Конвертация согласно параметрам
function convert(file, company, name, doc) {
    return new Promise((resolve, reject) => {
        name = `${name}${doc.list[0]}.webp`;
        const option = [];
        const { resize, size, q, mt } = doc?.option;
        
        if (resize) option.push(`-resize ${resize.height} ${resize.width}`);
        if (size) option.push(`-size ${size}`);
        if (q) option.push(`-q ${q}`);
        if (mt) option.push("-mt");
        console.log("@@@Webp option =", option.join(" "));
        webp.cwebp(file.tempFilePath, imgPath(company, name), option.join(" "))
            .then((r) => {
                resolve({ type: doc.flt[0], name });
            })
            .catch(reject);
    });
}

// Сохранение в БД
function saveDB(db, obj) {
    return new Promise((resolve, reject) => {
        obj.update = new Date();
        db.img.insert(obj, (err, doc) => (err ? reject(err) : resolve(doc)));
    });
}
module.exports = { convert, getConf, saveDB };
