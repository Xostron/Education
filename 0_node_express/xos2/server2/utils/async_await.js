const mongojs = require("mongojs");
const { ObjectId } = require("mongojs");
const fs = require("fs");
const path = require("path");
const fsP = require("fs/promises");
const axios = require("axios");
// подключение к БД xostron
const db = mongojs("127.0.0.1:27017/market");

//прослушиватели событий ***************************
db.on("error", (err) => console.log("Отсутствует связь с MongoDB"));
db.on("connect", () => console.log("Связь с MongoDB установлена"));

// Пример цепочки then
// dict(db, "img", ObjectId("620e13632cba2a1118f97048"), "owner.id")
//     .then((doc) => {
//         console.log(doc);
//         return dict(db, doc.owner.type, ObjectId(doc.owner.id), "_id");
//     })
//     .then((pr) => {
//         console.log(pr);
//         db.close();
//     })
//     .catch((err) => {
//         console.log();
//         db.close();
//     });

// Пример на async
async function start() {
    try {
        const img = await dict(
            db,
            "img",
            ObjectId("620e13632cba2a1118f97048"),
            "owner.id"
        );
        console.log(img);
        console.log('Ждем 5 секунд...')
        await delay(5000)
        const pr = await dict(db, img.owner.type, ObjectId(img.owner.id), "_id");
        console.log(pr);
        db.close();
    } catch (error) {
        console.log(error)
        db.close();
    }
}
start();
// **************************************************
function dict(db, code, val, key) {
    return new Promise((resolve, reject) => {
        const q = { [key]: val };
        db[code].findOne(q, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        });
    });
}
function delay(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('5s пройдено')
            resolve()
        },ms)
    })
}
// **************************************************

// let config = {
//     method: "get",
//     url: "https://api.nationalize.io/",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     params: { name: 'kratos' },
//     // data: JSON.stringify([data.all["geo.fullName"]]),
// };

// axios
//     .request(config)
//     .then((res) => {
//         console.log(res.data);
//     })
//     .catch(console.log);
