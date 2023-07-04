const mongojs = require("mongojs");
const { ObjectId } = require("mongojs");

const db = mongojs("127.0.0.1:27017/market");
db.on("error", (err) => console.log("Отсутствует связь с MongoDB"));
db.on("connect", () => console.log("Связь с MongoDB установлена"));

// dlv_type(db)
//     .then((_) => {
//         console.log("MongoDb company обновлена");
//         db.close();
//     })
//     .catch((err) => {
//         console.log(err);
//         db.close();
//     });

// function dlv_type(db) {
//     return new Promise((resolve, reject) => {
//         let count = 0;
//         let end = false;

//         const cur = db["company"].find();
//         cur.on("error", (error) => reject(error));
//         cur.on("end", (_) => {
//             end = true;
//             if (!count) resolve();
//         });

//         cur.on("data", (doc) => {
//             ++count;
//             const q = {
//                 _id: ObjectId(doc._id),
//             };
//             let s = {};
//             if (doc?.delivery?.type?.pickup) {
//                 s = {
//                     'delivery.type.pickup':'tm'
//                 }
//             } else {
//                 s = {
//                     'delivery.type.pickup':null
//                 }
//             }

//             db["company"].updateOne(q, { $set: s }, {}, (err, doc) => {
//                 if (err) reject({q,s,err});
//                 if (--count) return;
//                 if (!end) return;
//                 resolve();
//             });
//         });
//     });
// }







// Promise.all([dlv_type(db, false, null), dlv_type(db, true, "tm")])
//     .then((_) => {
//         console.log("MongoDb обновлена");
//         db.close();
//     })
//     .catch((err) => {
//         console.log(err);
//         db.close();
//     });

// function dlv_type(db, old = false, val) {
//     return new Promise((resolve, reject) => {
//         const q = { "delivery.type.pickup": old };
//         let s = {};
//         if (old) {
//             s = { "delivery.type.pickup": val };
//         } else {
//             s = { "delivery.type": { pickup: null } };
//         }
//         db["company"].updateMany(q, { $set: s }, {}, (err, doc) => {
//             console.log(doc)
//             if (err) reject(err);
//             resolve();
//         });
//     });
// }