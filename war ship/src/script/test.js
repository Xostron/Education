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
// сравнение массивов по содержимому (элементы массива уникальны) ? не совсем
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
// toFixed мантисса
const a3 = [1, 1, 2, 2.5, 3, 4, 5, 3.5, 2, 4, 5, 1];
let remainder = 100.0;
arr.forEach((el) => {
  remainder -= el;
});
console.log("Остаток = ", remainder);
// ************************************************************

// ************************************************************
// выход из цикла в одном из свитчей
const a4 = [1, 2, 3, 4, 5];
function qwe(arr) {
  const to = [];
  for (const i of arr) {
    console.log("@ a4 i =", i);
    if (i > 0) {
      const obj = { q: 0 };
      switch (true) {
        case i === 4:
          obj.q = i;
          obj.rem = { qq: i };
          to.push(obj);
          return to;
        case i === 3:
          obj.q = i;
          to.push(obj);
          console.log("@=", to);
          break;
        default:
          break;
      }
    }
  }
  return to;
}
const t = qwe(a4);
console.log("return = ", t);

// ************************************************************
// рекурсивный Промис
function getCode(doc) {
  return new Promise((resolve, reject) => {
    // проверка есть ли в док - какой-нибудь Id возвращает {} или object{...}
    const ref = extrId(doc);

    if (!Object.keys(ref).length) {
      // выход из рекурсии (результат code найден)
      return resolve(doc?.code);
    }
    // запуск рекурсии
    dict(db, ref.name, ref.val, ref.fld)
      .then((doc) => {
        return getCode(doc);
      })
      // возвращаемый результат (code) из рекурсии
      .then((code) => resolve(code))
      .catch(reject);
  });
}
function extrId(doc) {
  const refs = [
    {
      fld: "companyId",
      name: "company",
    },
    {
      fld: "promotionId",
      name: "promotion",
    },
    {
      fld: "categoryId",
      name: "category",
    },
    {
      fld: "googlePlayId",
      name: "googlePlay",
    },
    {
      fld: "productId",
      name: "product",
    },
    {
      fld: "propertyId",
      name: "property",
    },
  ];
  if (!doc) return {};
  for (const ref of refs) {
    if (Object.keys(doc).includes(ref.fld)) {
      return {
        fld: "_id",
        name: ref.name,
        val: doc[ref.fld],
      };
    }
  }
  return {};
}

console.log("1 имеет ли объект поле categoryId=", extrId(null));
console.log("2 имеет ли объект поле categoryId=", extrId({ categoryId: 42 }));
console.log("3 имеет ли объект поле categoryId=", extrId({ name: 100 }));

// ************************************************************
// рекурсивная функция вычисление степени
function pow(x, n) {
  // выход из рекурсии
  if (n == 1) {
    return x;
  }
  //   вызов рекурсии
  return x * pow(x, n - 1);
}


// ************************************************************
// последовательный цикл async await
function tqq(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
      console.log(value)
    }, 1000);
  });
}

async function Cycle(arrP) {
  for (const i of arrP) {
    const r = await tqq(i);
    console.log('@ = ',i);
  }
  return "done!";
}

const p = [1,2,3,4,5];
Cycle(p).then((r) => {
  console.log(r);
});

// ************************************************************
// Последовательный цикл обработки - рекурсия
function tq(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value >= 5 ? 'ok': 'no');
      }, 5000);
    });
  }
const loop = value =>
  tq(value).then(result => {
    console.log(value)
    if (result === 'ok') {
      console.log('yay')      
    } else {
      return loop(value + 1)
    }
  })

// loop(1).then(() => console.log('all done!'))
