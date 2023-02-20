const login = document.querySelector(".login");
const field = document.querySelector(".field1");
const field2 = document.querySelector(".field2");
const cells = document.querySelector(".cells");
const header = document.querySelector(".header");
const phantom = document.querySelector(".phantom");
const game = document.querySelector(".game");
const btns = document.querySelector(".game-btns");

let selectedShip = {};
let selectedTool = {};
let isValid = false
const SIZE = 10;
const state = {
  cell: 0,
  ship: 1,
  away: 2,
  hit: 3,
  destroy: 4,
};
let tools = [
  new shipCard(1, 3),
  new shipCard(2, 2),
  new shipCard(3, 2),
  new shipCard(4, 2),
  // new shipCard(5, 1),
];

let fieldP1Loc = []
let fieldP2Loc = []
let fieldP1Battle = []
let fieldP2Battle = []
let fieldTemp = [];
let screenField = 0

// =====подписка на события=====
field.addEventListener("dragenter", (ev) => {
  // отслеживание ячеек - графика
  const cells = field.querySelectorAll(".cell");
  if (ev.target !== field) {
    // координата-индекс отслеживаемой ячейки
    const absId = Array.from(cells).indexOf(ev.target);
    const rowId = Math.trunc(absId / 10);
    const rltId = absId + 1 - rowId * 10;
    const sizeRow = 10;
    // очистка следов перемещения
    fieldTemp.forEach((val, idx) => {
      val === 1 ? (fieldTemp[idx] = 0) : fieldTemp[idx];
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
    const piece2 = a2 >= 0 ? fieldTemp.slice(a2, a22) : [];
    const piece1 = fieldTemp.slice(a1, a11);
    const piece0 = fieldTemp.slice(a0, a00);
    const piece = [...piece2, ...piece1, ...piece0];
    const isCollision = piece.includes("S1");
    // определяем валидную область для размещения корабля
    if (selectedShip.size <= sizeRow - rltId + 1 && !isCollision) {
      fieldTemp.splice(
        absId,
        selectedShip.size,
        ...Array(selectedShip.size).fill(1)
      );
      isValid = true;
    } else {
      isValid = false;
    }
    // вносим изменения (размещаем корабль)
    cells.forEach((cell, idx) => {
      if (fieldTemp[idx] === 1 || fieldTemp[idx] === "S1") {
        cell.dataset.state = "ship";
      } else {
        cell.dataset.state = "cell";
      }
    });
  } else {
    // очистка следов перемещения
    fieldTemp.forEach((val, idx) => {
      val === 1 ? (fieldTemp[idx] = 0) : fieldTemp[idx];
    });
    cells.forEach((cell, idx) => {
      if (fieldTemp[idx] === 1 || fieldTemp[idx] === "S1") {
        cell.dataset.state = "ship";
      } else {
        cell.dataset.state = "cell";
      }
    });
  }
  console.log("=============dragenter==========",fieldTemp);
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
  if (isValid) {
    isValid=false
    fieldTemp.forEach((val, idx) => {
      val === 1 ? (fieldTemp[idx] = "S1") : fieldTemp[idx];
    });
    selectedTool.sub();
  }
});

// ==============вызов программы==============
Login(login);
tools.map((val, idx) => DragEl(val, idx, phantom));
