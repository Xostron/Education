// родитель ячеек
const field = document.querySelector(".field");
// все ячейки
const cells = document.querySelectorAll(".cell");
// input
let player1 = "Игрок 1";
let player2 = "Игрок 2";
// счетчик ходов
let count = 0;
// статус хода
const statusPlayer = document.querySelector(".status");
let goesPlayer = `Ходит ${player1}: ${count % 2 === 0 ? "X" : "0"}`;
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

// статус хода

// обработчие ячееек - делегирование событий
field.addEventListener("click", handlerCell);

// обработка события click ячейки
function handlerCell(event) {
  const target = event.target;

  // занята ли ячейка
  if (target.classList.length > 1) {
    return;
  }
  count % 2 === 0 ? changeCell(target, "x") : changeCell(target, "0");
  count++;
  statusPlayer.innerHTML = goesPlayer;
  // проверка выйгрыша хода
  win();
}
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
        winner = "Нолики - выйграли!";
      } else if (cells[combi[0]].className === "cell cell_x") {
        winner = "Крестики - выйграли!";
      } else {
        return;
      }
      // отписка от события
      field.removeEventListener("click", handlerCell);
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
// кнопка перезагрузить игру
function handlerReload() {
  // закрыть всплывающее окно
  callPopup(winner);
  init();
}
// Init
function init() {
  count = 0;
  statusPlayer.innerHTML = "Ходит 1-ый игрок: Х";
  field.removeEventListener("click", handlerCell);
  // подписка на click для всех ячеек
  field.addEventListener("click", handlerCell);
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
  let popup = document.querySelector(".wrapper_popup");
  popup.classList.length === 1
    ? popup.classList["add"]("popup_active")
    : popup.classList["remove"]("popup_active");
  let text = document.querySelector(".popup__text");
  text.innerHTML = msg;
}

function changeCell(element, type) {
  element.classList.remove(`cell_${type.toLowerCase()}`);
  element.classList.add(`cell_${type.toLowerCase()}`);
  goesPlayer = `Ходит ${player1}: ${type.toUpperCase()}`;
  element.innerHTML = `${type.toUpperCase()}`;
}

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
//     handleEvent: handlerCell,
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
