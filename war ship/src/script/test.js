const arr = [1, 2, 3, 4, 5];
console.log("Исходный = ", arr);

// ************************************************************
// удаление из массива: сначала собираем массив индексов удаляемых элементов
// потом удалаяем
const del = [];
arr.forEach((val, idx) => {
    console.log("@val = ", val, idx);
    if (val === 1 || val == 4) {
        // console.log()
        del.push(idx);
    }
});
console.log("result = ", arr);
del.forEach((id) => {
    arr.splice(id, 1);
});
console.log("result = ", arr);
// ************************************************************

// ************************************************************
// сравнение массивов на идентичность
function arraysEqual(arr1, arr2) {
    return (
        arr1.length === arr2.length &&
        arr1.every((value, index) => value === arr2[index])
    );
}
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 4, 5];
console.log("Массивы идентичны =", arraysEqual(arr1, arr2));
// ************************************************************

// ************************************************************
// сравнение массивов по содержимому (элементы массива уникальны)
const a1 = [1, 3, 5, 2, 3];
const a2 = [1, 2, 3, 4, 5];
function arrEqContent(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (const x of arr1) {
        if (!arr2.includes(x)) return false;
    }
    return true;
}
console.log("Массивы равны по содержимому = ", arrEqContent(a1, a2));
// ************************************************************
console.log([10, 1, 11, 30, 3].sort((a, b) => b - a));
// ************************************************************
// toFixed мантиса
const a3 = [1, 1, 2, 2.5, 3, 4, 5, 3.5, 2, 4, 5, 1];
let remainder = 100.0;
arr.forEach((el) => {
    remainder -= el;
});
console.log("Остаток = ", remainder);
// ************************************************************

// ************************************************************
const a4 = [1, 2, 3, 4, 5];
function qwe(arr) {
    const to = []
    for (const i of arr) {
        console.log("@ a4 i =",i);
        if (i > 0) {
            const obj={q:0}
            switch (true) {
                case i === 4:
                    obj.q=i
                    obj.rem={qq:i}
                    to.push(obj)
                    return to
                case i === 3:
                    obj.q=i
                    to.push(obj)
                    console.log('@=',to)
                    break
                default:
                    break;
            }
        }
    }
    return to
}
const t = qwe(a4)
console.log('return = ', t)
// ************************************************************


const { ObjectId } = require('mongojs');
const { conv } = require('@tool/conv');
const detail = require('@tool/detail');

function cur(db, data, page, req) {
    return new Promise((resolve, reject) => {
        const productId = data.value.info[0];
        const rows = data.table.prdWriteoff.list
            .filter((el) => el.list[1] > 0)
            .map((el) => ({ itemsId: el.itemsId, value: el.list[1] }));
        const type = conv('writeoff', data.all?.type, 1);
        const date = data.date.date;
        const make = data.all.make;
        const about = { productId, type, make, date };
        console.log('@ О списании = ', about);
        console.log('@@@ Товары на списание = ', rows);

        if (!rows.length) {
            console.log('Товары на списание на заданы');
            return resolve({});
        }
        findRemainders(db, productId)
            .then((remainders) => {
                // console.log('@remainders + details = ', rd.length, rd);
                // массив заданий на списание
                const tasks = task(rows, remainders);
                console.log('@tasks всего= ', tasks.length);
                // рассчитать (остаток = ремайндер.value - ...consumption - ...writeoff)
                return Promise.all(tasks.map((task) => consumption(db, task, about)));
            })
            .then((r) => {
                console.log('@@@ r =', r);
                resolve(r);
            })
            .catch(reject);
        // resolve();
    });
}

module.exports = cur;

// present
function findRemainders(db, pId) {
    return new Promise((resolve, reject) => {
        let end = false;
        let count = 0;
        const o = [];
        const cur = db.remainder.find({ productId: ObjectId(pId), closed: null });
        cur.on('error', (error) => reject(error));
        cur.on('end', (_) => {
            end = true;
            if (!count) resolve(o);
        });
        cur.on('data', (doc) => {
            ++count;
            const d = { ...doc };
            detail(db, doc._id, 'remainder')
                .then((details) => {
                    d.itemsId = details.map((el) => el.itemId);
                    o.push(d);
                    if (--count) return;
                    if (!end) return;
                    resolve(o);
                })
                .catch(reject);
        });
    });
}
// // сравнение массивов по содержимому (элементы массива уникальны)
function arrEqContent(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (const x of arr1) {
        if (!arr2.includes(String(x))) return false;
    }
    return true;
}
// фильтр: ремайндеры по списываемому товару - результат task - что списать и откуда (ремайндеры)
function task(rows, rd) {
    const tasks = [];
    for (const row of rows) {
        const filtered = [];
        rd.forEach((el, idx) => {
            if (arrEqContent(el.itemsId, row.itemsId)) {
                filtered.push(el);
            }
        });
        const obj = {
            what: row,
            remainders: filtered.sort((a, b) => a.date - b.date),
        };
        tasks.push(obj);
    }
    tasks.forEach((el) => {
        console.log('@ task remainders=', el.remainders);
    });
    return tasks;
}
// найти все документы по параметру
function findall(db, name, val, key) {
    return new Promise((resolve, reject) => {
        if (!val) return resolve(null);
        const q = { [key]: val };
        db[name].find(q, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        });
    });
}
// рассчитать (остаток = ремайндер.value - ...consumption - ...writeoff)
async function consumption(db, task, about) {
    const { productId, type, make, date } = about;
    const value = task.what.value;
    const toWrite = [];
    for (const rmd of task.remainders) {
        // вычисления с текущим ремайндером
        // TODO: учитывать remainder.owner.type при запросе consumption
        const p = [
            rmd.owner.type === 'package'
                ? findall(db, 'consumption', ObjectId(rmd.owner.id), 'owner.id')
                : findall(db, 'consumption', rmd._id, 'owner.id'),
            findall(db, 'writeoff', rmd._id, 'remainderId'),
        ];
        const [cns, wrf] = await Promise.all(p);
        // TODO: вычитаем из ремайндера все значения consumption, writeoff
        // TODO: при вычитании учитываем тип товара make
        let diff = rmd.value;
        cns.forEach((el) => {
            const val = make === 'plc' || make === 'fct' ? el.weight : el.value;
            diff -= val;
        });
        wrf.forEach((el) => {
            diff -= el.value;
        });

        if (diff > 0) {
            const obj = {
                writeoff: {
                    date,
                    value,
                    type,
                    productId: ObjectId(productId),
                    remainderId: rmd._id,
                    closed: new Date(),
                },
                remainder: { closed: new Date() },
            };
            switch (true) {
                case diff > value:
                    obj.remainder = null
                    toWrite.push(obj);
                    return toWrite;

                case diff === value:
                    toWrite.push(obj);
                    return toWrite;

                case diff < value:
                    obj.writeoff.value = diff
                    toWrite.push(obj);
                    break;
                default:
                    break;
            }
        }
    }
    return false;
}

// ******************************************************
// old добавить списание
function addWriteoff(db, obj, arrId) {
    return new Promise((resolve, reject) => {
        db.writeoff.insert(obj, (err, doc) => {
            if (err) reject(err);
            const p = arrId.map((itemId) => {
                const d = {
                    owner: {
                        type: 'writeoff',
                        id: ObjectId(doc._id),
                    },
                    itemId: ObjectId(itemId),
                };
                return addDetail(db, d);
            });
            Promise.all(p)
                .then((r) => {
                    resolve(r);
                })
                .catch(reject);
        });
    });
}

function addDetail(db, obj) {
    return new Promise((resolve, reject) => {
        db.detail.insert(obj, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        });
    });
}
// const p = rows.map((row) => {
//     const obj = {
//         date,
//         value: row.list[1],
//         type,
//         productId: ObjectId(productId),
//     };
//     return addWriteoff(db, obj, row.itemsId);
// });

// Promise.all(p)
//     .then((r) => {
//         resolve(r);
//     })
//     .catch(reject);

/* once добавить остатки с деталями*/
function createRemainder(db, pId, items) {
    return new Promise((resolve, reject) => {
        const a = [];
        for (let index = 0; index < 10; index++) {
            const t = new Date();
            t.setMonth(index);
            const element = {
                productId: ObjectId(pId),
                closed:
                    index === 0 || index === 3 || index === 6 || index === 9 ? new Date() : null,
                value: (index + 3) * 3,
                date: t,
                owner: {
                    type: null,
                    id: null,
                },
            };
            a.push(element);
        }
        db.remainder.insertMany(a, (err, docs) => {
            if (err) reject(err);
            console.log('@ create remainder = ', docs);
            const p = [];

            docs.forEach((doc, idx) => {
                let arrItems = [];
                switch (true) {
                    case idx >= 0 && idx < 3:
                        arrItems = items[0];
                        break;
                    case idx >= 3 && idx < 5:
                        arrItems = items[1];
                        break;
                    case idx >= 5 && idx < 7:
                        arrItems = items[2];
                        break;
                    case idx >= 7 && idx < 10:
                        arrItems = items[3];
                        break;
                    default:
                        break;
                }
                const d1 = {
                    owner: {
                        type: 'remainder',
                        id: ObjectId(doc._id),
                    },
                    itemId: ObjectId(arrItems[0]),
                };
                const d2 = {
                    owner: {
                        type: 'remainder',
                        id: ObjectId(doc._id),
                    },
                    itemId: ObjectId(arrItems[1]),
                };

                p.push(createDetail(db, d1), createDetail(db, d2));
            });

            Promise.all(p)
                .then((arr) => {
                    console.log('@@@ details = ', arr);
                    resolve(arr);
                })
                .catch(reject);
        });
    });
}
function createDetail(db, obj) {
    return new Promise((resolve, reject) => {
        db.detail.insert(obj, (err, docs) => {
            if (err) reject(err);
            console.log('@ create detail = ', docs);
            resolve(docs);
        });
    });
}
// const items = data.table.prdWriteoff.list.map((el) => {
//     return el.itemsId;
// });
// console.log('@@ detail items = ', items);

// // создать remainder
// createRemainder(db, productId, items).then(resolve).catch(reject);
function dict(db, name, val, key = 'code') {
    return new Promise((resolve, reject) => {
        if (!val) return resolve(null);
        if (key === '_id') val = ObjectId(val);
        const q = {};
        q[key] = val;
        db[name].findOne(q, (error, doc) => {
            if (error) reject(error);
            resolve(doc);
        });
    });
}
