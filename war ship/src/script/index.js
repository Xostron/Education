const login = document.querySelector(".login");
const field = document.querySelector(".field");
const header = document.querySelector(".header");
const phantom = document.querySelector(".phantom");

let selectedShip = {};
let selectedTool = {};

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

// =====подписка на события=====
field.addEventListener("dragenter", (ev) => {
  // отслеживание ячеек - графика
  console.log("=============dragenter==========", ev.target);
  const cells = field.querySelectorAll(".cell");
  if (ev.target !== field) {
    // координата-индекс отслеживаемой ячейки
    const absId = Array.from(cells).indexOf(ev.target);
    const rowId = Math.trunc(absId / 10);
    const rltId = absId + 1 - rowId * 10;
    const sizeRow = 10;
    // очистка следов перемещения
    arr1Field.forEach((val, idx) => {
      val === 1 ? (arr1Field[idx] = 0) : arr1Field[idx];
    });
    // перемещение текущего корабля с проверкой границ поля
    // область коллизии
    const a1 = absId === rowId * 10 ? absId : absId - 1;
    const a11 =
      absId + selectedShip.size === (rowId + 1) * 10
        ? absId + selectedShip.size
        : absId + selectedShip.size + 1;
    const a2 = a1 - 10;
    const a22 = a11 - 10;
    const a0 = a1 + 10;
    const a00 = a11 + 10;
    const piece2 = a2 >= 0 ? arr1Field.slice(a2, a22) : [];
    const piece1 = arr1Field.slice(a1, a11);
    const piece0 = arr1Field.slice(a0, a00);
    const piece = [...piece2, ...piece1, ...piece0];
    const isCollision = piece.includes("S1");
    // определяем валидную область для размещения корабля
    if (selectedShip.size <= sizeRow - rltId + 1 && !isCollision) {
      arr1Field.splice(
        absId,
        selectedShip.size,
        ...Array(selectedShip.size).fill(1)
      );
    }
    // вносим изменения (размещаем корабль)
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
  // разрешаем сбрасывать элементы в игровое поле
  if (ev.target !== field) {
    ev.preventDefault();
  }
});

field.addEventListener("drop", (ev) => {
  // 1 - корабль который расположили на поле
  // S1 - установленный корабль
  console.log('drop')
  arr1Field.forEach((val, idx) => {
    val === 1 ? (arr1Field[idx] = "S1") : arr1Field[idx];
  });
  selectedTool.sub();
});

// ==============вызов программы==============
Login(login);
tools.map((val, idx) => DragEl(val, idx, phantom));
