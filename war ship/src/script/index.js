const login = document.querySelector(".login");
const field = document.querySelector(".field1");
const field2 = document.querySelector(".field2");
const cells = document.querySelector(".cells");
const header = document.querySelector(".header");
const phantom = document.querySelector(".phantom");
const game = document.querySelector(".game");
const btns = document.querySelector(".game-btns");
const st1 = document.querySelector("#st1");
const st2 = document.querySelector("#st2");
const modal = document.querySelector(".modal")

let selectedShip = {};
let selectedTool = {};
let isValid = false;
const SIZE = 10;
const state = {
  cell: 0,
  ship: 1,
  away: 2,
  hit: 3,
  destroy: 4,
};
let tools = [
  new shipCard(1, 4),
  new shipCard(2, 3),
  new shipCard(3, 2),
  new shipCard(4, 1),
  // new shipCard(5, 1),
];
let stP1 = {
  1:0,
  2:0,
  3:0,
  4:0
}
let stP2 = {
  1:0,
  2:0,
  3:0,
  4:0
}
let fieldP1Loc = [];
let fieldP2Loc = [];
let shipP1Battle = [];
let shipP2Battle = [];
let fieldTemp = [];
let screenField = 0;

// =====подписка на события=====

field.addEventListener("dragenter", (ev) => {
  // отслеживание ячеек - графика
  const cells = field.querySelectorAll(".cell");
  if (ev.target !== field) {
    // координата-индекс отслеживаемой ячейки
    const absId = Array.from(cells).indexOf(ev.target);
    const rowId = Math.trunc(absId / SIZE);
    const rltId = absId + 1 - rowId * SIZE;

    // очистка следов перемещения
    clearField(fieldTemp);

    let { isCollision, arrSlice, rotation } = getCollision(
      fieldTemp,
      absId,
      rowId,
      rltId
    );
    // определяем валидную область для размещения корабля
    if (isCollision) {
      if (rotation === 0) {
        fieldTemp.splice(
          absId,
          selectedShip.size,
          ...Array(selectedShip.size).fill(1)
        );
        
      }else{
        arrSlice.forEach((val,idx)=>{
          fieldTemp[val]=1
        })
      }
      isValid = true;
    } else {
      isValid = false;
    }
    updateField(cells, fieldTemp);
  } else {
    // очистка следов перемещения
    clearField(fieldTemp);
    updateField(cells, fieldTemp);
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
  if (isValid) {
    // поле игрока 1
    if (screenField === 0) {
      shipP1Battle.push(selectedShip);
      shipP1Battle[shipP1Battle.length - 1].state = "S1";
    }
    // поле игрока 2
    else if (screenField === 1) {
      shipP1Battle.push(selectedShip);
      shipP1Battle[shipP1Battle.length - 1].state = "S1";
    }
    //
    fieldTemp.forEach((val, idx) => {
      // val === 1
      //   ? (fieldTemp[idx] = shipP1Battle[shipP1Battle.length - 1])
      //   : fieldTemp[idx];
      if (val === 1) {
        fieldTemp[idx] = shipP1Battle[shipP1Battle.length - 1];
        fieldTemp[idx].ship[idx] = false;
      } else {
        fieldTemp[idx];
      }
    });
    selectedTool.sub();
    isValid = false;
  }
  // console.log(shipP1Battle[shipP1Battle.length - 1], shipP2Battle);
  Control(btns);
});

header.addEventListener("dblclick", (ev) => {
  // переключатель верт. - гориз. корабль
  // console.log("toggle = ", ev, ev.target)
  const target = ev.target;
  const idName = target.id.slice(0, 4);

  if (idName === "tool") {
    const idx = target.id.slice(4);
    tools[idx].rotate();
    // иконка
    const img_ship = ev.target.querySelector(".img-ship");
    img_ship.style.transform = `rotateZ(${tools[idx].rotation}deg)`;
    // фантомная копия
    const el = document.querySelector(`#drag${idx}`);
    el.style.flexDirection= el.style.flexDirection === "column" ? "row" : "column";
    const phantomCell = el.querySelector(".cell");
    const phantomImg = phantomCell.querySelector(".cell");
    phantomImg.style.transform = `rotateZ(${tools[idx].rotation}deg)`;
    // console.log("el=", el);
  }
});

// ==============вызов программы==============
Login(login);
tools.map((val, idx) => DragEl(val, idx, phantom));
