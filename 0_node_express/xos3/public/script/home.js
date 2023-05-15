const labelForm = document.querySelector("#label-file");
const inFile = document.querySelector("#file");
const btnSend1 = document.querySelector("#btn1");
const btnSend2 = document.querySelector("#btn2");
const formData = new FormData();

inFile.addEventListener("change", (event) => {
    const listFiles = Object.values(event.target.files);
    labelForm.innerText = "";
    listFiles.forEach((val) => {
        labelForm.innerText += val.name + "\n";
    });
    for (const file of event.target.files) {
        formData.append("image", file);
    }
});

btnSend1.addEventListener("click", (event) => {
    formData.set("msg1", "Отработка кнопки 1");
    formData.set("msg2", "Files - Duna");
    console.log("formData = ", formData);
    fetch("/api/form-file", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then(console.log);
});

btnSend2.addEventListener("click", (event) => {
    fetch("/api/btn2", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ msg: "Xostron отработка кнопки 2" }),
    })
        .then((r) => r.json())
        .then((d) => {
            console.log("Answer: ", d);
        })
        .catch(console.log);
});

function screens(id, name, list) {
    return Array(10)
        .fill("")
        .map((val, idx) => ({
            _id: id + idx,
            list: [`${list}${idx + 1}`, `Рекламный блок - скрин ${idx + 1}`],
            flt: [name],
        }));
}

const data = [
    {
        _id: 1,
        list: ["logo.mobile", "О компании - Приложение"],
        flt: ["company"],
    },
    {
        _id: 2,
        list: ["logo.site", "О компании - Сайт"],
        flt: ["company"],
    },
    {
        _id: 3,
        list: ["logo.bonus", "О компании - Бонус"],
        flt: ["company"],
    },
    {
        _id: 4,
        list: ["logo.home.on", "О компании - Меню"],
        flt: ["company"],
    },
    {
        _id: 5,
        list: ["logo.home.off", "О компании - Меню выкл"],
        flt: ["company"],
    },
    {
        _id: 6,
        list: ["logo.promo", "О компании - Реклама"],
        flt: ["company"],
    },
    {
        _id: 7,
        list: ["ico", "Google play - Значок приложения"],
        flt: ["googlePlay"],
        no: ["s", "l", "m"],
    },
    {
        _id: 8,
        list: ["descImg", "Google play - Картинка для описания"],
        flt: ["googlePlay"],
    },
    {
        _id: 9,
        list: ["pattern", "Google play - Стартовый экран"],
        flt: ["googlePlay"],
    },
    {
        _id: 10,
        list: ["img", "Сотрудник - Аватар"],
        flt: ["employee"],
        yes: ["s", "m"],
    },
    {
        _id: 11,
        list: ["img", "Категория товаров"],
        flt: ["category"],
    },
    {
        _id: 12,
        list: ["logo", "Лого"],
        flt: ["company"],
    },
    {
        _id: 13,
        list: ["img", "Продукт"],
        flt: ["product"],
    },
    {
        _id: 14,
        list: ["img", "Скриншот приложения"],
        flt: ["screen"],
    },
    {
        _id: 15,
        list: ["ico", "Рекламный блок"],
        flt: ["proList"],
    },
    {
        _id: 16,
        list: ["screen1", "Рекламный блок - скрин 1"],
        flt: ["proList"],
    },
    ...screens(16, "proList", "screen"),
    {},
];
// ******************************************
console.log(data);

console.log("$ Promise: запуск промиса по условию");

// function pr2(x) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(`${x} TIMER:`, "2s - finish");
//             resolve({ msg: "finish", x });
//         }, 2000);
//     });
// }

// function pr1() {
//     let result;
//     return new Promise((resolve, reject) => {
//         pr2(1)
//             .then((data) => {
//                 console.log("1 pr1 = ", data);
//                 result = data;
//                 // если ==1 то выполняется промис return Promise.resolve(pr2(2));
//                 if (data.x === 1) {
//                     return Promise.resolve(pr2(2));
//                 }
//                 // иначе отправляется resolve(result) в pr1.then, причем
//                 // следующий then - undefined и его resolve (hui) не влияет (игнорируется) на
//                 // pr1.then, главное обезопасить второй then от возникновение ошибок
//                 resolve(result);
//             })
//             .then((data) => {
//                 if (data) {
//                     console.log("2 pr1 = ", data, result);
//                     result.y = data.x;
//                 }
//                 result.hui = "hui";
//                 console.log("2-1 pr1 = ", data, result);
//                 resolve(result);
//             })
//             .catch(console.log);
//     });
// }

// pr1()
//     .then((data) => {
//         console.log("result = ", data);
//     })
//     .catch(console.log);

// ******************************************
console.log("$ Частичное сравнение 2х массивов");

// const img1 = {
//     id: 10,
//     name: "a",
// };
// const img2 = {
//     id: 2,
//     name: "qwerty",
// };
// const img3 = {
//     id: 3,
//     name: "opi",
// };
// const imgs = [[], [], []];
// const result1 = [
//     { id: 10, ico: "" },
//     { id: 1, ico: "" },
//     { id: 2, ico: "" },
//     { id: 3, ico: "" },
//     { id: 100, ico: "" },
// ];

// console.log("@result = ", result1);
// result1.forEach((el) => {
//     for (let i = 0; i < imgs.length; i++) {
//         if (imgs[i].length) {
//             if (imgs[i][0].id === el.id) {
//                 el.ico = imgs[i][0].name;
//                 break;
//             } else {
//                 el.ico = "-";
//             }
//         } else {
//             el.ico = "+";
//         }
//     }
// });
// console.log("@@@result = ", result1);

// ***********************************
console.log('$ Дата и время')
let now = new Date()
console.log('now = ', now)
let date = new Date('2023-05-11')
console.log('date = ',date)

let date1 = new Date().getHours()
let date2 = new Date().getUTCHours()
console.log('date 1 = ',date1)
console.log('dateUTC = ',date2)

let date3 = Date.now()
console.log('Текущая метка времени = ', date3)

let date4=new Intl.DateTimeFormat('ru').format()
console.log('date4 = ',date4)

let date5=now.toLocaleTimeString()
console.log('date5 = ',date5)

let date6=now.toLocaleString()
console.log('date6 = ',date6)

let date7=date.toString()
console.log('date7 = ',date7)