require("module-alias/register");
require("dotenv").config();
const webp = require("webp-converter");
const uuid4 = require("uuid4");
const mongojs = require("mongojs");
const { ObjectId } = require("mongojs");
const fs = require("fs");
const path = require("path");
const fsP = require("fs/promises");
const coll = require("@dict/img/collections");
const def = require("@dict/img/index");
const type = require("@dict/img/type");
const { dict } = require("@tool/dict");
const { imgPath, baseDir } = require("@store");

const db = mongojs("127.0.0.1:27017/market");
db.on("error", (err) => console.log("Отсутствует связь с MongoDB"));
db.on("connect", () => console.log("Связь с MongoDB установлена"));

/* 
[1] найти документ под конвертирование
[2] выяснить code (идентификатор компании) документа
[3] Поиск оригинала картинки в папке code (имя картинки - не уникально )
[3.1] [3.1] Определить место поиска картинки, если name==='new' (то коллекция img)
[4] Подготовка к конвертации: 
- если картинка имеет запись в db.img - удалить запись
[5] конвертирование этой картинки и результат сохраняем в public/company/code/img
[5.1] создание записей в коллекции img - конвертированные картинки
[6] удаление оригинала картинки
[7] значение поля картинки исходной коллекции изменяем на 'new'
[8] Перезапись окончена
*/
/*******************START********************/
let p = [];
for (const def of coll) p.push(dbConv(def));

Promise.all(p)
    .then((p) => {
        console.log(`Result array = `, p);
        db.close();
    })
    .catch((error) => {
        console.log("Ошибка перезаписи: ", error);
        db.close();
    });

// ****************Function******************
// [1-8] конвертирование картинок
function dbConv(def) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let end = false;
        let nums = 0;
        const cur = db[def.parent].find();
        cur.on("error", (error) => reject(error));
        cur.on("end", (_) => {
            end = true;
            if (!count) resolve();
        });
        // [1] найти документ под конвертирование
        cur.on("data", (doc) => {
            ++count;
            ++nums;
            // [2] выяснить code (идентификатор компании) документа
            getCode(doc)
                .then((company) => {
                    // [3-7] преобразование картинок документа
                    if (!company) throw new Error("Не определен код компании");
                    // if (!resultTest.includes(company)) resultTest.push(company);
                    let p = [];
                    def.fld.forEach((fld_name, idx) => {
                        if (
                            Object.keys(doc).includes(fld_name) &&
                            doc[fld_name]
                        ) {
                            p.push(fldConv(doc, company, fld_name, def.parent));
                        }
                    });
                    if (!p.length)
                        throw new Error(
                            `Документ не имеет картинок ${company}`
                        );
                    return Promise.all(p);
                })
                .then((o) => {
                    // документ с картинками обработаны
                    // console.log("@1: doc: ", o);
                    if (--count) return;
                    if (!end) return;
                    // [8] перезапись ДБ окончена
                    console.log(`DB ${def.parent} обработана, кол-во документов: ${nums}`)
                    resolve(
                        `DB ${def.parent} обработана, кол-во документов: ${nums}`
                    );
                })
                .catch((err) => {
                    // Ошибка документа: код компании
                    // console.log("@1: Err: ", err);
                    if (--count) return;
                    if (!end) return;
                    // [8] перезапись ДБ окончена
                    console.log(`DB ${def.parent} обработана, кол-во документов: ${nums}`)
                    resolve(
                        `DB ${def.parent} обработана, кол-во документов: ${nums}`
                    );
                });
        });
    });
}

// ***************************************************
// [3-7] обработка поля картинки документа
function fldConv(doc, company, fldName, owner_type) {
    return new Promise((resolve, reject) => {
        // resolve({fldName,idx})
        let _obj = {};
        // [3] Поиск оригинала картинки:
        const n = doc[fldName].split("/");
        const name = n[n.length - 1];
        _obj = {
            owner_id: doc._id,
            owner_type: owner_type,
            company,
            fld_name: fldName,
        };
        // [3.1] Определить место поиска картинки, если name==='new' (то коллекция img)
        let p;
        if (name === "new") {
            const q = {
                "owner.id": doc._id,
                "fld.name": fldName,
            };
            p = Promise.resolve(isFindImg(db, q, company));
        } else {
            const ph = imgPath(company, name);
            _obj.source_old = ph;
            _obj.name_old = name;
            p = Promise.resolve(isImg(ph));
        }
        p.then((img) => {
            // [4] Подготовка к конвертации: удаление записей в БД img
            // console.log("@2 img =", company, fldName, img);
            if (!img) throw new Error(`Не найдена картинка ${doc[fldName]}`);
            return del(_obj);
        })
            .then((_) => {
                // [4][5] конвертирование картинки, сохранение в public/company/code/img, сохранение в БД img
                return save(_obj);
            })
            .then((data) => {
                // [6] перемещение оригинала картинки в папку public/xClone
                // console.log("Сохранение в db.img = ", data);
                // console.log("Перемещаем (в public/clone) это = ", _obj.source_old);
                return relocateFile(_obj);
            })
            .then((_) => {
                // [7] Обновление документа исходной коллекции (Удалаяем поле с картинкой)
                // console.log("Старый файл удален = ");
                return updateDB(_obj);
            })
            .then((u) => {
                // console.log("Документ обновлен");
                resolve(_obj);
            })
            .catch(resolve);
    });
}

// ***************************************************
// [2] выяснить code (идентификатор компании) документа
function getCode(doc) {
    return new Promise((resolve, reject) => {
        const ref = extrId(doc);

        if (!Object.keys(ref).length) {
            // выход из рекурсии (результат code найден)
            return resolve(doc?.code);
        }
        // запуск рекурсии
        dict(db, ref.name, ref.val, ref.fld)
            .then((doc) => {
                return getCode(doc);
            })
            // возвращаемый результат (code) из рекурсии
            .then((code) => resolve(code))
            .catch(reject);
    });
}
function extrId(doc) {
    const refs = [
        {
            fld: "companyId",
            name: "company",
        },
        {
            fld: "promotionId",
            name: "promotion",
        },
        {
            fld: "categoryId",
            name: "category",
        },
        {
            fld: "googlePlayId",
            name: "googlePlay",
        },
        {
            fld: "productId",
            name: "product",
        },
        {
            fld: "propertyId",
            name: "property",
        },
    ];
    if (!doc) return {};
    for (const ref of refs) {
        if (Object.keys(doc).includes(ref.fld)) {
            return {
                fld: "_id",
                name: ref.name,
                val: doc[ref.fld],
            };
        }
    }
    return {};
}
// ***************************************************
// [3] найти оригинал картинки (существует ли она)
function isImg(path, el = "") {
    return new Promise((resolve, reject) => {
        fsP.stat(path)
            .then((stats) => {
                el ? resolve([stats.isFile(), el]) : resolve(stats.isFile());
            })
            .catch((err) => {
                resolve(false);
            });
    });
}
// [3.1] Определить имя картинки (если картинки сохраняются в DB img)
function isFindImg(db, q, company) {
    return new Promise((resolve, reject) => {
        find(db, q)
            .then((imgs) => {
                const p = imgs.map((el) => {
                    const ph = imgPath(company, el.name);
                    return isImg(ph, el);
                });
                return Promise.all(p);
            })
            .then((p) => {
                // новые и с картинкой в папке
                p.sort((a, b) => b[1].update - a[1].update).filter((v) => v[0]);
                // console.log("isFile db.img = ", p[0]);

                _obj.source_old = imgPath(company, p[0][1].name);
                _obj.name_old = p[0][1].name;
                resolve(p[0][0]);
            })
            .catch(reject);
    });
}
// ***************************************************
// [4] Удаление старых записей в БД img
function del(obj) {
    return new Promise((resolve, reject) => {
        const { owner_id, name_old } = obj;
        const q = {
            name: name_old,
            "owner.id": owner_id,
        };
        find(db, q)
            .then((r) => (r.length ? delDB(db, q) : Promise.resolve(true)))
            .then(resolve)
            .catch(reject);
    });
}
// Получение всех картинок
function find(db, q) {
    return new Promise((resolve, reject) => {
        db.img.find(q, (err, docs) => (err ? reject(err) : resolve(docs)));
    });
}
// Удаление записи в БД
function delDB(db, q) {
    return new Promise((resolve, reject) => {
        db.img.remove(q, (err, doc) => (err ? reject(err) : resolve(true)));
    });
}
// ***************************************************
// [5] конвертирование этой картинки и результат сохраняем в public/company/code/img
// [5.1] создание записей в коллекции img - конвертированные картинки
function save(obj) {
    return new Promise((resolve, reject) => {
        const { owner_id, owner_type, company, fld_name, source_old } = obj;
        const nameI = uuid4();
        // console.log("Новое имя картинки = ", nameI);
        const arr = type;
        const p = arr.map((el) => convert(source_old, company, nameI, el));
        Promise.all(p)
            .then((r) => {
                // console.log("@@@ = ", r);
                const p = r.map((el) => {
                    const obj = {
                        name: el.name,
                        fld: {
                            name: fld_name,
                            type: el.type,
                        },
                        owner: {
                            type: owner_type,
                            id: owner_id,
                        },
                    };

                    return saveDB(db, obj);
                });
                return Promise.all(p);
            })
            .then(resolve)
            .catch(reject);
    });
}
// конвертация и сохранение
function convert(filePath, company, name, doc) {
    return new Promise((resolve, reject) => {
        name = `${name}${doc.list[0]}.webp`;
        const option = [];
        const { resize, size, q, mt } = doc?.option;
        if (resize) option.push(`-resize ${resize.height} ${resize.width}`);
        if (size) option.push(`-size ${size}`);
        if (q) option.push(`-q ${q}`);
        if (mt) option.push("-mt");
        // содание директории для конвертированных картинок
        const pathI = path.join(
            baseDir(),
            "public",
            "company",
            company,
            "img"
        );
        
        fsP.mkdir(pathI, { recursive: true })
            .then((_) => {
                // путь к  оригиналу, путь к результату конвертирования, опции
                return webp.cwebp(
                    filePath,
                    imgPath(company,name),
                    option.join(" ")
                );
            })
            .then((result) => {
                resolve({ type: doc.flt[0], name });
            })
            .catch(reject);
    });
}
// Сохранение в БД
function saveDB(db, obj) {
    return new Promise((resolve, reject) => {
        const q = { "owner.id": obj.owner.id, name: obj.name };
        obj.update = new Date();
        db.img.updateOne(q, { $set: obj }, { upsert: true }, (err, doc) =>
            err ? reject(err) : resolve(doc)
        );
    });
}
// ***************************************************
//[6] Удаление файлов
function delFile(path) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fsP.unlink(path).then(resolve).catch(reject);
        } else {
            resolve(false);
        }
    });
}
function relocateFile(obj) {
    return new Promise((resolve, reject) => {
        const {
            owner_id,
            owner_type,
            company,
            fld_name,
            source_old,
            name_old,
        } = obj;
        const newPath = path.join(
            baseDir(),
            "public",
            "company",
            "xClone",
            company,
            "img"
        );
        // создаем папку для резервного копирования оригинальных картинок
        fsP.mkdir(newPath, { recursive: true })
            .then((_) => {
                // копируем картинку в резерв
                return fsP.link(source_old, path.join(newPath, name_old));
            })
            .then((_) => {
                // удаляем оригинал
                return fsP.unlink(source_old);
            })
            .then(resolve)
            .catch(reject);
    });
}
// ***************************************************
//[7] обновление исходного документа (удалить поле с картинкой)
function updateDB(obj) {
    return new Promise((resolve, reject) => {
        const { owner_id, owner_type, company, fld_name, source_old } = obj;
        const s = {
            [fld_name]: "",
        };
        db[owner_type].updateOne(
            { _id: owner_id },
            { $unset: s },
            {},
            (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            }
        );
    });
}

// **********************Test unset mongo*****************************
// product 6433cf07f5b783852cce7f3a img3
// const qwe = {
//     owner_id: ObjectId("6433cf07f5b783852cce7f3a"),
//     owner_type: "product",
//     company: "",
//     fld_name: "img3",
//     source_old: "",
//     name_old: "",
// };
// updateDB(qwe)
//     .then((doc) => {
//         console.log("doc update = ", doc);
//         db.close();
//     })
//     .catch(console.log);

// **********************Test relocate file*****************************
// const qwe = {
//     owner_id: ObjectId("6433cf07f5b783852cce7f3a"),
//     owner_type: "product",
//     company: "grilan",
//     fld_name: "img3",
//     source_old: imgPath('grilan','716373ed-a055-4f02-9413-6a1df9311bdb.jpg'),
//     name_old: "716373ed-a055-4f02-9413-6a1df9311bdb.jpg",
// };
// relocateFile(qwe).then(console.log).catch(console.log);

// test 1 doc
// директории с картинками - области поиска оригиналов
// const pathA = path.join(__dirname, "../..", "public/company");
// let idx = 0;
// console.log(pathA);
// let d;
// let resultTest = [];

// Тест ***********************************************************
/*
screen 62f509bd9ed0b41577a99424 img
product 6433cf07f5b783852cce7f3a img3
*/
// const fldName = "img3";
// const owner_type = "product";
// const _id = "6433cf07f5b783852cce7f3a";
// dict(db, owner_type, _id, "_id")
//     // [1] найти документ под конвертирование
//     .then((doc) => {
//         // [2] выяснить code (идентификатор компании) документа
//         if (!doc) throw new Error("Нет документа");
//         console.log("Source doc = ", doc._id, doc[fldName]);
//         d = doc;
//         return getCode(doc);
//     })
//     .then((company) => {
//         // [3] Поиск оригинала картинки:
//         if (!Object.keys(d).includes(fldName) || d[fldName] === "") {
//             throw new Error("Документ не имеет этого поля картинки");
//         }
//         if (!company) throw new Error("Не определен код компании");
//         const n = d[fldName].split("/");
//         const name = n[n.length - 1];
//         _obj = {
//             owner_id: d._id,
//             owner_type: owner_type,
//             company,
//             fld_name: fldName,
//         };
//         // [3.1] Определить имя картинки (если картинки сохраняются в DB img)
//         if (name === "new") {
//             const q = {
//                 "owner.id": d._id,
//                 "fld.name": fldName,
//             };
//             return isFindImg(db, q, company);
//         }
//         const ph = imgPath(company, name);
//         _obj.source_old = ph;
//         _obj.name_old = name;
//         return isImg(ph);
//     })
//     .then((img) => {
//         // [4] Подготовка к конвертации: удаление записей в БД img
//         console.log("object = ", _obj);
//         if (!img) throw new Error("Не найдена картинка");
//         return del(_obj);
//     })
//     .then((_) => {
//         // [4][5] конвертирование картинки, сохранение в public/company/code/img, сохранение в БД img
//         return save(_obj);
//     })
//     .then((data) => {
//         // [6] удаление оригинала картинки
//         console.log("Сохранение в db.img = ", data);
//         console.log("Удаляем это = ", _obj.source_old);
//         return relocateFile(_obj);
//     })
//     .then((_) => {
//         // [7] значение поля картинки исходной коллекции изменяем на 'new'
//         console.log("Старый файл удален = ");
//         return updateDB(_obj);
//     })
//     .then((u) => {
//         console.log("Документ обновлен ", u);
//         db.close();
//     })
//     .catch((err) => {
//         console.log(err);
//         db.close();
//     });
