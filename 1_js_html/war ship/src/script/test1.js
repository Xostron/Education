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