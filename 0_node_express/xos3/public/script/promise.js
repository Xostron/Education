//Promise
function q1(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Promise ${val} is done`);
        }, 3000);
    });
}

// цепочка промисов - последовательное выполнение
function start() {
    q1(1)
    .then((p)=>{
        console.log(p)
        return q1(2)
    })
    .then((p)=>{
        console.log(p)
        return q1(3)
    })
    .then((p)=>{
        console.log(p)
        return q1(4)
    })
    .then((p)=>{
        console.log(p)
        return('возвращаемое значение из then тоже является промисом')
    })
    .then(console.log)
    .catch(console.log)
}
// start()
// цепочка async-await - последовательное выполнение
async function startAsync(){
    const p1 = await q1(1)
    console.log(p1)
    const p2 = await q1(2)
    console.log(p2)
    const p3 = await q1(3)
    console.log(p3)
    const p4 = await q1(4)
    console.log(p4)
    return('Данные обработаны')
} 
// startAsync().then(console.log)

// параллельое выполнение промисов
function startAll(){
    Promise.all([
        q1(1),
        q1(2),
        q1(3),
        q1(4)
    ])
    .then(([p1,p2,p3,p4])=>{console.log(p1,p2,p3,p4)})
    .catch(console.log)
}
// startAll()

// совмещение: выполним 1промис, 2, затем 3-5 параллельно, и 6
function startCombi(){
q1(1)
.then((p)=>{
    console.log(p)
    return q1(2)
})
.then((p)=>{
    console.log(p)
    return Promise.all([
        q1(3),
        q1(4),
        q1(5),
    ])
})
.then((p)=>{
    console.log(p)
    return q1(6)
})
.then(console.log)
.catch(console.log)
}
// startCombi()



// start - q1 - q2-4
function result(){
    Promise.resolve('start save')
    .then((p)=>{
        console.log(p)
        return save()
    })
    .then((p)=>{console.log(p)})
}
function save(){
    return new Promise((resolve,reject)=>{
        q1(1)
        .then((p)=>{
            console.log(p)
            Promise.all([q1(2),q1(3),q1(4)]).then(resolve).catch(reject)
        })
        .catch(reject)
    })
}

result()