const mongojs = require("mongojs");

// подключение к БД xos1
const db = mongojs("127.0.0.1:27017/xos1");
// коллекция в нашей БД xos1 - alpha
const alpha = db.collection("alpha");

// события ***************************
db.on("error", (err) => console.log("Отсутствует связь с MongoDB"));
db.on("connect", () => console.log("Связь с MongoDB установлена"));

// создание документа в коллекции  alpha***************************
// db.alpha.save({created: 'just now'})
// db.alpha.save({
//     time:'10:00',
//     delta:'00:30',
//     author:'xostron'
// })

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

/* Задание 1 ***************************
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

/* ***************************
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

