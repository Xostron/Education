const login = document.querySelector(".login");
const field = document.querySelector(".field");
const header = document.querySelector(".header");
const phantom = document.querySelector(".phantom");

const SIZE = 10;
const state = {
  cell: 0,
  ship: 1,
  away: 2,
  hit: 3,
  destroy: 4,
};
const tools = [
  new shipCard(1, 4),
  new shipCard(2, 2),
  new shipCard(3, 3),
  new shipCard(4, 2),
  new shipCard(5, 1),
];

let arrField = [];
let r = Array(SIZE).fill(0);
for (let i = 0; i < SIZE; i++) {
  arrField.push([...r]);
}
const arr1Field = [];
for (let i = 0; i < SIZE; i++) {
  arr1Field.push(...arrField[i]);
}
console.log(arrField);

// =====подписка на события=====
field.addEventListener("dragenter", (ev) => {
  // отслеживание ячеек - графика
  console.log("=============dragenter==========",ev.target);
  const cells = field.querySelectorAll(".cell");
  // ev.preventDefault()
  if (ev.target !== field) {
    
    // координата-индекс отслеживаемой ячейки
    const absId = Array.from(cells).indexOf(ev.target);
    const rowId = Math.trunc(absId / 10);
    const rltId = absId + 1 - rowId * 10;
    const sizeRow = 10;
    console.log("координата = ", absId, rltId, rowId);
    // переопределение выбранной ячейки
    // проверка на коллизии

    // очистка следов перемещения
    arr1Field.forEach((val, idx) => {
      val === 1 ? (arr1Field[idx] = 0) : arr1Field[idx];
    });
    // перемещение текущего корабля с проверкой границ поля
    // область коллизии
    // || absId+1===(rowId+1)*10
    const a1 = absId === rowId * 10 ? absId : absId - 1;
    const a11 =
      absId + selected.size === (rowId + 1) * 10
        ? absId + selected.size
        : absId + selected.size + 1;

    const a2 = a1 - 10;
    const a22 = a11 - 10;
    const a0 = a1 + 10;
    const a00 = a11 + 10;

    const piece2 = a2 >= 0 ? arr1Field.slice(a2, a22) : [];
    const piece1 = arr1Field.slice(a1, a11);
    const piece0 = arr1Field.slice(a0, a00);
    const piece = [...piece2, ...piece1, ...piece0];
    const isCollision = piece.includes("S1");

    console.log("piece2=", a2, a22, piece2);
    console.log("piece1=", a1, absId, a11, piece1);
    console.log("piece0=", a0, a00, piece0);

    if (selected.size <= sizeRow - rltId + 1 && !isCollision) {
      arr1Field.splice(absId, selected.size, ...Array(selected.size).fill(1));
    }
    console.log("selected = ", sizeRow, rltId, arr1Field);
    // изменение отображения ячеек
    cells.forEach((cell, idx) => {
      if (arr1Field[idx] === 1 || arr1Field[idx] === "S1") {
        cell.dataset.state = "ship";
      } else {
        cell.dataset.state = "cell";
      }
    });
  } else {
    // очистка следов перемещения
    arr1Field.forEach((val, idx) => {
      val === 1 ? (arr1Field[idx] = 0) : arr1Field[idx];
    });
    cells.forEach((cell, idx) => {
      if (arr1Field[idx] === 1 || arr1Field[idx] === "S1") {
        cell.dataset.state = "ship";
      } else {
        cell.dataset.state = "cell";
      }
    });
  }
});

field.addEventListener("dragover", (ev) => {
  // разрешаем сбрасывать элементы в ячейки
  if (ev.target !== field) {
    ev.preventDefault();
  }
});

field.addEventListener("drop", (ev) => {
  // передаваемые данные при
  let ship = JSON.parse(ev.dataTransfer.getData("ship"));
  let tool = JSON.parse(ev.dataTransfer.getData("tool"));
  arr1Field.forEach((val, idx) => {
    val === 1 ? (arr1Field[idx] = "S1") : arr1Field[idx];
  });
  // tool.sub()
  console.log("@@@drop = ", ship, tool);
});

// ==============вызов программы==============
Login(login);
tools.map((val, idx) => DragEl(val, idx, phantom));
