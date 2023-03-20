let currUser
// Настройки
let setSize = 10
let setCountFox = 8
let setTimeRound = 0

// отрисовка игрового поля
function Field(where, arr = [0], show = false, render = true) {
  // отрисовка игрового поля
  where.innerHTML = ""
  for (let i = 0; i < setSize; i++) {
    let row = document.createElement("div")
    row.classList.add("row")
    for (let j = 0; j < setSize; j++) {
      let cell = document.createElement("div")
      let x = i * setSize + j
      // if (arr[x] === 1 || (show && typeof arr[x] === "object")) {
      //   cell.dataset.state = "ship";
      // } else if (arr[x] === 0) {
      //   cell.dataset.state = "cell";
      // } else if (arr[x] === "E1") {
      //   cell.dataset.state = "away";
      // } else if (arr[x].ship[x] === true) {
      //   if (arr[x].state === "kill") {
      //     cell.dataset.state = "destroy";
      //   } else {
      //     cell.dataset.state = "hit";
      //   }
      // } else {
      //   cell.dataset.state = "cell";
      // }
      //   cell.innerText = x
      cell.dataset.state = "cell"
      cell.classList.add("cell")
      row.append(cell)
    }
    where.append(row)
  }
  where.classList.add("bg")
}
// пеленгатор позиции
function dirFinder(numbCell) {
  const row = Math.trunc(numbCell / setSize)
  const col = numbCell - setSize * row
  const arrRow = []
  const arrCol = []
  const diagM = []
  const diagS = []
  let totalDF = []
  let length, start
  let length2, start2

  for (let i = 0; i < setSize; i++) {
    arrRow.push(row * setSize + i)
    arrCol.push(col + setSize * i)
  }
  // побочная диагональ - проведённая из лев ниж угла матрицы в прав верх
  if (row + col <= 9) {
    length = row + col + 1
    start = setSize * (row + col)
  } else if (row + col >= 10) {
    length = 20 - 1 - row - col
    start = 90 + (row + col + 1) - setSize
  }
  for (let i = 0; i < length; i++) {
    diagS.push(start - i * 9)
  }
  // главная диагональ - проведённая из лев верх угла матрицы в прав ниж
  if (row > col) {
    start2 = (row - col) * 10
    length2 = setSize - (row - col)
  } else if (col > row) {
    start2 = col - row
    length2 = setSize - (col - row)
  } else if (row === col) {
    start2 = 0
    length2 = 10
  }
  for (let i = 0; i < length2; i++) {
    diagM.push(start2 + i * 11)
  }
  totalDF = [...arrRow, ...arrCol, ...diagM, ...diagS]
  console.log("axis = ", totalDF)
  return { totalDF, arrRow, arrCol, diagM, diagS }
}
// определение  кол-ва лис на осях
function detFoxOnAxis(arr, arrFox) {
  let count = 0
  arrFox.forEach((val, idx) => {
    if (arr.includes(val.pos) && !val.catch) {
      count += val.fox
    }
  })
  return count
}
// отрисовка цифр пеленгатора
function digitRender(cells, abs, num) {
  eraseDF(cells)
  cells[abs].innerText = num
}
// отрисовка пеленгатора
function dfRender(cells, arrDF) {
  eraseDF(cells)
  arrDF.forEach((element) => {
    if (cells[element].dataset.state === "cell") {
      cells[element].dataset.state = "df"
    }
  })
}

// очистка пеленгатора
function eraseDF(cells) {
  cells.forEach((cell) => {
    if (cell.dataset.state === "df") {
      cell.dataset.state = "cell"
      cell.innerText = ""
    }
  })
}
// генерация лис
function generationP(fox = 8) {
  let arr = []
  for (let i = 0; i < setSize * setSize; i++) {
    arr.push(0)
  }
  for (let i = 0; i < fox; i++) {
    rdmNum = Math.trunc(Math.random() * 101)
    newPos = rdmNum > 99 ? 99 : rdmNum
    if (typeof arr[newPos] === "object") {
      arr[newPos].fox += 1
    } else {
      arr[newPos] = { fox: 1, catch: false, pos: newPos }
    }
  }
  const arrFox = arr.filter((val, idx) => typeof val === "object")
  return { arr, arrFox }
}
// поймать лиса
function catchFox(arr,arrFox, pos) {
  if (typeof arr[pos] === "object") {
    arr[pos].catch = true
  }
  arrFox.forEach((val)=>{
    if (val.pos===pos){
      val.catch=true
    }
  })
  obj={arr, arrFox}
  return {arr, arrFox}
}
// подсчет пойманных лисов, кол-во ходов, прошедшее время
function countCatch(arrFox) {
  let catchFox = 0
  arrFox.forEach((val, idx) => {
    if (val.catch === true) {
      catchFox += val.fox
    }
  })
  return catchFox
}
// отрисовка лис
function foxRender(cells, arrFox) {
  arrFox.forEach((element) => {
    if (element.catch === true) {
      cells[element.pos].dataset.state = "hit"
      cells[element.pos].innerText = element.fox
    }
  })
}
// callback timer
function elapsed(where,startTime) {
  elapsedTime = Math.trunc((new Date() - startTime) / 1000)
  where.innerText = elapsedTime + "s"
}
// list rooms - список комнат
function renderRooms(where, item, idx) {
  const { game, user } = item
  let template = `
  <div class="item">
    <div class="left">
      <span class="number"> ${idx}. </span>
      <span class="name"> ${game} </span>
      <span class="user"> ${user} </span>
      </div>
    <div class="right">
      <button id="${game}" name="connect" class="btn-text2"> Войти </button>
    </div>
  </div>
  `
  where.innerHTML += template
}


