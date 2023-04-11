console.log('test xostron3')
const a = {
    name:'xos',
    city:'loken',
    phone:'904410'
}

function match(obj={}, keys=[]){
    let dif = []
    const kObj = Object.keys(obj)
    keys.forEach((key,idx)=>{
        if (!kObj.includes(key)) {
            dif.push(key)
        }
    })
    return dif
}

function match2(obj={}, keys=[]){
    let dif = []
    keys.forEach((key,idx)=>{
        if (!a.hasOwnProperty(key)) {
            dif.push(key)
        }
    })
    return dif
}

console.log(match(a, ['age', 'address', 'name', 'city','email']))

console.log(match2(a,['age', 'address', 'name', 'city','email']))

console.log(this)

let q = [0,3,2,5,7,4,8,1,19,17,12,15,29,21]

console.log(q.sort((a,b)=>{return a-b}))

// IIFE - немедленно вызываемая функция
const w = (function(val){console.log(val)}) ("IIFE функция")
