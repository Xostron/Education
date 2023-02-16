const login = document.querySelector(".login");
const field = document.querySelector(".field");
const header = document.querySelector(".header");
const phantom = document.querySelector(".phantom");

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

// подписка на события
field.addEventListener("dragenter", (ev) => {
  console.log("field dragenter = ", selected);

  const cells = field.querySelectorAll(".cell");

  const absIdx = Array.from(cells).indexOf(ev.target) + 1;
  let int = Math.trunc((Array.from(cells).indexOf(ev.target) + 1) / 10)
  const rltIdx =
    absIdx - (int* 10);
  const sizeRow = 10;
  // очистка ячеек
  cells.forEach((cell, idx) => {
    cell.dataset.state = "cell";
  });
  // подкрашивание выбранных ячеек
  if (rltIdx + selected.size - 1 <= sizeRow) {
    let arr = Array.from(cells).slice(absIdx - 1, absIdx + selected.size - 1);
    console.log("slice", arr, absIdx, rltIdx, (rltIdx + selected.size - 1 ));
    arr.forEach((val) => {
      val.dataset.state = "ship";
    });
  }
});

field.addEventListener("dragover", (ev) => {
  // разрешаем сбрасывать элементы в ячейки
  if (ev.target !== ev.currentTarget) {
    ev.preventDefault();
  }
});

field.addEventListener("drop", (ev) => {
  let a = JSON.parse(ev.dataTransfer.getData("ship"));
  console.log("field drop = ", ev.dataTransfer, a);
});

// вызов программы
Login(login);
tools.map((val, idx) => DragEl(val, idx, phantom));
