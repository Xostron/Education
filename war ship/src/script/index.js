const login = document.querySelector(".login");
const field = document.querySelector(".field");
const header = document.querySelector(".header");
let player1,
  player2 = "";
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
let arrField = new Array(SIZE).fill(new Array(SIZE).fill(state.cell));

// компоненты
// окно логина
const Login = (element, render = true) => {
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
  element.innerHTML = render ? template : "";
  if (render) {
    const hndlStart = element.querySelector(".btn-text");
    const in1 = element.querySelector("#in1");
    const in2 = element.querySelector("#in2");
    hndlStart.addEventListener("click", () => {
      player1 = in1.value ? in1.value : "Игрок 1";
      player2 = in2.value ? in2.value : "Игрок 2";
      Login(login, false);
      Field(field, arrField);
      Toolbar(header, tools);
    });
  }
};
// игровое поле
const Field = (element, arr = [[0]], render = true) => {
  for (let i = 0; i < arr.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < arr[0].length; j++) {
      let cell = document.createElement("div");
      cell.dataset.state = "cell";
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
  `;
  where.innerHTML = template;
  const toolbar = document.querySelector(".toolbar");
  elements.map((tool, idx) => Tool(toolbar, tool, idx));
};

const Tool = (where, tool, idx) => {
  const { img, sum } = tool;
  const template = `
<div draggable="true" id="btn${idx}" class="tool">
<img
  class="img-ship"
  src="${img}"
  alt=""
/>
<span class="sum">${sum}</span>
</div>
`;
  const fragment = document.createElement("div");
  fragment.innerHTML = template;
  const item = fragment.querySelector(`#btn${idx}`);
  const icon = fragment.querySelector(".img-ship");
  // icon.classList.add('selected-icon')
  where.append(fragment);
  // ====подписка на события====
  item.addEventListener("click", () => {
    tool.sub();
  });

  item.addEventListener("dragstart", (ev) => {
    let img2 = document.createElement("div");
    let temp = `<img
    src="${img}"
    height="29"
    
  />`
    img2.classList.add('selected-icon')
    img2.innerHTML = temp
    // img2.src = img;
    // img2.height = "30";
    // img2.width=30*(idx+1)+1
    
field.append(img2)

    // ev.dataTransfer.dropEffect = "move";
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setDragImage(img2, 15, 15);
    console.log(img2, ev.dataTransfer);
  });

  item.addEventListener("dragend", (ev) => {});
};

// вызов программы
Login(login);


