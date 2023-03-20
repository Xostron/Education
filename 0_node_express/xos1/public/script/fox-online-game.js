const field1 = document.querySelector(".field1")
const field2 = document.querySelector(".field2")

const stc1 = document.querySelector("#stc1")
const stc2 = document.querySelector("#stc2")

const elGo1 = stc1.querySelector("#countGo")
const elFox1 = stc1.querySelector("#countFox")
const elapsedTime1 = stc1.querySelector("#elapsed")

const elGo2 = stc2.querySelector("#countGo")
const elFox2 = stc2.querySelector("#countFox")
const elapsedTime2 = stc2.querySelector("#elapsed")

// поле 1 игрока
let fieldTemp1 = []
let foxTemp1 = []
let countGo1 = 0
let countCatchFox1 = 0
let startTime1 = 0
let endTime1 = 0
let elpsTime1 = 0
let timerId1 = {}
const { arr, arrFox } = generationP(setCountFox)
fieldTemp1 = arr
foxTemp1 = arrFox
Field(field1)
const cells1 = field1.querySelectorAll(".cell")
elFox1.innerText = setCountFox - countCatchFox1
elGo1.innerText = countGo1

// поле 2 игрока
Field(field2)
const cells2 = field2.querySelectorAll(".cell")
elFox2.innerText = 8
elGo2.innerText = 0
let startTime2 = 0
let timerId2 = {}
let fieldTemp2 = []
let foxTemp2=[]
//после загрузки документа,
// подписка на подключение online и получение ответа от сервера по подписке
window.onload = async () => {
  await subcribe()
}
// подписка на события
field1.addEventListener("click", hndlCell)
// обработчик события
// нажатие на клетку
async function hndlCell(event) {
  if (event.target === event.currentTarget) {
    eraseDF(cells1)
  } else {
    const idGame = sessionStorage.getItem("gameId")
    const idUser = sessionStorage.getItem("user")
    const command = Array.from(cells1).indexOf(event.target)

    // отправляем сообщение на сервер
    await sendMessage({
      idGame,
      idUser,
      command,
      countGo: countGo1,
      countCatchFox: countCatchFox1,
      fieldTemp: fieldTemp1,
      foxTemp: foxTemp1,
      startTime: startTime1,
    })
  }
}

// RT: подписка на событие ответа от сервера
async function subcribe() {
  const online = new EventSource("http://localhost:3000/rt-connect")
  // обработчик события от сервера: прием сообщения от сервера по подписке
  // расшифровка сообщения и если относится к нам, то делаем отрисовку
  online.onmessage = (event) => {
    const msg = JSON.parse(event.data)
    // console.log("onmessage = ", msg)
    const nativeUser = sessionStorage.getItem("user")
    const nativeGame = sessionStorage.getItem("gameId")
    if (nativeGame === msg.idGame) {
      if (nativeUser === msg.idUser) {
        // отрисовка себя
        // console.log(msg.idUser, `нажал на ячейку`, msg)
        renderOnline(
          elFox1,
          elGo1,
          msg.countGo,
          msg.countCatchFox,
          msg.fieldTemp,
          msg.foxTemp,
          msg.command,
          cells1,
          elapsedTime1,
          msg.startTime,
          (who = 1)
        )
      } else {
        // отрисовка другого игрока
        // console.log("противник ", msg.idUser, `нажал на ячейку`, msg)
        renderOnline(
          elFox2,
          elGo2,
          msg.countGo,
          msg.countCatchFox,
          msg.fieldTemp,
          msg.foxTemp,
          msg.command,
          cells2,
          elapsedTime2,
          msg.startTime,
          (who = 2)
        )
      }
    }
  }
}

function renderOnline(
  elFox,
  elGo,
  countGo,
  countCatchFox,
  fieldTemp,
  foxTemp,
  absId,
  cells,
  elapsedTime,
  startTime,
  who
) {
  console.log('render = ', foxTemp)
  if (who === 1) {
    // **************************рендер своего поля**************************
    if (countGo1 === 0) {
      startTime1 = new Date()
      timerId1 = setInterval(() => elapsed(elapsedTime1, startTime1), 1000)
    }
    const { arr, arrFox } = catchFox(fieldTemp, foxTemp, absId)
    fieldTemp1 = arr
    foxTemp1 = arrFox
    foxRender(cells, foxTemp)
    const { totalDF, arrRow, arrCol, diagM, diagS } = dirFinder(absId)
    countR = detFoxOnAxis(arrRow, foxTemp)
    countC = detFoxOnAxis(arrCol, foxTemp)
    countM = detFoxOnAxis(diagM, foxTemp)
    countS = detFoxOnAxis(diagS, foxTemp)
    countF = countR + countC + countM + countS
    digitRender(cells, absId, countF)
    dfRender(cells, totalDF)
    countCatchFox1 = countCatch(foxTemp1)
    if (countCatchFox1 === setCountFox) {
      clearInterval(timerId1)
    } else {
      countGo1 += 1
    }
    elFox.innerText = setCountFox - countCatchFox1
    elGo.innerText = countGo1
  } else {
    // *************************рендер 2 игрока**************************
    if (countGo === 0) {
      startTime = new Date()
      timerId2 = setInterval(() => elapsed(elapsedTime, startTime), 1000)
    }
    const { arr, arrFox } = catchFox(fieldTemp, foxTemp, absId)
    fieldTemp2 = arr
    foxTemp2 = arrFox
    foxRender(cells, foxTemp)
    const { totalDF, arrRow, arrCol, diagM, diagS } = dirFinder(absId)
    countR = detFoxOnAxis(arrRow, foxTemp)
    countC = detFoxOnAxis(arrCol, foxTemp)
    countM = detFoxOnAxis(diagM, foxTemp)
    countS = detFoxOnAxis(diagS, foxTemp)
    countF = countR + countC + countM + countS
    digitRender(cells, absId, countF)
    dfRender(cells, totalDF)
    const countCatchFox2 = countCatch(foxTemp2)
    if (countCatchFox2 === setCountFox) {
      clearInterval(timerId2)
    } else {
      countGo += 1
    }
    elFox.innerText = setCountFox - countCatchFox2
    elGo.innerText = countGo
  }
}

// RT: передача сообщения (действие в игре)
async function sendMessage(object) {
  const {
    idGame,
    idUser,
    command,
    countGo,
    countCatchFox,
    fieldTemp,
    foxTemp,
    startTime,
  } = object
  console.log("send obj = ", object)
  const body = JSON.stringify({
    idGame,
    idUser,
    command,
    countGo,
    countCatchFox,
    fieldTemp,
    foxTemp,
    startTime,
  })
  const headers = { "Content-Type": "application/json" }
  // отправка запроса на сервер, сервер через eventSource рассылает \то сообщение всем пользователям
  await fetch("http://localhost:3000/rt-new", { method: "POST", body, headers })
}
