const field1 = document.querySelector(".field1")
const elCountGo = document.querySelector("#countGo")
const elCountCatchFox = document.querySelector("#countFox")
const elElapsedTime = document.querySelector("#elapsed")

let fieldTemp = []
let foxTemp = []

let countGo = 0
let countCatchFox = 0
let startTime = 0
let endTime = 0
let elapsedTime = 0
let timerId = {}
// генерация поля и отрисовка
const { arr, arrFox } = generationP(setCountFox)
fieldTemp = arr
foxTemp = arrFox
Field(field1)
console.log(
  "INIT = ",
  fieldTemp,
  foxTemp,
  countGo,
  countCatchFox,
  startTime,
  elapsedTime
)
elCountCatchFox.innerText = setCountFox - countCatchFox
elCountGo.innerText = countGo
// подписка на события
field1.addEventListener("click", hndlCell)

// обработчик события
// нажатие на клетку
function hndlCell(event) {
  const cells = event.currentTarget.querySelectorAll(".cell")
  if (event.target === event.currentTarget) {
    eraseDF(cells)
  } else {
    if (countGo === 0) {
      startTime = new Date()
      timerId = setInterval(elapsed, 1000)
    }

    const absId = Array.from(cells).indexOf(event.target)
    catchFox(fieldTemp, absId)
    foxRender(cells, foxTemp)

    const { totalDF, arrRow, arrCol, diagM, diagS } = dirFinder(absId)
    countR = detFoxOnAxis(arrRow, foxTemp)
    countC = detFoxOnAxis(arrCol, foxTemp)
    countM = detFoxOnAxis(diagM, foxTemp)
    countS = detFoxOnAxis(diagS, foxTemp)
    countF = countR+countC+countM+countS

    digitRender(cells,absId,countF)
    // digitRender(cells, arrCol, countC)
    // digitRender(cells, diagM, countM)
    // digitRender(cells, diagS, countS)
    dfRender(cells, totalDF)
    countCatchFox = countCatch(foxTemp)

    if (countCatchFox === setCountFox) {
      clearInterval(timerId)
    } else {
      countGo += 1
    }

    console.log(
      "CLICK = ",
      fieldTemp,
      foxTemp,
      countGo,
      countCatchFox,
      startTime,
      elapsedTime
    )
    elCountCatchFox.innerText = setCountFox - countCatchFox
    elCountGo.innerText = countGo
  }
}

// let count = 0
// const test = document.querySelector('.btn-text')
// const counter = document.querySelector('#counter')
// test.addEventListener('click', ()=>{
//     count+=1
//     counter.innerText = count
//     console.log('click = ', count)
// })
