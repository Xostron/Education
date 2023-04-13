
{
    // включение строгого режима
    // "use strict"
// блочная область видимости {}
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

}

    let q = 10
    let w = 5
    console.log('q,w = ',q,w)

    function qw(q,w){
        console.log('arg = ',arguments)
        console.log('this = ',this)
        return q+w
    }

   new qw(q,w)
//    qw(1,1)
// ***************************ЗАМЫКАНИЯ***************************
let outerVal = "samurai"

function outerF(x){
    let innerVal = x
    function innerF(y){
        return innerVal +=y
    }
const later = innerF
    return later
}

// console.log(outerF())
// console.log(later())
let x = outerF('+x3')
console.log(x('+x5'))
console.log(x('+x15'))
console.log(x('+x25'))
console.log(x('+x35'))
console.log(x('+x45'))