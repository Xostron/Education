const mongojs = require("mongojs");
const { ObjectId } = require("mongojs");
const fs = require("fs");
const path = require("path");
const fsP = require("fs/promises");

// подключение к БД xostron
const db = mongojs("127.0.0.1:27017/xostron");

//прослушиватели событий ***************************
db.on("error", (err) => console.log("Отсутствует связь с MongoDB"));
db.on("connect", () => console.log("Связь с MongoDB установлена"));

// collections
const data = [
    {
        parent: "db1",
        collection: "old_img",
        fld: ["img", "img1"],
    },
    {
        parent: "db2",
        collection: "db2",
        fld: ["img"],
    },
    {
        parent: "db3",
        collection: "db3",
        fld: ["img"],
    },
    {
        parent: "db4",
        collection: "db4",
        fld: ["img"],
    },
    {
        parent: "db5",
        collection: "db5",
        fld: ["img"],
    },
];

// директории с картинками - области поиска оригиналов
const pathImg = path.join(__dirname, "..", "public/company");
let dirs = [];

// [0] Определить область поиска картинок
// [1] найти документ под конвертирование
// [2] Поиск оригинала картинки - отфильтровать по code
// [3] выяснить code (идентификатор компании)
// [4] конвертирование этой картинки и результат сохраняем в public/company/code/img
// [5] удаление оригинала картинки
// [6] если оригинал картинки сохраняется в коллекцию img - удалить эту запись
// [7] создание записей в img - конвертированные картинки
// [8] значение поля картинки исходной коллекции изменяем на 'new'
// [9] Перезапись окончена

fsP.readdir(pathImg, { withFileTypes: true })
    .then((dirent) => {
        // [0]
        dirs = dirent.filter((dir) => dir.isDirectory());
        console.log("[0] область поиска картинок dirs = ", dirs);
    })
    .then((_) => {
        return findImage(dirs, "500.png");
    })
    .then((fImgs) => {
        console.log("[2] Поиск оригинала картинки  imgs = ", fImgs);
    })
    .catch((error) => {
        console.log("Ошибка перезаписи: ", error);
        db.close();
    });

// start
let idx = 0;
// Получить только папки из public/company
// fsP.readdir(pathImg, { withFileTypes: true })
//     .then((dirent) => {
//         // [0]
//         dirs = dirent.filter((dir) => dir.isDirectory());
//         console.log("[0] область поиска картинок dirs = ", dirs);
//     })
//     .then((_) => {
//         // [1]-[7]
//         let p = [];
//         for (const def of data) p.push(dbConv(def));
//         return Promise.all(p);
//     })
//     .then((p) => {
//         // [8]
//         console.log(`[8] Перезапись окончена `, data.length + " = " + p.length);
//         db.close();
//     })
//     .catch((error) => {
//         console.log("Ошибка перезаписи: ", error);
//         db.close();
//     });

// *****перебираем документы в коллекциях и перезаписываем в коллекцию img********
function dbConv(def) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let end = false;
        const cur = db[def.parent].find();
        cur.on("error", (error) => reject(error));
        cur.on("end", (_) => {
            end = true;
            if (!count) resolve();
        });
        // [1] найти документ под конвертирование
        // [2] Поиск оригинала картинки
        // [3] выяснить code (идентификатор компании)
        // [4] конвертирование этой картинки и результат сохраняем в public/company/code/img
        // [5] удаление оригинала картинки
        // [6] если оригинал картинки сохраняется в коллекцию img - удалить эту запись
        // [7] создание записей в img - конвертированные картинки
        // [8] значение поля картинки исходной коллекции изменяем на 'new'
        // [9] Перезапись окончена
        cur.on("data", (doc) => {
            ++count;
            // [1]
            def.fld.forEach((fld, idx) => {
                if (
                    Object.keys(doc).includes(fld) &&
                    !["", "new"].includes(doc[fld])
                ) {
                    // [2]
                    findImage(dirs, doc[fld])
                        .then((fImgs) => {
                            // console.log('[2] imgs =', fImgs)
                            if (idx + 1 === def.fld.length) --count;
                            if (end && !count) resolve();
                        })
                        .catch(reject);
                    // console.log('pathTo = ', pathTo)

                    // const s = {
                    //     "owner.id": doc._id,
                    //     "owner.type": def.parent,
                    //     "fld.name": fld,
                    //     name: doc[fld],
                    // };
                    // db["img"].updateOne(
                    //     { "owner.id": doc._id, "fld.name": fld },
                    //     { $set: s },
                    //     { upsert: true },
                    //     (err, doc) => {
                    //         if (err) reject(err);
                    //         if (idx + 1 === def.fld.length) --count;
                    //         if (end && !count) resolve();
                    //     }
                    // );
                } else {
                    if (idx + 1 === def.fld.length) --count;
                    if (end && !count) resolve();
                }
            });
        });
    });
}
// ***************************************************
// найти оригинал картинки
function findImage(dirs, nameImg) {
    return new Promise((resolve, reject) => {
        let p = [];
        dirs.forEach((dir) =>
            p.push(fsStat(path.join(pathImg, dir.name, nameImg), dir.name))
        );
        Promise.all(p)
            .then((f) => {
                const res = f.filter((val) => val);
                resolve(res);
            })
            .catch(reject);
    });
}
function fsStat(path, dir) {
    return new Promise((resolve, reject) => {
        fsP.stat(path)
            .then((stats) => {
                resolve({ stats, dir });
            })
            .catch((err) => {
                resolve();
            });
    });
}
// коллекции в нашей БД xostron
// const img = db.collection("img");
// const db1 = db.collection("db1");
// const db2 = db.collection("db2");
// const db3 = db.collection("db3");
// const db4 = db.collection("db4");
// const db5 = db.collection("db5");
// let idx = 0;
// for (const def of data) {
//     dbConv(def)
//         .then((_) => {
//             ++idx;
//             console.log(`Rewrite ${def.parent} is done`);
//             if (idx === data.length) {
//                 console.log("Finish");
//                 db.close();
//             }
//         })
//         .catch((err) => {
//             console.log("Error rewrite", err);
//             db.close();
//         });
// }
// *************Сохранение картинок**************************************
// saveImg(db, req, value, data, def[code])
// const saveImg = require('../tool/img/save');
// ***************************************************
// dict(db,'old_img','646b656194c18b4edc03b8e4','owner.id').then(console.log).catch(err=>console.log('ERRROR: ',err))
// найти документы в коллекции
function dict(db, name, val, key = "code") {
    return new Promise((resolve, reject) => {
        if (!val) return resolve(null);
        if (["_id", "owner.id"].includes(key)) val = ObjectId(val);
        const q = {};
        q[key] = val;
        db[name].find(q, (error, doc) => {
            if (error) reject(error);
            resolve(doc);
        });
    });
}
// ***************************************************

// // **********Для создания db1-5 и 1000док в каждом (1раз)****************
function dbCreate(db) {
    return new Promise((resolve, reject) => {
        for (const def of data) {
            for (const key in t) {
                db[def.parent].insertOne({ img: `${key}.png` }, (err, doc) => {
                    if (err) reject(err);
                    resolve(doc);
                });
            }
        }
    });
}
// // start
// const t = new Array(1000).fill(0);
// dbCreate(db)
//     .then((doc) => {
//         console.log("save ", doc);
//     })
//     .catch((err) => {
//         console.log("error = " + err);
//         db.close();
//     });

// db.alpha.update(
//   {companyId:ObjectId('624c06332591b720c09842d3')},
//   {
//     $set: { companyId:ObjectId('624c06332591b720c09842d3'), max:42, phone:'12' },

//   },
//   { upsert: true },
//   function () {
//     console.log("БД обновлена");
//   }
// );

// find everything***********************************
// db.alpha.find(function (err, docs) {
//     // docs is an array of all the documents in mycollection
//     console.log(docs)
// })

// iterate over all whose level is greater than 90.***
// db.alpha.find({}).forEach(function (err, doc) {
//     if (!doc) {
//         // we visited all docs in the collection
//         return
//     }
//     if (doc.author){
//         console.log('author =',doc)
//     }else{
//         console.log('created = ',doc)
//     }
// })

// находит всех и обновляет***************************
// db.alpha.update({author: 'xostron'}, {$set: {level: 1}}, {multi: true}, function () {
//     // the update is complete
// })

// Находит первый и обновляет его*********************
// let count = 0
// db.alpha.findAndModify({
//     query: { author: 'xostron' },
//     update: { $set: { tag: `maintainer_${count}` } },
//     new: true
// }, function (err, doc, lastErrorObject) {
//     // doc.tag === 'maintainer'
//     count+=1
//     console.log(doc)
// })
// ***************************************************

/* Задание 1 *****************************************
Doc{
_id:642e6bf50ad7820768eb0687
time:"10:00"
delta:"00:30"
author:"xostron"
level:1
}
переименовать поле time на time1, удалить поле level, добавить поле distance:''
update({1},{2},{3})
{1} - поисковый фильтр 
{2} - что будет удалять, обновляться, переименовываться
{3} - доп параметр multi - для всех
function() - вызывается когда обновление выполнено
*/
// db.alpha.update(
//   {},
//   {
//     $set: { distance: "" },
//     $rename: { time: "time1" },
//     $unset: { level: "", created: "" },
//   },
//   { multi: true },
//   function () {
//     console.log("БД обновлена");
//   }
// );

/* **************************************************
найти и удалить документы которые не соответствуют формату Doc из задания 1
remove({1},{2}) 
{1} - поисковый фильтр
{2} - опции
*/
// db.alpha.find({}).forEach((err, doc) => {
//   if (!doc) return;
//   const keys = Object.keys(doc);
//   console.log("@@@@@", keys);
// //   если док не соответсвует, удаляем его
//   if (keys.length !== [ '_id', 'delta', 'author', 'distance', 'time1' ].length){
//     db.alpha.remove(
//         {_id:mongojs.ObjectId(`${doc._id}`)},
//         {justOne:true}
//     )
//   }
// });

/* **************************************************
Использование Promise

Имеется функция comLoken, возвращающая Promise, далее экзекъютор промиса выполняется:
инициализируется поиск (курсор cur) по запросу q ($ne - если поле author!== 'xostron'). 
cur с подпиской на события err - ошибка, end - событие завершение операции, 
data - событие вызывается при каждом нахождении документа.

в данных обработчиках событий выполняется работа с найденный документом
 (например нашелся документ, и по нему мы можем сделать чтонибудь еще) 
 и обязательно вызываем функцию resolve 
 (для того чтобы сказать об успешности операции) или reject (об ошибке). 
 resolve,reject - принимает в себя аргумент(что угодно *)

 Как происходит вызов функции comLoken:

 comLoken возвращает промис, для обработки промиса, навешиваются обработчики then()
 -успешное выполнение (resolve), catch - ошибка (reject) - Это внешний код, 
 он вызывается автоматически в зависимости от того как логика отработала в экзекъюторе 
 промиса c вызовом resolve(*Y) или reject(*N).

 *Y, *N - это опциональные аргументы которые мы можем передать в resolve/reject
 когда внешний код then/catch ловят resolve/reject - эти аргументы передаются к ним
 
 then((*Y)=>{})
 catch((*N)=>{})

немного о цепочке промисов

.then((*Y)=>{
    console.log(*Y)
    return X
})
.then((X)=>{

})
если then() возвращает что-то, оно автоматически является промисом, и обрабатывается 
также через then (следующий по очереди), так образуется цепочка промисов.
*/
//****************************************************************************** */
// function comLoken() {
//     return new Promise((resolve, reject) => {
//         const q = { author: { $ne: 'xostron' } }
//         const cur = db.alpha.find(q)

//         let count = 0
//         let end = false

//         cur.on('error', err => reject(err))
//         cur.on('end', _ => {
//             end = true
//             if (count) return
//             resolve(true)
//         })
//         cur.on('data', doc => {
//             // ++count
//             // const agentId = doc.agentId
//             // doc.owner = {
//             //     type: 'agent',
//             //     id: agentId
//             // }
//             // db.promo.updateOne({ _id: doc._id }, { $set: doc })
//             // if (--count) return
//             // if (!end) return
//             console.log('doc = ', doc)
//             resolve(true)
//         })
//     })
// }

// // function update(q, un, m) {
// //     return new Promise((resolve, reject) => {
// //         db.promo.update(q, un, m, (err, docs) => {
// //             if (err) return reject(err)
// //             resolve(docs)
// //         })
// //     })
// // }

// comLoken()
//     // .then(_ => {
//     //     // const q = { agentId: { $ne: null } }
//     //     // const un = { $unset: { agentId: 1 } }
//     //     // const m = { multi: true }
//     //     // return update(q, un, m)
//     // })
//     .then(_ => {
//         db.close()
//         console.log('БД обновлена')
//     })
//     .catch(err => console.log(err))
