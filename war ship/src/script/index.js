const login = document.querySelector(".login");
let player1,
  player2 = "";

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
    });
  }
};










// точка входа 
Login(login);
