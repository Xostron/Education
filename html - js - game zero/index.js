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
// текущее время
let strCurrTime = "";

// флаг winner
let winner = "";
// счетчик побед
let countWin1 = 0;
let countWin2 = 0;
// имена игроков
let player1 = "Игрок 1";
let player2 = "Игрок 2";
// счетчик ходов
let count = 0;
// статус ходов
let goesPlayer = "";
// время
let nowTime = "";
let thenTime = "";
let elapsed = "";
// сохранение в LocalStorage
let dataPlayers = {};
// экраны
const screens = document.querySelectorAll("#screen");
managerScreen(screens, "intro");
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
const popup = document.querySelector("#popup");
const tBtnPopup = popup.querySelector(".popup_btn");
// intro - ввод имен
const intro = document.querySelector(".intro");
const startBtn = intro.querySelector(".button_intro");
const inPl1 = intro.querySelector("#player1");
const inPl2 = intro.querySelector("#player2");
// статус хода
const statusPlayer = document.querySelector(".status");
// текущее время
const ctTime = document.querySelector(".ct_time");
const ctDate = document.querySelector(".ct_date");
// топ игроков
let players = [];
// Формирование топ игроков
const table = document.querySelector(".top__table");
let component = new DocumentFragment();
// ===============Подписки===============
// обработчик ячеек - делегирование событий
game.addEventListener("click", hndlCell);
// intro - кнопка начать игру
startBtn.addEventListener("click", hndlStart);
// кнопка рестарт на поле
iBtnRestart.addEventListener("click", hndlReload);
iBtnClose.addEventListener("click", hndlClose);
// кнопка рестарт на всплывающем окне
tBtnPopup.addEventListener("click", hndlReload);
window.addEventListener("DOMContentLoaded", () => {
  const dataPlayers = getLS("top-list");
  if (dataPlayers) {
    players.push(...dataPlayers);
    renderTopPlayers();
  }
});
// Обновление времени
const intervalCurrTime = setInterval(getCurrentTime, 1000);
// ===============Handlers===============
// Пуск игры - экран intro
function hndlStart(e) {
  player1 = inPl1.value ? inPl1.value : "Игрок 1";
  player2 = inPl2.value ? inPl2.value : "Игрок 2";
  init();
  managerScreen(screens, "wrapper");
  const objPlayer1 = {
    lvl: 0,
    name: player1,
    score: 0,
  };
  const objPlayer2 = {
    lvl: 0,
    name: player2,
    score: 0,
  };
  console.log("aaaa", players);
  players.push(objPlayer1);
  players.push(objPlayer2);
  console.log("start", players);
  setLS(players);
  renderTopPlayers();
}
// кнопки - крестики-нолики - экран игровое поле
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
// перезагрузить игру
function hndlReload() {
  callPopup(winner);
  init();
}
// выйти из игры - экран игровое поле
function hndlClose() {
  managerScreen(screens, "intro");
  inPl1.value = "";
  inPl2.value = "";
  countWin1 = 0;
  countWin2 = 0;
  init();
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
        countWin2++;
      } else if (cells[combi[0]].className === "cell cell_x") {
        winner = `${player1} - выйграл(а)!`;
        countWin1++;
      } else {
        return;
      }
      RateWin(rate1, player1, countWin1);
      RateWin(rate2, player2, countWin2, 2);
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
  winner = "";
  goesPlayer = `<span number="${1}" class="rate__player">Ходит ${player1}: X </span>`;
  statusPlayer.innerHTML = goesPlayer;
  popup.classList.remove("popup_active");
  // очистка ячеек
  cells.forEach((cell) => {
    cell.classList.remove("cell_x");
    cell.classList.remove("cell_0");
    cell.innerHTML = "";
  });
  RateWin(rate1, player1, countWin1);
  RateWin(rate2, player2, countWin2, 2);
  game.removeEventListener("click", hndlCell);
  game.addEventListener("click", hndlCell);
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
  goesPlayer = `<span number="${type === "x" ? "2" : "1"}" class="rate__player">
  Ходит ${type === "x" ? player2 : player1}: ${type === "x" ? "0" : "X"}`;
  statusPlayer.innerHTML = goesPlayer;
  element.innerHTML = `${type.toUpperCase()}`;
}
function RateWin(element, player, countWin, num = 1) {
  let strRate = `<span number="${num}" class="rate__player">${player}</span>
          <span>Победы:</span>
          <span number="${num}" class="rate__count">${countWin}</span>`;

  element.innerHTML = strRate;
}
// менеджер экранов - переключение видимости
function managerScreen(screens, selector = "") {
  for (const screen of screens) {
    if (screen.classList[0] === selector || selector === "") {
      screen.classList.remove("hidden");
    } else {
      screen.classList.add("hidden");
    }
  }
}
// текущее время
function getCurrentTime() {
  const date = new Date().toLocaleDateString("ru", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = new Date().toLocaleTimeString("ru", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  ctTime.innerHTML = time;
  ctDate.innerHTML = date;
  // console.log("time = ", date, time);
}
// Формирование топ игроков
function Component(gamer) {
  const { lvl, name, score } = gamer;
  const template = `
  <div class="top__row">
              <div id="lvl" class="top__cell">${lvl}</div>
              <div id="player" class="top__cell">${name}</div>
              <div id="score" class="top__cell">${score}</div>
            </div>
  `;
  const element = document.createElement("div");
  element.innerHTML = template;
  component.append(element);
}
function renderTopPlayers() {
  const sorted = players.sort().slice(0, 10);
  table.innerHTML=''
  sorted.map((player) => {
    Component(player);
    table.append(component);
  });
}

// сохранение в LocalStorage
function getLS(key) {
  dataPlayers = localStorage.getItem(key);
  console.log("json", dataPlayers);
  return JSON.parse(dataPlayers);
}
// Чтение из LocalStorage
function setLS(players) {
  localStorage.setItem("top-list", JSON.stringify(players));
}



















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
