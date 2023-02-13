const login = document.querySelector(".login");
const field = document.querySelector(".field");
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
let arrField = new Array(SIZE).fill(new Array(SIZE).fill(state.cell));
console.log(arrField);

// комопненты
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
      Field(field,arrField)
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
      cell.dataset.state = 'cell'
      cell.classList.add("cell");
      row.append(cell);
    }
    element.append(row);
  }
  if (render) {
  }
};
// панель инструментов - корабли
const Toolbar = (element,render=true)=>{

}
const Tool = ()=>{

}
// вызов программы
Login(login);
