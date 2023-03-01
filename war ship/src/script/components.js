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
function Login(where, type=1,display = true) {
  // окно логина
  let template=''
  if (type===1){
    template =`
    <span class="login-title">Морской бой</span>
    <span class="login-subtitle">Выберите режим:</span>
    <button id="single" class="btn btn-text">Одиночный </button>
    <button id="pair" class="btn btn-text">2 x Игрока</button>
    `
  }else if(type===2){
    template = `
    <span class="login-title">Морской бой</span>
    <span class="login-subtitle"> Введите имя:</span>
    <div class="login-input">
    <input class="input" type="text" id="in1" placeholder="Игрок 1"/>
    </div>
    <button id="play" class="btn btn-text">В БОЙ!</button>
    <div class="blur"></div>
    `;
  }else if(type===3){
    template = `
    <span class="login-title">Морской бой</span>
    <span class="login-subtitle"> 1 на 1</span>
    <div class="login-input">
    <input class="input" type="text" id="in1" placeholder="Игрок 1"/>
    </div>
    <div class="login-input">
    <input class="input" type="text" id="in2" placeholder="Игрок 2"/>
    </div>
    <button id="play" class="btn btn-text">В БОЙ!</button>
    <div class="blur"></div>
    `;
  }
  
  if (display) {
    where.classList.remove('hide')
    render(template, where, false)
if (type===1){
const single = where.querySelector("#single")
const pair = where.querySelector("#pair")
// ====подписка на события====
single.addEventListener("click", () => {
  Login(login,2)
});
pair.addEventListener("click", () => {
  Login(login,3)
});
}else if (type===2){
  const play = where.querySelector("#play");
  const in1 = where.querySelector("#in1");
  // ====подписка на события====
 play.addEventListener("click", () => {
    hndlLoginStart(in1);
  });
}else if (type===3){
  const play = where.querySelector("#play");
  const in1 = where.querySelector("#in1");
  const in2 = where.querySelector("#in2");
  // ====подписка на события====
 play.addEventListener("click", () => {
    hndlLoginStart(in1, in2);
  });
}

  }else{
    where.classList.add('hide')
    render("", where, false);
  }
}
function Field(where, arr = [0], show = false, render = true) {
  // отрисовка игрового поля
  where.innerHTML = "";
  for (let i = 0; i < SIZE; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < SIZE; j++) {
      let cell = document.createElement("div");
      let x = i * 10 + j;
      if (arr[x] === 1 || (show && typeof arr[x] === "object")) {
        cell.dataset.state = "ship";
      } else if (arr[x] === 0) {
        cell.dataset.state = "cell";
      } else if (arr[x] === "E1") {
        cell.dataset.state = "away";
      } else if (arr[x].ship[x] === true) {
        if (arr[x].state === "kill") {
          cell.dataset.state = "destroy";
        } else {
          cell.dataset.state = "hit";
        }
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
  const isValidB = permitted(true);
  let template = "";
  if (screenField === 0) {
    template = `
  <div class="btns">
  <div class="btns-row">
  <button id="clear" class="btn btn-text">Очистить</button>
  <button 
  ${isValidB ? "": "disabled"} 
  id="stepB" 
  class="btn btn-text">
  Шаг назад
  </button>
  <button id="alocn" class="btn btn-text">Автораспределение</button>
  </div>
  <div class="btns-row">
  <button 
  ${isValid ? "" : "disabled"} 
  id="next" 
  class="btn btn-text">
  ${mode===1? "Играть":"Дальше"}
  </button>
  </div>
  </div>
`;
  } else if (screenField === 1) {
    template = `
  <div class="btns">
  <div class="btns-row">
  <button id="clear" class="btn btn-text">Очистить</button>
  <button ${isValidB ? "": "disabled"}  id="stepB" class="btn btn-text">Шаг назад</button>
  <button id="alocn" class="btn btn-text">Автораспределение</button>
  </div>
  <div class="btns-row">
  <button id="back" class="btn btn-text">Назад</button>
  <button 
  ${isValid ? "" : "disabled"} 
  id="next" 
  class="btn btn-text">
  Дальше
  </button>
  </div>
  </div>
`;
  } else if (screenField === 2 || screenField === 3) {
    template = `
    <div class="btns">
    <button id="close" class="btn btn-text">Повторить</button>
    <button id="close" class="btn btn-text">Выйти</button>
    </div>
  `;
  }
  const container = render(template, where, false);
  const btns = container.querySelector(".btns");
  // валидация кнопки "Дальше"
  if (screenField <= 1) {
    const btnNext = btns.querySelector("#next");
    isValid
      ? btnNext.classList.remove("disabled")
      : btnNext.classList.add("disabled");

    const btnStepB = btns.querySelector("#stepB");
    isValidB
      ? btnStepB.classList.remove("disabled")
      : btnStepB.classList.add("disabled");
  }
  // подписка на события
  btns.addEventListener("click", hndlControl);
}
function Toolbar(where, elements) {
  // панель инструментов - корабли
  const title = [
    "Игрок 1 расставляет корабли",
    "Игрок 2 расставляет корабли",
    "Ходит Игрок 1",
    "Ходит Игрок 2",
  ];
  let template =
    screenField < 2
      ? `
  <div class="header-inner">
  <span class="header-title">
  ${title[screenField]}
  </span>
  <div class="toolbar"></div>
  </div>`
      : `
  <div class="header-inner">
  <span class="header-title">
  ${title[screenField]}
  </span>
  </div>`;
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
  const style = ["tool"];
  const styleImg = ["img-ship"];
  tool.draggable = true;
  if (sum < 1) {
    tool.draggable = false;
    style.push("off");
    styleImg.push("off");
  }
  const template = `
<div draggable="${tool.draggable}" id="tool${idx}" class="${style.join(" ")}">
<img id="tool${idx}" draggable="false" class="${styleImg.join(
    " "
  )}" src="${img}" alt="" 
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
function Progress(where, stP, arrShipBattle) {
  const ships = {};
  shipP1Battle.forEach((element) => {
    if (ships[element.size] === undefined) {
      ships[element.size] = 0;
    }
    ships[element.size] += 1;
  });

  console.log("PROGRESS = ", ships);
  // прогресс игры
  template = `
  <div>
  <div class="st-row">
  <img height="25px" src="./src/source/icon/1xh.svg" />
  ${ships[1]} : ${stP[1]}
</div>

<div class="st-row">
  <img height="25px" src="./src/source/icon/2xh.svg" />
  ${ships[2]} : ${stP[2]}
</div>
</div>
<div>
<div class="st-row">
  <img height="25px" src="./src/source/icon/3xh.svg" />
  ${ships[3]} : ${stP[3]}
</div>

<div class="st-row">
  <img height="25px" src="./src/source/icon/4xh.svg" />
  ${ships[4]} : ${stP[4]}
</div>
Количество промахов: ${stP.amount}  
</div>
  `;
  where.innerHTML = "";
  render(template, where, false);
}

// устанавливаем данные перетаскивания Drag&Drop ev.dataTransfer
// let dt = ev.dataTransfer
// dt.setData("ship", JSON.stringify(new Ship(tool.size)))
// dt.setData("tool", JSON.stringify(tool))
// в другом месте получаем данные перетаскивания
// передаваемые данные при
// let ship = JSON.parse(ev.dataTransfer.getData("ship"));
// let tool = JSON.parse(ev.dataTransfer.getData("tool"));
