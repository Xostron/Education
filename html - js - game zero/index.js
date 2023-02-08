// игровое поле и ячейки
const wrapper = document.querySelector(".wrapper");
const game = wrapper.querySelector(".game");
const cells = game.querySelectorAll(".cell");
const iBtnRestart = game.querySelector("#restart");
const iBtnClose = game.querySelector("#close");
// рейтинг
const rate1 = wrapper.querySelector("#rate1");
const rate2 = wrapper.querySelector("#rate2");
// popup
const popup = document.querySelector(".wrapper_popup");
const tBtnPopup = popup.querySelector(".popup_btn");

// intro - ввод имен
const intro = document.querySelector(".intro");
const startBtn = intro.querySelector(".button_intro");
const inPl1 = intro.querySelector("#player1");
const inPl2 = intro.querySelector("#player2");
// имена игроков
let player1 = "Игрок 1";
let player2 = "Игрок 2";
// счетчик ходов
let count = 0;
// статус хода
const statusPlayer = document.querySelector(".status");
let goesPlayer = "";
statusPlayer.innerHTML = goesPlayer;
// комбинации
const combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
// флаг winner
let winner = "";
let countWin1 = 0;
let countWin2 = 0;
// ===============Подписки на события===============
// обработчик ячеек - делегирование событий
game.addEventListener("click", hndlCell);
// intro - кнопка начать игру
startBtn.addEventListener("click", hndlStart);
// кнопка рестарт на поле
iBtnRestart.addEventListener("click", init);
iBtnClose.addEventListener("click", hndlClose);
// кнопка рестарт на всплывающем окне
tBtnPopup.addEventListener("click", hndlReload);
// ===============Handlers===============
// обработка inputs
function hndlStart(e) {
  player1 = inPl1.value ? inPl1.value : "Игрок 1";
  player2 = inPl2.value ? inPl2.value : "Игрок 2";
  intro.classList.add("hidden");
  wrapper.classList.remove("hidden");
  init();
  let strRate = `<div>${player1}<br>Победы:${countWin1} </div>`;
  rate1.innerHTML = strRate;
  console.log("intro = ", player1, player2);
  console.log("intro2 = ", inPl1.value, inPl2.value);
}
// обработка события click ячейки
function hndlCell(event) {
  const target = event.target;

  // занята ли ячейка
  if (target.classList.length > 1 || target.classList[0] !== "cell") {
    return;
  }
  count % 2 === 0 ? changeCell(target, "x") : changeCell(target, "0");
  count++;
  // проверка выйгрыша хода
  win();
}
// кнопка перезагрузить игру
function hndlReload() {
  // закрыть всплывающее окно
  callPopup(winner);
  init();
}
function hndlClose() {
  intro.classList.remove("hidden");
  wrapper.classList.add("hidden");
  inPl1.value=''
  inPl2.value=''
  countWin1=0
  countWin2=0
}
// ============
// проверка выйгрыша хода
function win() {
  if (count < 5) {
    return;
  }
  for (const combi of combination) {
    if (
      cells[combi[0]].className === cells[combi[1]].className &&
      cells[combi[0]].className === cells[combi[2]].className
    ) {
      if (cells[combi[0]].className === "cell cell_0") {
        winner = `${player2} - выйграл(а)!`;
      } else if (cells[combi[0]].className === "cell cell_x") {
        winner = `${player1} - выйграл(а)!`;
        countWin1++;
        let strRate = `<div>${player1}<br>Победы:${countWin1} </div>`;
        rate1.innerHTML = strRate;
      } else {
        return;
      }
      // отписка от события
      game.removeEventListener("click", hndlCell);
      setTimeout(() => callPopup(winner), 100);
    }
  }
  // проверка концовки игры
  if (winner === "") {
    end();
  }
}
// конец игры
function end() {
  console.log(count);
  if (count === 9) {
    callPopup("Ничья");
  }
}
// Init
function init() {
  count = 0;
  goesPlayer = `Ходит ${player1}: X`;
  statusPlayer.innerHTML = goesPlayer;
  game.removeEventListener("click", hndlCell);
  // подписка на click для всех ячеек
  game.addEventListener("click", hndlCell);
  cells.forEach((cell) => {
    cell.classList.remove("cell_x");
    cell.classList.remove("cell_0");
    cell.innerHTML = "";
  });
  let popup = document.querySelector(".wrapper_popup");
  popup.classList.remove("popup_active");
  winner = "";
}
// вызов всплывающего окна
function callPopup(msg) {
  popup.classList.length === 1
    ? popup.classList["add"]("popup_active")
    : popup.classList["remove"]("popup_active");
  let text = document.querySelector(".popup__text");
  text.innerHTML = msg;
}
// изменение состояния ячейки
function changeCell(element, type) {
  element.classList.remove(`cell_${type.toLowerCase()}`);
  element.classList.add(`cell_${type.toLowerCase()}`);
  goesPlayer = `Ходит ${type === "x" ? player2 : player1}: ${
    type === "x" ? "0" : "X"
  }`;
  statusPlayer.innerHTML = goesPlayer;
  element.innerHTML = `${type.toUpperCase()}`;
}
function RateWin() {}
// inputs
// const inPlayer1 = document.querySelector("#player1");
// const inPlayer2 = document.querySelector("#player2");

// console.log(inPlayer1, inPlayer2);
// inPlayer1.addEventListener("change",hndlInput);
// inPlayer2.addEventListener("change",hndlInput);

// function testLoad(){
//   console.log('test = документ загружен')
// }
// function testUnload(){
//   console.log('test = exit')
// }

// событие load возбуждается сразу после того, как будут загружены и отображены
// документ и все внешние ресурсы (изображения)
// window.addEventListener('load', testLoad)
// событие unload генерируется, когда пользователь покидает страницу
// window.addEventListener('unload', testUnload)
// ================заметка подписка callback c аргументами на события===================
// // объект для подписки и отписки события click ячейки
// const objectsEvents = [];
// cells.forEach((cell, idx) => {
//   objectsEvents.push({
//     handleEvent: hndlCell,
//     cell,
//     idx,
//   });
// });
// // подписка
// cells.forEach((cell, idx) => {
//   cell.addEventListener("click", objectsEvents[idx]);
// });
// // не отписывается событие от кнопки? не отписывалась потому что
//       // каждый раз указывался объект не имеющий ссылки
//       console.log("delete callback");
//       cells.forEach((cell, idx) => {
//         cell.removeEventListener("click", objectsEvents[idx]);
//       });
