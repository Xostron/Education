const SIZE = 10
//
// отрисовка игрового поля
function Field(where, arr = [0], show = false, render = true) {
  // отрисовка игрового поля
  where.innerHTML = ""
  for (let i = 0; i < SIZE; i++) {
    let row = document.createElement("div")
    row.classList.add("row")
    for (let j = 0; j < SIZE; j++) {
      let cell = document.createElement("div")
      let x = i * 10 + j
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
  const row = Math.trunc(numbCell / SIZE)
  const col = numbCell - SIZE * row
  const arrRow = []
  const arrCol = []
  const diagM = []
  const diagS = []
  let totalDF = []
  let length, start
  let length2, start2

  for (let i = 0; i < SIZE; i++) {
    arrRow.push(row * SIZE + i)
    arrCol.push(col + SIZE * i)
  }
  // побочная диагональ - проведённая из лев ниж угла матрицы в прав верх
  if (row + col <= 9) {
    length = row + col + 1
    start = SIZE * (row + col)
  } else if (row + col >= 10) {
    length = 20 - 1 - row - col
    start = 90 + (row + col + 1) - SIZE
  }
  for (let i = 0; i < length; i++) {
    diagS.push(start - i * 9)
  }
  // главная диагональ - проведённая из лев верх угла матрицы в прав ниж
  if (row > col) {
    start2 = (row - col) * 10
    length2 = SIZE - (row - col)
  } else if (col > row) {
    start2 = col - row
    length2 = SIZE - (col - row)
  } else if (row === col) {
    start2 = 0
    length2 = 10
  }
  for (let i = 0; i < length2; i++) {
    diagM.push(start2 + i * 11)
  }
  totalDF = [...arrRow, ...arrCol, ...diagM, ...diagS]
  return totalDF
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
// очистка от пеленгатора
function eraseDF(cells) {
  cells.forEach((cell) => {
    if (cell.dataset.state === "df") {
      cell.dataset.state = "cell"
    }
  })
}

// генерация лис
function generationP(fox = 8) {
  let arr = []
  for (let i = 0; i < SIZE * SIZE; i++) {
    arr.push(0)
  }
  for (let i = 0; i < fox; i++) {
    rdmNum = Math.trunc(Math.random() * 101)
    newPos = rdmNum > 99 ? 99 : rdmNum
    if (typeof arr[newPos] === "object") {
      arr[newPos].fox += 1
    } else {
      arr[newPos] = { fox: 1, catch: false }
    }
  }

  return arr
}
