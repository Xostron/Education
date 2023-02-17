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
    cell.dataset.state = "ship";
    i === 0
      ? (cell.innerHTML += imgShip.front)
      : (cell.innerHTML += imgShip.middle);
    container.append(cell);
  }
  where.append(container);
};
// окно логина
const Login = (element, display = true) => {
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
  display ? render(template, element, false) : render("", element, false);
  if (display) {
    const hndlStart = element.querySelector(".btn-text");
    const in1 = element.querySelector("#in1");
    const in2 = element.querySelector("#in2");
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
  Field(field, arrField);
  Toolbar(header, tools);
}
// игровое поле
function Field(element, arr = [[0]], render = true) {
  element.innerHTML=''
  for (let i = 0; i < arr.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < arr[0].length; j++) {
      let cell = document.createElement("div");
      if(arrField[i][j]===1){
        cell.dataset.state = "ship";
      }else{
        cell.dataset.state = "cell";
      }
      cell.classList.add("cell");
      row.append(cell);
    }
    element.append(row);
  }
  element.classList.add("bg");
  if (render) {
  }
};
// панель инструментов - корабли
const Toolbar = (where, elements) => {
  let template = `
  <div class="header-inner">
  <span>Расположите корабли на поле</span>
  <div class="toolbar"></div>
  </div>`;
  render(template, where, false);
  const toolbar = document.querySelector(".toolbar");
  elements.map((tool, idx) => Tool(toolbar, tool, idx));
};
// инструменты
let selected={}

const Tool = (where, tool, idx) => {
  const { img, sum, size } = tool;
  const template = `
<div draggable="true" id="btn${idx}" class="tool">
<img class="img-ship" src="${img}" alt=""/>
<span class="sum">${sum}</span>
</div>`;
  const container = render(template, where);
  const item = container.querySelector(`#btn${idx}`);
  // ====подписка на события====
  // item.addEventListener("click", () => {
  //   tool.sub();
  // });

  item.addEventListener("dragstart", (ev) => {
    // выбор фантомной копии - находится за пределами экрана
    const el = document.querySelector(`#drag${idx}`);
    // отображение фантомной копии
    ev.dataTransfer.setDragImage(el, 15, 15);
    // устанавливаем данные перетаскивания
    let dt = ev.dataTransfer
    dt.setData("ship", JSON.stringify(new Ship(tool.size)))
    dt.setData("tool", JSON.stringify(tool))
    // global - выбранный корабль
    selected = JSON.parse(dt.getData("ship"))
  });
  item.addEventListener("dragend",(ev)=>{
    const cells = field.querySelector('.cell')
  //   if (cells.includes(ev.target)){
  //   tool.sub()
  // }
  console.log(ev.target)
  })
};
