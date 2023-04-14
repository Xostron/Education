
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
// 1 - закрытые переменные
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

// 2 - контекст выполнения функции - стек вызовов 
/*
JS однопоточный, в самом начале в стеке размещается глобальный контекст document. 
При вызове функции интерпретатор js прерывает выполнение глобального кода и 
переходит к выполнению функции. Для этого создается новый контекст выполнения
функции, который размещается на вершине стека. стек работает по принципу FIFO-первый зашел
первый вышел
*/
function emperor(x){
    primarch(x+' legion')
}
function primarch(x){
    console.log(x)
}

emperor(12)
// 3 - функция конструктор
function legion(){
    let name='Alpha'
    this.getAlpha=()=>{
        return name
    }
    this.setName = ()=>{
        name+=1
    }
}

let l1 = new legion()
l1.setName()
console.log('@l1 = ',l1.getAlpha())

let l2 = {}
l2.setName = l1.setName
l2.getAlpha= l1.getAlpha

l2.setName()
console.log('@l2 = ',l2.getAlpha())
console.log('@l1 = ',l1.getAlpha())
l1.setName()
console.log('@@l1 = ',l1.getAlpha())
console.log('@@l2 = ',l2.getAlpha())