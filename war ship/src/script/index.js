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
let bufferP1 = [];
let bufferP2 = [];
let mode =''
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
      bufferP1.push(
        fieldTemp.map((val) => {
          return val === 1 ? 0 : val;
        })
      );
      //сохранение в рабочий массив
      fieldTemp.forEach((val, idx) => {
        if (val === 1) {
          fieldTemp[idx] = shipP1Battle[shipP1Battle.length - 1];
          fieldTemp[idx].ship[idx] = false;
        } else {
          fieldTemp[idx];
        }
      });
    }
    // поле игрока 2
    else if (screenField === 1) {
      shipP2Battle.push(selectedShip);
      shipP2Battle[shipP2Battle.length - 1].state = "S1";
      bufferP2.push(
        fieldTemp.map((val) => {
          return val === 1 ? 0 : val;
        })
      );
      //сохранение в рабочий массив
      fieldTemp.forEach((val, idx) => {
        if (val === 1) {
          fieldTemp[idx] = shipP2Battle[shipP2Battle.length - 1];
          fieldTemp[idx].ship[idx] = false;
        } else {
          fieldTemp[idx];
        }
      });
      // bufferP2.push(fieldTemp.slice())
    }
    selectedTool.sub();
    isValid = false;
    console.log("DROP - push = ", bufferP1, bufferP2);
  }
  // перерисовка для обновления валидации кнопки "Дальше"
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

function hndlLoginStart(...args) {
  // кнопка старт - Логин
  const inputs = args;
  mode = inputs.length
  console.log("hanler = ", inputs, mode);
  player1 = inputs[0].value ? inputs[0].value : "Игрок 1";
  if (inputs[1]) {
    player2 = inputs[1].value ? inputs[1].value : "Игрок 2";
  }
  Login(login, mode,false);
  initNext();
}
function hndlControl(event) {
  const { target } = event;
  if (target.id === "next") {
    hndlNext();
  } else if (target.id === "back") {
    hndlBack();
  } else if (target.id === "clear") {
    hndlClear();
  } else if (target.id === "stepB") {
    if (screenField === 0) {
      hndlStepB(bufferP1, shipP1Battle);
    } else if (screenField === 1) {
      hndlStepB(bufferP2, shipP2Battle);
    }
  } else if (target.id === "alocn") {
    if (screenField === 0) {
      reInit("left");
      autolocn(shipP1Battle, bufferP1);
    } else if (screenField === 1) {
      reInit("right");
      autolocn(shipP2Battle, bufferP2);
    }
  } else if (target.id === "close") {
    init();
    Login(login);
  }
}
function hndlNext() {
  // кнопка next
  if (screenField === 0) {
    fieldP1Loc = fieldTemp;
    if (mode===1){
      // singlePlayer экран редактирования
      screenField+=2
      // конфигурация поля ПК ? и вывод 2-х экранов
      reInit("right");
      autolocn(shipP2Battle, bufferP2);
      fieldP2Loc=fieldTemp
      //отрисовка 
      initNextGame(screenField);
    }else{
      // 2xPlayers
      screenField++;
      if (fieldP2Loc.length > 0) {
        // если уже редактировали поле 2
        initBack(fieldP2Loc, shipP2Battle, "right");
      } else {
        // если поле 2 - "чистое"
        initNext("right");
      }
    }
    
    
  } else if (screenField === 1) {
    // эран редактирования поля 2
    screenField++;
    fieldP2Loc = fieldTemp;
    // играть
    initNextGame(screenField);
  }
}
function hndlBack() {
  screenField--;
  // сохранение текущеего поля 2
  fieldP2Loc = fieldTemp;
  // восстановление предыдущего поля 1
  initBack(fieldP1Loc, shipP1Battle, "left");
}
function hndlClear() {
  if (screenField === 0) {
    reInit("left");
    bufferP1 = [];
  } else if (screenField === 1) {
    reInit("right");
    bufferP2 = [];
  }
  Control(btns);
  Toolbar(header, tools);
  Field(field, fieldTemp);
}
function hndlStepB(arrBuffer, shipP) {
  // извлекаем из буфера конфигурацию поля
  if (arrBuffer.length < 2) {
    console.log("STEP B - return");
    return;
  }
  fieldTemp = arrBuffer.pop();
  // извлекаем из списка добавленных кораблей
  // и увеличиваем в tools - карточке корабля
  const ship = shipP.pop();
  tools[ship.size - 1].sum += 1;

  Field(field, fieldTemp, true);
  console.log("STEB B = ", fieldTemp, arrBuffer);
  Control(btns);
  Toolbar(header, tools);
}
function hndlBattle(event) {
  // handler ячеек - выстрел
  const cells = event.currentTarget.querySelectorAll(".cell");
  const absId = Array.from(cells).indexOf(event.target);
  if (event.currentTarget === field) {
    setFire(fieldP2Loc, absId, stP1, shipP1Battle);
  } else if (event.currentTarget === field2) {
    setFire(fieldP1Loc, absId, stP2, shipP2Battle);
  }
}
function setFire(arrEnemy, pos, stP, shipPBattle) {
  // выстрел по полю с ячейками
  // console.log(" @@@ = ", arrEnemy);
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
        win(stP, shipPBattle);
        onOffModal(screenField - 1, "Корабль уничтожен", true);
        // ****подсветка области уничтоженного корабля******
        const begin = +Object.keys(arrEnemy[pos].ship)[0];
        const ori = arrEnemy[pos].rotation;
        const size = arrEnemy[pos].size;
        const rowId = Math.trunc(begin / SIZE);
        console.log("arr=", begin, rowId, ori, size, arrEnemy);
        const { piece, pieceShip } = getArrCollision(begin, rowId, ori, size);
        piece.forEach((val) => {
          if (typeof arrEnemy[val] !== "object") {
            arrEnemy[val] = "E1";
          }
        });
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
  initNextGame(screenField);
}

// ==============вызов программы==============
init();
Login(login);

tools.map((val, idx) => DragEl(val, idx, phantom));
