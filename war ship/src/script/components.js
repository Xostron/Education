// Global
// input field
let player1,
  player2 = "";

// функция отображения компонетов
function render(template, where, wrapper = true) {
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
// отображение фантомной копии
const DragEl = (tool, idx, where) => {
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
};
// окно логина
const Login = (where, display = true) => {
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

};
// handlers Login
function hndlLoginStart(in1, in2) {
  player1 = in1.value ? in1.value : "Игрок 1";
  player2 = in2.value ? in2.value : "Игрок 2";
  Login(login, false);
  initLocation();
}
// игровое поле
function Field(where, arr = [0], render = true) {
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
// кнопки управления
function Control(where) {
  const isValid = permitted();
  let template =''
  if (screenField<=1){
  template = `
  <div class="btns">
  <button id="close" class="btn btn-text">Завершить игру</button>
  <button ${
    !isValid ? "disabled" : ""
  } id="next" class="btn btn-text">Дальше</button>
  </div>
`;}
else{
  template = `
  <div class="btns">
  <button id="close" class="btn btn-text">Завершить игру</button>
  
  </div>
`;
}
  const container = render(template, where, false);
  const btns = container.querySelector(".btns");
  if (screenField<=1){
  btnNext = btns.querySelector("#next");
  isValid
    ? btnNext.classList.remove("disabled")
    : btnNext.classList.add("disabled");
  
}
btns.addEventListener("click", hndlControl);
}
function hndlControl(event) {
  console.log('btn@')
  const { target } = event;
  if (target.id === "next") {
    hndlNext();
  } else if (target.id === "back") {
    
  } else if (target.id === "close") {
    erase()
    Login(login);
  }
}
// кнопка next
function hndlNext() {
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
// панель инструментов - корабли
const Toolbar = (where, elements) => {
  const title = [
    "Игрок 1 расставляет корабли",
    "Игрок 2 расставляет корабли",
    "Ходит Игрок 1",
    "Ходит Игрок 2",
  ];
  let template = `
  <div class="header-inner">
  <span class="header-title">
  ${title[screenField]}
  </span>
  <div class="toolbar"></div>
  </div>`;
  const header = render(template, where, false);
  header.style.fontSize = "25px";
  if (screenField < 2) {
    const toolbar = document.querySelector(".toolbar");
    elements.map((tool, idx) => Tool(toolbar, tool, idx));
    header.style.fontSize = "18px";
  }
};
// инструмент + объект в атрибуиах
const Tool = (where, tool, idx) => {
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
};
// прогресс игры
function Progress(where, stP) {
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
// init field для расположения
function initLocation(side = "left") {
  tools = [
    new shipCard(1, 1),
    new shipCard(2, 1),
    new shipCard(3, 1),
    new shipCard(4, 1),
    // new shipCard(5, 1),
  ];
  fieldTemp = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    fieldTemp.push(0);
  }

  Field(field, fieldTemp);
  if (side === "left") {
    field.classList.add("left");
    field.classList.remove("right");
  } else {
    field.classList.remove("left");
    field.classList.add("right");
  }
  Control(btns);
  game.classList.remove("hide");
  Toolbar(header, tools);

  const drag_el = document.querySelectorAll(`.drag-el`);
  // console.log(drag_el)
  drag_el.forEach((val)=>{
    val.style.flexDirection = "row"
    const phantomCell = val.querySelector(".cell");
    const phantomImg = phantomCell.querySelector(".cell");
    phantomImg.style.transform = `rotateZ(0deg)`;
  })
  
  
}
// init field для игры
function initGame(screenField) {
  field.classList.remove("left");
  field.classList.remove("right");
  Toolbar(header, tools);
  Field(field, fieldP2Loc);
  Field(field2, fieldP1Loc);
  Progress(st1, stP1);
  Progress(st2, stP2);
  if (screenField === 2) {
    field.style.opacity = "1";
    field2.style.opacity = "0.4";
    st1.style.opacity = "1";
    st2.style.opacity = "0.4";
    field.addEventListener("click", hndlBattle);
    field2.removeEventListener("click", hndlBattle);
  } else if (screenField === 3) {
    field.style.opacity = ".4";
    field2.style.opacity = "1";
    st1.style.opacity = ".4";
    st2.style.opacity = "1";
    field2.addEventListener("click", hndlBattle);
    field.removeEventListener("click", hndlBattle);
  }
  Control(btns);
}
// handler игры - выстрел
function hndlBattle(event) {
  // console.log('BATTLE = ',event,event.target)
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
  if (arrEnemy[pos] !== 0 && arrEnemy[pos] !== "E1") {
    arrEnemy[pos].hit(pos);
    if (arrEnemy[pos].state === "kill") {
      if (screenField === 2) {
        stP1[arrEnemy[pos].size] += 1;
        win(stP1)
      } else if (screenField === 3) {
        stP2[arrEnemy[pos].size] += 1;
        win(stP2)
      }
    }
  } else if (arrEnemy[pos] === "E1") {
  } else {
    // мимо
    arrEnemy[pos] = "E1";
    screenField === 3 ? screenField-- : screenField++;
  }
  initGame(screenField);
  // Field(where, arrEnemy);
  // console.log("ship hit", fieldP1Loc, fieldP2Loc);
}

// устанавливаем данные перетаскивания Drag&Drop ev.dataTransfer
// let dt = ev.dataTransfer
// dt.setData("ship", JSON.stringify(new Ship(tool.size)))
// dt.setData("tool", JSON.stringify(tool))
// в другом месте получаем данные перетаскивания
// передаваемые данные при
// let ship = JSON.parse(ev.dataTransfer.getData("ship"));
// let tool = JSON.parse(ev.dataTransfer.getData("tool"));
function erase(){
  field.innerHTML=""
  field.classList.remove("left")
  field.classList.remove("right")
  field.classList.remove("bg")

  field2.innerHTML=""
  // cells.innerHTML=""
  header.innerHTML=""
  // phantom.innerHTML=""
  // game.innerHTML=""
  btns.innerHTML=""
  st1.innerHTML=""
  st2.innerHTML=""
  tools = [
    new shipCard(1, 1),
    new shipCard(2, 1),
    new shipCard(3, 1),
    new shipCard(4, 1),
    // new shipCard(5, 1),
  ];
  fieldTemp = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    fieldTemp.push(0);
  }
  screenField=0
  stP1 = {
    1:0,
    2:0,
    3:0,
    4:0
  }
  stP2 = {
    1:0,
    2:0,
    3:0,
    4:0
  }
fieldP1Loc = [];
fieldP2Loc = [];
shipP1Battle = [];
shipP2Battle = [];
fieldTemp = [];
}

function win(stP){
let summ = stP[1]+stP[2]+stP[3]+stP[4]
let total = 0
shipP1Battle.slice(0,4).forEach(tool=>{
total+=tool.sum
})
console.log("WINNER = ", summ, total)
if (summ === total){
if (screenField===2){
  alert(`Игрок 1 - ВЫЙГРАЛ!`)
}
if (screenField===3){
  alert(`Игрок 2 - ВЫЙГРАЛ!`)
}
}
}