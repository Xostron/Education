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
//     time1:'10:00',
//     delta:'00:30',
//     author:'beta',
//     distance:''
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
инициализируется поиск (курсор cur) по запросу q ($ne - если поле author!== 'xostron') 
cur с попиской на события err - событие ошибка, end - событие завершение операции, 
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

 *Y, *N - это опциональные аргументы котороые мы можем передать в resolve/reject
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

function comLoken() {
    return new Promise((resolve, reject) => {
        const q = { author: { $ne: 'xostron' } }
        const cur = db.alpha.find(q)

        let count = 0
        let end = false

        cur.on('error', err => reject(err))
        cur.on('end', _ => {
            end = true
            if (count) return
            resolve(true)
        })
        cur.on('data', doc => {
            // ++count
            // const agentId = doc.agentId
            // doc.owner = {
            //     type: 'agent',
            //     id: agentId
            // }
            // db.promo.updateOne({ _id: doc._id }, { $set: doc })
            // if (--count) return
            // if (!end) return
            console.log('doc = ', doc)
            resolve(true)
        })
    })
}

// function update(q, un, m) {
//     return new Promise((resolve, reject) => {
//         db.promo.update(q, un, m, (err, docs) => {
//             if (err) return reject(err)
//             resolve(docs)
//         })
//     })
// }

comLoken()
    // .then(_ => {
    //     // const q = { agentId: { $ne: null } }
    //     // const un = { $unset: { agentId: 1 } }
    //     // const m = { multi: true }
    //     // return update(q, un, m)
    // })
    .then(_ => {
        db.close()    
        console.log('БД обновлена')
    })
    .catch(err => console.log(err))