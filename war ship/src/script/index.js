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
const modal = document.querySelector(".modal");

const SIZE = 10;
const state = {
  cell: 0,
  ship: 1,
  away: 2,
  hit: 3,
  destroy: 4,
};

let selectedShip = {};
let selectedTool = {};
let isValid = false;
let tools = [];
let stP1 = {};
let stP2 = {};
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
      } else {
        arrSlice.forEach((val, idx) => {
          fieldTemp[val] = 1;
        });
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
  Control(btns);
});

header.addEventListener("dblclick", (ev) => {
  // переключатель верт. - гориз. корабль
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
    el.style.flexDirection =
      el.style.flexDirection === "column" ? "row" : "column";
    const phantomCell = el.querySelector(".cell");
    const phantomImg = phantomCell.querySelector(".cell");
    phantomImg.style.transform = `rotateZ(${tools[idx].rotation}deg)`;
  }
});

function hndlLoginStart(in1, in2) {
  // кнопка старт - Логин
  player1 = in1.value ? in1.value : "Игрок 1";
  player2 = in2.value ? in2.value : "Игрок 2";
  Login(login, false);
  initLocation();
}
function hndlControl(event) {
  const { target } = event;
  if (target.id === "next") {
    hndlNext();
  } else if (target.id === "back") {
  } else if (target.id === "close") {
    init();
    Login(login);
  }
}
function hndlNext() {
  // кнопка next
  if (screenField === 0) {
    screenField++;
    fieldP1Loc = fieldTemp;
    initLocation("right");
  } else if (screenField === 1) {
    screenField++;
    fieldP2Loc = fieldTemp;
    initGame(screenField);
  }
}
function hndlBattle(event) {
  // handler ячеек - выстрел
  const cells = event.currentTarget.querySelectorAll(".cell");
  const absId = Array.from(cells).indexOf(event.target);
  if (event.currentTarget === field) {
    setFire(fieldP2Loc, absId, stP1);
  } else if (event.currentTarget === field2) {
    setFire(fieldP1Loc, absId, stP2);
  }
}
function setFire(arrEnemy, pos, stP) {
  // выстрел по полю с ячейками
  console.log(" @@@ = ", arrEnemy);
  if (arrEnemy[pos] !== 0 && arrEnemy[pos] !== "E1") {
    // попали в корабль
    if (arrEnemy[pos].ship[pos] === true) {
      // если уже стреляли сюда, то ничего не делаем
      onOffModal(
        screenField - 1,
        "По данной координате уже стреляли, корабль подбит",
        true
      );
    } else {
      // попали
      arrEnemy[pos].hit(pos);
      // stP.amount += 1;
      onOffModal(screenField - 1, "Корабль подбит", true);
      // проверяем уничтожение корабля
      if (arrEnemy[pos].state === "kill") {
        stP[arrEnemy[pos].size] += 1;
        win(stP);
        onOffModal(screenField - 1, "Корабль уничтожен", true);
        // ****подсветка области уничтоженного корабля******
        const begin = Object.keys(arrEnemy[pos].ship)[0];
        const ori = arrEnemy[pos].rotation;
        const size = arrEnemy[pos].size
        const rowId = Math.trunc(begin / SIZE);
        
        const arr = getArrCollision(begin,rowId,ori,size,arrEnemy);
        // console.log('arr=',arrEnemy,arr)
      }
    }
  } else if (arrEnemy[pos] === "E1") {
    // если уже стреляли сюда, то ничего не делаем
    onOffModal(
      screenField - 1,
      "В эту позицию уже стреляли, каллибровка",
      true
    );
  } else {
    // мимо
    onOffModal(screenField - 1, "Мимо, перезаряжаюсь", true);
    arrEnemy[pos] = "E1";
    stP.amount += 1;
    screenField === 3 ? screenField-- : screenField++;
  }
  // перерисовка
  initGame(screenField);
}

// ==============вызов программы==============
init();
Login(login);

tools.map((val, idx) => DragEl(val, idx, phantom));
