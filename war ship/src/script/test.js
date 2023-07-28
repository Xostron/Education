const arr = [1, 2, 3, 4, 5];
console.log("Исходный = ", arr);

// ************************************************************
// удаление из массива: сначала собираем массив индексов удаляемых элементов
// потом удалаяем
const del = [];
arr.forEach((val, idx) => {
    console.log("@val = ", val, idx);
    if (val === 1 || val == 4) {
        // console.log()
        del.push(idx);
    }
});
console.log("result = ", arr);
del.forEach((id) => {
    arr.splice(id, 1);
});
console.log("result = ", arr);
// ************************************************************

// ************************************************************
// сравнение массивов на идентичность
function arraysEqual(arr1, arr2) {
    return (
        arr1.length === arr2.length &&
        arr1.every((value, index) => value === arr2[index])
    );
}
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 4, 5];
console.log("Массивы идентичны =", arraysEqual(arr1, arr2));
// ************************************************************

// ************************************************************
// сравнение массивов по содержимому (элементы массива уникальны)
const a1 = [1, 3, 5, 2, 3];
const a2 = [1, 2, 3, 4, 5];
function arrEqContent(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (const x of arr1) {
        if (!arr2.includes(x)) return false;
    }
    return true;
}
console.log("Массивы равны по содержимому = ", arrEqContent(a1, a2));
// ************************************************************
console.log([10, 1, 11, 30, 3].sort((a, b) => b - a));
// ************************************************************
// toFixed мантиса
const a3 = [1, 1, 2, 2.5, 3, 4, 5, 3.5, 2, 4, 5, 1];
let remainder = 100.0;
arr.forEach((el) => {
    remainder -= el;
});
console.log("Остаток = ", remainder);
// ************************************************************

// ************************************************************
const a4 = [1, 2, 3, 4, 5];
function qwe(arr) {
    const to = []
    for (const i of arr) {
        console.log("@ a4 i =",i);
        if (i > 0) {
            const obj={q:0}
            switch (true) {
                case i === 4:
                    obj.q=i
                    obj.rem={qq:i}
                    to.push(obj)
                    return to
                case i === 3:
                    obj.q=i
                    to.push(obj)
                    console.log('@=',to)
                    break
                default:
                    break;
            }
        }
    }
    return to
}
const t = qwe(a4)
console.log('return = ', t)
// ************************************************************
