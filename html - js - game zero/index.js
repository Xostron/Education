// все ячейки
const cells = document.querySelectorAll(".cell");
// комбинации
const combination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]
// подписка на click для всех ячеек
cells.forEach((cell, idx) => {
  cell.addEventListener("click", () => handlerCell(cell, idx));
});

let count = 0;

function handlerCell(cell, idx) {
  // занята ли ячейка
  if (cell.classList.length > 2) {
    return;
  }

  // крестик - четные или нолик - нечетные
  // крестик
  if (count % 2 === 0) {
    cell.classList.remove("cell__0");
    cell.classList.add("cell__x");
  }
  // нолик
  else {
    cell.classList.remove("cell__x");
    cell.classList.add("cell__0");
  }
  count++;
  console.log(count);
  // проверка выйгрыша хода
  win();
  end()
}

// проверка выйгрыша хода
function win() {
  if (count < 5) {
    return;
  }
//   console.log("win?");
  for (const combi of combination) {
    // console.log(combi[0], combi[1], combi[2])
    // console.log(cells[combi[0]].className,cells[combi[1]].className,cells[combi[2]].className)
    if (cells[combi[0]].className === cells[combi[1]].className &&
        cells[combi[0]].className === cells[combi[2]].className){
            if (cells[combi[0]].className === 'cell cell__empty cell__0'){
                alert("Нолики is WIN")
            }
            else if (cells[combi[0]].className === 'cell cell__empty cell__x'){
                alert("Крестики is WIN")
            }
            
            // cells.forEach((cell,idx)=>{cell.removeEventListener('click', ()=>handlerCell(cell,idx))})
            
        }
  }
// combination.forEach((combi =>{
//     console.log(combi)
// console.log(cells[combi[0]])
// }))

}

// конец игры
function end(type=''){
    if (count===9) {
        console.log('конец игры - ничья')
    }
    if (type==='x') {
        console.log('конец игры - победили крестики')
    }
    if (type === '0'){
        console.log('конец игры - победили нолики')
    }
}


// перезагрузить игру 
function reload(){
    console.log('reload')
    cells.forEach(cell=>{
cell.classList.remove('cell__x')
cell.classList.remove('cell__0')
count = 0
    })
}