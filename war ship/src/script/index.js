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
  {
    img: "./src/source/icon/1xh.svg",
    sum: 0,
    name: "",
  },
  {
    img: "./src/source/icon/2xh.svg",
    sum: 0,
    name: "",
  },
  {
    img: "./src/source/icon/3xh.svg",
    sum: 0,
    name: "",
  },
  {
    img: "./src/source/icon/4xh.svg",
    sum: 0,
    name: "",
  },
  {
    img: "./src/source/icon/5xh.svg",
    sum: 0,
    name: "",
  },
];
let arrField = new Array(SIZE).fill(new Array(SIZE).fill(state.cell));
console.log(arrField);

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
      console.log("input = ", player1, player2);
      Login(login, false);
      Field(field, arrField);
      Toolbar(header);
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
const Toolbar = (element, render = true) => {
  let template = `
<div class="header-inner">
<span>Расположите корабли на поле</span>
<div class="toolbar"></div>
  `;
  element.innerHTML = template;
  const toolbar = document.querySelector(".toolbar");
  tools.map((tool) => Tool(toolbar, tool));
};
const Tool = (where, tool) => {
  const { img, sum, name } = tool;
  console.log("tool = ", img);
  const template = `
<div class="tool">
<img
  class="img-ship"
  height="15px"
  src="${img}"
  alt=""
/>
<span class="sum">${sum}</span>
</div>
`;
  const fragment = document.createElement("div");
  fragment.innerHTML = template;
  where.append(fragment);
};

// вызов программы
Login(login);

class Ship {
  constructor(img, sum, size) {
    this.img = img;
    this.sum = sum;
    this.size = size;
  }
  render(where, tool) {
    where.innerHTML = "";
    Tool(where, tool);
  }
}

let a = new Ship("./src/source/icon/5xh.svg", 5, 1);
const where = document.querySelector(".where");
a.render(where,a);

setInterval(()=>{
a.sum=a.sum-1
console.log(a.sum)
a.render(where,a);
},2000)
