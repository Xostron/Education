// родитель ячеек
const gameField = document.querySelector(".field");
// все ячейки
const cells = document.querySelectorAll(".cell");
// статус хода
const statusPlayer = document.querySelector(".status");
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
// счетчик ходов
let count = 0;
// статус хода
let goesPlayer = "Ходит 1-ый игрок X";
statusPlayer.innerHTML = goesPlayer;
// обработчие ячееек - делегирование событий
gameField.addEventListener("click", handlerCell);

// обработка события click ячейки
function handlerCell(event) {
  const target = event.target;
  console.log(target.classList);
  // занята ли ячейка
  if (target.classList.length > 2) {
    console.log(target.classList.length > 2);
    return;
  }
  // Очередность хода - крестик:четные или нолик:нечетные
  // крестик
  if (count % 2 === 0) {
    target.classList.remove("cell__0");
    target.classList.add("cell__x");
    goesPlayer = "Ходит 2-ый игрок: 0";
    target.innerHTML = "X";
  }
  // нолик
  else {
    target.classList.remove("cell__x");
    target.classList.add("cell__0");
    target.innerHTML = "0";
    goesPlayer = "Ходит 1-ый игрок: X";
  }
  count++;
  statusPlayer.innerHTML = goesPlayer;
  console.log("handlerCell", count, this);
  // проверка выйгрыша хода
  win();
  // проверка endgame
  end();
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
      if (cells[combi[0]].className === "cell cell__empty cell__0") {
        winner = "Нолики - выйграли!";
      } else if (cells[combi[0]].className === "cell cell__empty cell__x") {
        winner = "Крестики - выйграли!";
      } else {
        return;
      }

      // отписка от события
      gameField.removeEventListener("click", handlerCell);
      setTimeout(() => callPopup(winner), 100);
      break;
    }
  }
}

// конец игры
function end() {
  if (count === 9) {
    callPopup("Ничья");
  }
}

// кнопка перезагрузить игру
function handlerReload() {
  // закрыть всплывающее окно
  callPopup(winner);

  count = 0;
  statusPlayer.innerHTML = "Ходит 1-ый игрок: Х";
  gameField.removeEventListener("click", handlerCell);
  // подписка на click для всех ячеек
  gameField.addEventListener("click", handlerCell);
  cells.forEach((cell) => {
    cell.classList.remove("cell__x");
    cell.classList.remove("cell__0");
    cell.innerHTML = "";
  });
}

// вызов всплывающего окна
function callPopup(msg) {
  let popup = document.querySelector(".wrapper_popup");
  popup.classList.length === 1
    ? popup.classList.add("popup_active")
    : popup.classList.remove("popup_active");
  let text = document.querySelector(".popup__text");
  text.innerHTML = msg;
}

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
