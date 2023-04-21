{
    // включение строгого режима
    // "use strict"
    // блочная область видимости {}
    console.log("test xostron3");
    const a = {
        name: "xos",
        city: "loken",
        phone: "904410",
    };

    function match(obj = {}, keys = []) {
        let dif = [];
        const kObj = Object.keys(obj);
        keys.forEach((key, idx) => {
            if (!kObj.includes(key)) {
                dif.push(key);
            }
        });
        return dif;
    }

    function match2(obj = {}, keys = []) {
        let dif = [];
        keys.forEach((key, idx) => {
            if (!a.hasOwnProperty(key)) {
                dif.push(key);
            }
        });
        return dif;
    }

    console.log(match(a, ["age", "address", "name", "city", "email"]));

    console.log(match2(a, ["age", "address", "name", "city", "email"]));

    console.log(this);

    let q = [0, 3, 2, 5, 7, 4, 8, 1, 19, 17, 12, 15, 29, 21];

    console.log(
        q.sort((a, b) => {
            return a - b;
        })
    );

    // IIFE - немедленно вызываемая функция
    const w = (function (val) {
        console.log(val);
    })("IIFE функция");
}

let q = 10;
let w = 5;
console.log("q,w = ", q, w);

function qw(q, w) {
    console.log("arg = ", arguments);
    console.log("this = ", this);
    return q + w;
}

new qw(q, w);
//    qw(1,1)
// ***************************ЗАМЫКАНИЯ***************************
// 1 - закрытые переменные
let outerVal = "samurai";

function outerF(x) {
    let innerVal = x;
    function innerF(y) {
        return (innerVal += y);
    }
    const later = innerF;
    return later;
}

// console.log(outerF())
// console.log(later())
let x = outerF("+x3");
console.log(x("+x5"));
console.log(x("+x15"));
console.log(x("+x25"));
console.log(x("+x35"));
console.log(x("+x45"));

// 2 - контекст выполнения функции - стек вызовов
/*
JS однопоточный, в самом начале в стеке размещается глобальный контекст document. 
При вызове функции интерпретатор js прерывает выполнение глобального кода и 
переходит к выполнению функции. Для этого создается новый контекст выполнения
функции, который размещается на вершине стека. стек работает по принципу FIFO-первый зашел
первый вышел
*/
function emperor(x) {
    primarch(x + " legion");
}
function primarch(x) {
    console.log(x);
}

emperor(12);
// 3 - функция конструктор
function legion() {
    let name = "Alpha";
    this.getAlpha = () => {
        return name;
    };
    this.setName = () => {
        name += 1;
    };
}

let l1 = new legion();
l1.setName();
console.log("@l1 = ", l1.getAlpha());

let l2 = {};
l2.setName = l1.setName;
l2.getAlpha = l1.getAlpha;

l2.setName();
console.log("@l2 = ", l2.getAlpha());
console.log("@l1 = ", l1.getAlpha());
l1.setName();
console.log("@@l1 = ", l1.getAlpha());
console.log("@@l2 = ", l2.getAlpha());

/* 
Функция генератор - создает объект итератор
*/

function* gaussFoo() {
    let s = "Залп-";
    console.log("здесь начинается выполнение next -1");
    yield s + 1;

    console.log("здесь начинается выполнение next -2");
    yield* bigGaussFoo();

    console.log("здесь начинается выполнение next -3");
    yield s + 3;

    console.log("здесь начинается выполнение next -4 - конец генератора");
    return true;
}
// данный генератор выполняется в другом генераторе
function* bigGaussFoo() {
    let s = "Эми-";
    yield s + 1;
    yield s + 2;
}
const btn = document.querySelector("#btn3");
// ссылка на итератор
let s = gaussFoo();

// console.log(btn)

btn.addEventListener("click", () => {
    // обработка объекта итератора - который создает наша функция-генератор GaussFoo
    // for (const shoot of gaussFoo()) {
    //     console.log("Gauss shoot = ", shoot)
    // }

    // метод next функции генератора
    let s1 = s.next();
    fetch("/api/ninja")
        .then((res) => res.json())
        .then((data) => console.log(data));
    console.log(s1);
});

// совмещение генератора с обещаниями
/*
когда запрашиваемы данные зависят друг от друга
*/

/* 
Object 
*/
const y = {
    a: 1,
    b: 2,
    c: 3,
};

console.log("У объекта y есть поле a", "a" in y);
console.log("У объекта y есть поле y", "y" in y);
console.log("у является объектом js", y instanceof Object);
console.log("переменная является числом", typeof y.a === "number");

function Samurai() {}
Samurai.prototype.brutality = function () {};

function Ninja() {}
Ninja.prototype.fatality = function () {};

Samurai.prototype = new Ninja();

const ninja1 = new Ninja();
const samurai1 = new Samurai();

class Ronin {
    countHit=0
    constructor() {
        // this.countHit = 0;
    }
    get getHit() {
        return this.countHit;
    }
    set setHit(value) {
        this.countHit = value
    }
}
const ronin1 = new Ronin();

console.log("ninja1", ninja1);
console.log("samirai1", samurai1);
console.log("ronin1", ronin1);
console.log(ronin1.getHit);
ronin1.setHit = 10
console.log(ronin1.getHit);
