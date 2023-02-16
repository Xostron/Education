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

let arrField = []
let r = Array(SIZE).fill(0)
for (let i = 0; i < SIZE; i++) {
  arrField.push([...r])
}
console.log(arrField)
// подписка на события

field.addEventListener("dragenter", (ev) => {
  // отслеживание ячеек - графика
  console.log("dragenter=");
  // ev.preventDefault()
  if (ev.target !== field) {
    const cells = field.querySelectorAll(".cell");

    const absIdx = Array.from(cells).indexOf(ev.target) + 1;
    const int = Math.trunc((Array.from(cells).indexOf(ev.target) + 1) / 10);
    const rltIdx = absIdx - int * 10 === 0 ? 10 : absIdx - int * 10;
    const sizeRow = 10;

    arrField[int][rltIdx-1] = 1;
    console.log(arrField, int, rltIdx - 1, arrField[int]);
    // очистка ячеек
    // cells.forEach((cell, idx) => {
    //   if (cell.dataset.state !== "cell"){
    //   }
    // });
    Field(field, arrField)
    // field.innerHTML=''
    // for (let i = 0; i < arrField.length; i++) {
    //   let row = document.createElement("div");
    //   row.classList.add("row");
    //   for (let j = 0; j < arrField[0].length; j++) {
    //     let cell = document.createElement("div");
    //     if(arrField[i][j]===1){
    //       cell.dataset.state = "ship";
    //     }else{
    //       cell.dataset.state = "cell";
    //     }

    //     cell.classList.add("cell");
    //     row.append(cell);
    //   }
    //   field.append(row);
    // }
    // field.classList.add("bg");
    // подкрашивание выбранных ячеек
    // if (rltIdx + selected.size - 1 <= sizeRow) {
    //   let shipCell = Array.from(cells).slice(absIdx - 1, absIdx + selected.size - 1);
    //   shipCell.forEach((cell) => {
    //     cell.dataset.state = "ship";
    //   });
    // }
  }
});

field.addEventListener("dragover", (ev) => {
  // разрешаем сбрасывать элементы в ячейки
  if (ev.target !== field) {
    ev.preventDefault();
  }
});

field.addEventListener("drop", (ev) => {
  // передаваемые данные при
  let a = JSON.parse(ev.dataTransfer.getData("ship"));
  console.log("field drop = ", ev.dataTransfer, a);
});

// вызов программы
Login(login);
tools.map((val, idx) => DragEl(val, idx, phantom));
