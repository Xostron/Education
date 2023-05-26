const del = require("../../del");
const save = require("./save");

function handler(db, info, obj) {
    return new Promise((resolve, reject) => {
        // console.log('Obj = ', obj)
        // Удаление старых изображений
        if (obj?.value === "") {
            return resolve(del(db, info.company.code, obj));
        }
        if (obj?.value === "new") {
            if (!obj.img) return reject("Нет файла ", key);
            // Удаление старых и сохранение новых
            del(db, info.company.code, obj)
                .then((_) => save(db, obj, info))
                .then(resolve)
                .catch(reject);
            return;
        }
        if (!obj.value || !obj.img)
            return reject("Нет изображения для сохранения c ключом: ", key);
        // Нет критических ошибок и удовлетворяющих условиям операций
        resolve(true);
    });
}

module.exports = handler;
