// Global
// input field
let player1,
  player2 = "";

function render(template, where, wrapper = true) {
  // функция отображения компонетов
  if (wrapper) {
    const container = document.createElement("div");
    container.innerHTML = template;
    where.append(container);
    return container;
  } else {
    where.innerHTML = template;
    return where;
  }
}
function DragEl(tool, idx, where) {
  // отображение фантомной копии
  const { size } = tool;
  const imgShip = {
    front: `<img class="cell" src="./src/source/icon/1xh.svg"/>`,
    middle: `<img class="cell" src="./src/source/icon/0x.svg"/>`,
    back: `<img class="cell" src="./src/source/icon/1xh.svg"/>`,
  };
  let container = document.createElement("div");
  container.classList.add("drag-el");
  container.id = `drag${idx}`;
  for (let i = 0; i < size; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.state = "phantom";
    i === 0
      ? (cell.innerHTML += imgShip.front)
      : (cell.innerHTML += imgShip.middle);
    container.append(cell);
  }
  where.append(container);
}
function Login(where, display = true) {
  // окно логина
  let template = `
  <span class="login-title">Морской бой</span>
  <span class="login-subtitle"> 1 на 1</span>
  <div class="login-input">
  <input class="input" type="text" id="in1" placeholder="Игрок 1"/>
  </div>
  <div class="login-input">
  <input class="input" type="text" id="in2" placeholder="Игрок 2"/>
  </div>
  <button class="btn btn-text">Начать игру</button>
  <div class="blur"></div>
  `;
  display ? render(template, where, false) : render("", where, false);
  if (display) {
    const hndlStart = where.querySelector(".btn-text");
    const in1 = where.querySelector("#in1");
    const in2 = where.querySelector("#in2");
    // ====подписка на события====
    hndlStart.addEventListener("click", () => {
      hndlLoginStart(in1, in2);
    });
  }
}
function hndlLoginStart(in1, in2) {
  // кнопка старт - Логин
  player1 = in1.value ? in1.value : "Игрок 1";
  player2 = in2.value ? in2.value : "Игрок 2";
  Login(login, false);
  initLocation();
}
function Field(where, arr = [0], render = true) {
  // отрисовка игрового поля
  where.innerHTML = "";
  for (let i = 0; i < SIZE; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < SIZE; j++) {
      let cell = document.createElement("div");
      let x = i * 10 + j;
      if (arr[x] === 1) {
        cell.dataset.state = "ship";
      } else if (arr[x] === 0) {
        cell.dataset.state = "cell";
      } else if (arr[x] === "E1") {
        cell.dataset.state = "away";
      } else if (arr[x].ship[x] === true) {
        cell.dataset.state = "hit";
      } else {
        cell.dataset.state = "cell";
      }
      cell.classList.add("cell");
      row.append(cell);
    }
    where.append(row);
  }
  where.classList.add("bg");
}
function Control(where) {
  // кнопки управления
  const isValid = permitted();
  let template = "";
  if (screenField <= 1) {
    template = `
  <div class="btns">
  <button id="close" class="btn btn-text">Завершить игру</button>
  <button ${
    !isValid ? "disabled" : ""
  } id="next" class="btn btn-text">Дальше</button>
  </div>
`;
  } else {
    template = `
  <div class="btns">
  <button id="close" class="btn btn-text">Завершить игру</button>
  
  </div>
`;
  }
  const container = render(template, where, false);
  const btns = container.querySelector(".btns");
  if (screenField <= 1) {
    btnNext = btns.querySelector("#next");
    isValid
      ? btnNext.classList.remove("disabled")
      : btnNext.classList.add("disabled");
  }
  btns.addEventListener("click", hndlControl);
}
function hndlControl(event) {
  const { target } = event;
  if (target.id === "next") {
    hndlNext();
  } else if (target.id === "back") {
  } else if (target.id === "close") {
    erase();
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
function Toolbar(where, elements) {
  // панель инструментов - корабли
  const title = [
    "Игрок 1 расставляет корабли",
    "Игрок 2 расставляет корабли",
    "Ходит Игрок 1",
    "Ходит Игрок 2",
  ];
  let template = screenField<2 ? `
  <div class="header-inner">
  <span class="header-title">
  ${title[screenField]}
  </span>
  <div class="toolbar"></div>
  </div>`:
  `
  <div class="header-inner">
  <span class="header-title">
  ${title[screenField]}
  </span>
  </div>`
  const header = render(template, where, false);
  header.style.fontSize = "25px";
  if (screenField < 2) {
    const toolbar = document.querySelector(".toolbar");
    elements.map((tool, idx) => Tool(toolbar, tool, idx));
    header.style.fontSize = "18px";
  }
}
function Tool(where, tool, idx) {
  // инструмент + объект в атрибуиах
  const { img, sum, size, draggable, rotation } = tool;
  // on/off draggable element
  if (sum < 1) {
    tool.draggable = false;
  }
  const template = `
<div draggable="${tool.draggable}" id="tool${idx}" class="tool">
<img draggable="false" class="img-ship" src="${img}" alt="" 
style="transform:rotateZ(${rotation}deg)"
/>
<span class="sum">${sum}</span>
</div>`;
  const container = render(template, where);
  const item = container.querySelector(`#tool${idx}`);

  // ====подписка на события====
  item.addEventListener("dragstart", (event) => {
    // выбор фантомной копии - находится за пределами экрана и отображение
    const el = document.querySelector(`#drag${idx}`);
    // el.style.transform=`rotateZ(${tool.rotation}deg)`
    // el.style.backgroundColor='red'
    // console.log(el);
    event.dataTransfer.setDragImage(el, 15, 15);
    // устанавливаем данные перетаскивания
    // global - выбранный корабль и tool
    selectedShip = new Ship(size, sum, tool.rotation);
    selectedTool = tool;
  });

  item.addEventListener("dragend", (ev) => {
    // console.log("dragend = ", ev.target);
  });
}
function Progress(where, stP) {
  // прогресс игры
  template = `
  <div>
  <div class="st-row">
  1 x
  <img height="25px" src="./src/source/icon/1xh.svg" />
  : ${stP[1]}
</div>

<div class="st-row">
  2 x
  <img height="25px" src="./src/source/icon/2xh.svg" />
  : ${stP[2]}
</div>
</div>
<div>
<div class="st-row">
  3 x
  <img height="25px" src="./src/source/icon/3xh.svg" />
  : ${stP[3]}
</div>

<div class="st-row">
  4 x
  <img height="25px" src="./src/source/icon/4xh.svg" />
  : ${stP[4]}
</div>  
</div>
  `;
  where.innerHTML = "";
  render(template, where, false);
}
function hndlBattle(event) {
  // handler ячеек - выстрел
  const cells = event.currentTarget.querySelectorAll(".cell");
  const absId = Array.from(cells).indexOf(event.target);
  // console.log("cell = ", absId);
  if (event.currentTarget === field) {
    setFire(fieldP2Loc, field, absId);
  } else if (event.currentTarget === field2) {
    setFire(fieldP1Loc, field2, absId);
  }
}
function setFire(arrEnemy, where, pos) {
  // выстрел по полю с ячейками
  if (arrEnemy[pos] !== 0 && arrEnemy[pos] !== "E1") {
    arrEnemy[pos].hit(pos);
    onOffModal(screenField-1, "Корабль подбит", true);
    if (arrEnemy[pos].state === "kill") {
      if (screenField === 2) {
        stP1[arrEnemy[pos].size] += 1;
        win(stP1);
        onOffModal(1, "Корабль уничтожен",true);
      } else if (screenField === 3) {
        stP2[arrEnemy[pos].size] += 1;
        win(stP2);
        onOffModal(2, "Корабль уничтожен",true);
      }
    }
  } else if (arrEnemy[pos] === "E1") {
    onOffModal(screenField-1, "В эту позицию уже стреляли, каллибровка",true);
  } else {
    // мимо
    onOffModal(screenField-1, "Мимо, перезаряжаюсь",true);
    arrEnemy[pos] = "E1";
    screenField === 3 ? screenField-- : screenField++;
  }
  // перерисовка
  initGame(screenField);
  
}



// устанавливаем данные перетаскивания Drag&Drop ev.dataTransfer
// let dt = ev.dataTransfer
// dt.setData("ship", JSON.stringify(new Ship(tool.size)))
// dt.setData("tool", JSON.stringify(tool))
// в другом месте получаем данные перетаскивания
// передаваемые данные при
// let ship = JSON.parse(ev.dataTransfer.getData("ship"));
// let tool = JSON.parse(ev.dataTransfer.getData("tool"));
