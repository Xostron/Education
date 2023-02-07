// все ячейки
const cells = document.querySelectorAll(".cell");
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

// объект для подписки и отписки события click ячейки
const objectsEvents = [];
cells.forEach((cell, idx) => {
  objectsEvents.push({
    handleEvent: handlerCell,
    cell,
    idx,
  });
});

// подписка на click для всех ячеек
cells.forEach((cell, idx) => {
  cell.addEventListener("click", objectsEvents[idx]);
});

// обработка события click ячейки
function handlerCell() {
  // занята ли ячейка
  if (this.cell.classList.length > 2) {
    return;
  }
  // Очередность хода - крестик:четные или нолик:нечетные
  // крестик
  if (count % 2 === 0) {
    this.cell.classList.remove("cell__0");
    this.cell.classList.add("cell__x");
  }
  // нолик
  else {
    this.cell.classList.remove("cell__x");
    this.cell.classList.add("cell__0");
  }
  count++;
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
        winner = "нолики";
        console.log("Нолики is WIN");
      } else if (cells[combi[0]].className === "cell cell__empty cell__x") {
        console.log("Крестики is WIN");
        winner = "крестики";
      }
      // не отписывается событие от кнопки? не отписывалась потому что
      // каждый раз указывался объект не имеющий ссылки
      console.log("delete callback");
      cells.forEach((cell, idx) => {
        cell.removeEventListener("click", objectsEvents[idx]);
      });
    }
  }
}

// конец игры
function end(type = "") {
  if (count === 9) {
    console.log("конец игры - ничья");
  }
}

// кнопка перезагрузить игру
function handlerReload() {
  console.log("reload");
  cells.forEach((cell) => {
    cell.classList.remove("cell__x");
    cell.classList.remove("cell__0");
    count = 0;
    winner = "";
    // подписка на click для всех ячеек
    cells.forEach((cell, idx) => {
      cell.addEventListener("click", objectsEvents[idx]);
    });
  });
}
