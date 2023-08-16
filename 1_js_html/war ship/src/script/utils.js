function permitted(reverse = false) {
  if (reverse) {
    let sum = 0
    tools.forEach((tool) => {
      sum += tool.sum
    })
    return sum < 10 ? true : false
  }
  let sum = 0
  tools.forEach((tool) => {
    sum += tool.sum
  })
  return sum <= 0 ? true : false
}
function clearField(arr) {
  arr.forEach((val, idx) => {
    val === 1 ? (arr[idx] = 0) : arr[idx]
  })
}
function updateField(arrElem, arrField) {
  arrElem.forEach((elem, idx) => {
    if (arrField[idx] === 1 || arrField[idx].state === "S1") {
      elem.dataset.state = "ship"
    } else {
      elem.dataset.state = "cell"
    }
  })
}
function getCollision(arrField, absId, rowId, rltId) {
  // console.log("Collision=", selectedShip);
  let isCollision = false
  let arrSlice = []
  let rotation = selectedShip.rotation
  if (selectedShip.rotation === 0) {
    // горизонталь
    const a1 = absId === rowId * SIZE ? absId : absId - 1
    const a11 =
      absId + selectedShip.size === (rowId + 1) * SIZE
        ? absId + selectedShip.size
        : absId + selectedShip.size + 1
    const a2 = a1 - SIZE
    const a22 = a11 - SIZE
    const a0 = a1 + SIZE
    const a00 = a11 + SIZE
    const piece2 = a2 >= 0 ? arrField.slice(a2, a22) : []
    const piece1 = arrField.slice(a1, a11)
    const piece0 = arrField.slice(a0, a00)
    const piece = [...piece2, ...piece1, ...piece0]
    let validArea = piece
      .map((val) => (typeof val === "object" ? "S1" : val))
      .includes("S1")
    let validBorder = selectedShip.size <= SIZE - rltId + 1
    // console.log("horiz = ", piece);
    isCollision = validBorder && !validArea
  } else {
    // вертикаль
    let piece = []
    const a1 = absId > SIZE ? absId - SIZE : absId
    const ak = absId + (selectedShip.size - 1) * SIZE
    const a11 = ak + SIZE > SIZE * SIZE ? ak : ak + SIZE
    const height = (a11 - a1) / SIZE + 1

    const a0 = absId === rowId * SIZE ? a1 : a1 - 1
    // const a00 = a11 - 1;
    const a2 = absId + 1 === (rowId + 1) * SIZE ? a1 : a1 + 1
    // const a22 = a11 + 1;

    const res = []
    const temp = [a0, a1, a2]
    temp.forEach((val) => {
      res.includes(val) ? res : res.push(val)
    })
    const width = res.length

    // console.log("res =", [a0,a1,a2],res)

    for (let j = 0; j < width; j++) {
      let ref = res[j]
      for (let i = 0; i < height; i++) {
        let sl = ref + SIZE * i
        piece.push(arrField[sl])
      }
    }

    for (let i = 0; i < selectedShip.size; i++) {
      let sl = absId + SIZE * i
      arrSlice.push(sl)
    }

    // const piece = [...piece2, ...piece1, ...piece0];
    let validArea = piece
      .map((val) => (typeof val === "object" ? "S1" : val))
      .includes("S1")
    let validBorder = ak >= SIZE * SIZE ? false : true
    isCollision = validBorder && !validArea
    console.log("vert = ", temp, piece, a1 + 1, rowId, (rowId + 1) * SIZE)
  }
  return { isCollision, arrSlice, rotation }
}
function initNext(side = "left") {
  // init field для расположения
  tools = [
    new shipCard(1, 4),
    new shipCard(2, 3),
    new shipCard(3, 2),
    new shipCard(4, 1),
  ]
  fieldTemp = []
  for (let i = 0; i < SIZE * SIZE; i++) {
    fieldTemp.push(0)
  }

  Field(field, fieldTemp)
  if (side === "left") {
    field.classList.add("left")
    field.classList.remove("right")
  } else {
    field.classList.remove("left")
    field.classList.add("right")
  }
  Control(btns)
  game.classList.remove("hide")
  Toolbar(header, tools)
  // console.log("@1tools = ", tools);
  const drag_el = document.querySelectorAll(`.drag-el`)
  // console.log(drag_el)
  drag_el.forEach((val) => {
    val.style.flexDirection = "row"
    const phantomCell = val.querySelector(".cell")
    const phantomImg = phantomCell.querySelector(".cell")
    phantomImg.style.transform = `rotateZ(0deg)`
  })
}
function initBack(arrP, shipP, side = "left") {
  console.log("BACK = ", shipP)
  tools = [
    new shipCard(1, 4),
    new shipCard(2, 3),
    new shipCard(3, 2),
    new shipCard(4, 1),
  ]
  shipP.forEach((val) => {
    tools[val.size - 1].sum -= 1
  })

  fieldTemp = arrP
  Field(field, fieldTemp, true)

  if (side === "left") {
    field.classList.add("left")
    field.classList.remove("right")
  } else {
    field.classList.remove("left")
    field.classList.add("right")
  }
  game.classList.remove("hide")
  Control(btns)
  Toolbar(header, tools)
  const drag_el = document.querySelectorAll(`.drag-el`)
  drag_el.forEach((val) => {
    val.style.flexDirection = "row"
    const phantomCell = val.querySelector(".cell")
    const phantomImg = phantomCell.querySelector(".cell")
    phantomImg.style.transform = `rotateZ(0deg)`
  })
}
function initNextGame(screenField) {
  // init field для игры
  field.classList.remove("left")
  field.classList.remove("right")
  Toolbar(header, tools)
  Field(field, fieldP2Loc)
  Field(field2, fieldP1Loc)
  Progress(st1, stP1)
  Progress(st2, stP2)
  if (screenField === 2) {
    field.style.opacity = "1"
    field2.style.opacity = "0.4"
    st1.style.opacity = "1"
    st2.style.opacity = "0.4"
    field.addEventListener("click", hndlBattle)
    field2.removeEventListener("click", hndlBattle)
  } else if (screenField === 3) {
    field.style.opacity = ".4"
    field2.style.opacity = "1"
    st1.style.opacity = ".4"
    st2.style.opacity = "1"
    field2.addEventListener("click", hndlBattle)
    field.removeEventListener("click", hndlBattle)
  }
  Control(btns)
}
function init() {
  // Завершить игру - переинициализация
  field.innerHTML = ""
  field.classList.remove("left")
  field.classList.remove("right")
  field.classList.remove("bg")
  field2.innerHTML = ""
  field2.classList.remove("bg")
  header.innerHTML = ""
  btns.innerHTML = ""
  st1.innerHTML = ""
  st2.innerHTML = ""
  field.style.opacity = "1"
  field2.style.opacity = "1"
  tools = [
    new shipCard(1, 4),
    new shipCard(2, 3),
    new shipCard(3, 2),
    new shipCard(4, 1),
  ]
  fieldTemp = []
  for (let i = 0; i < SIZE * SIZE; i++) {
    fieldTemp.push(0)
  }
  bufferP1.push(fieldTemp.slice())
  bufferP2.push(fieldTemp.slice())
  screenField = 0
  stP1 = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    amount: 0,
  }
  stP2 = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    amount: 0,
  }
  fieldP1Loc = []
  fieldP2Loc = []
  shipP1Battle = []
  shipP2Battle = []
  fieldTemp = []
  onOffModal(1, "", false)
}
function reInit(side = "left") {
  if (side === "left") {
    shipP1Battle = []
    tools = [
      new shipCard(1, 4),
      new shipCard(2, 3),
      new shipCard(3, 2),
      new shipCard(4, 1),
    ]
    fieldTemp = []
    for (let i = 0; i < SIZE * SIZE; i++) {
      fieldTemp.push(0)
    }
    // console.log("REINIT LEFT= ", shipP1Battle, tools, fieldTemp);
  } else if (side === "right") {
    shipP2Battle = []
    tools = [
      new shipCard(1, 4),
      new shipCard(2, 3),
      new shipCard(3, 2),
      new shipCard(4, 1),
    ]
    fieldTemp = []
    for (let i = 0; i < SIZE * SIZE; i++) {
      fieldTemp.push(0)
    }
    // console.log("REINIT RIGHT = ", shipP2Battle, tools, fieldTemp);
  }
}
function win(stP, shipPBattle) {
  // победа - вычисление и уведомление
  let summ = stP[1] + stP[2] + stP[3] + stP[4]
  let total = shipPBattle.length
  // shipPBattle.forEach((tool) => {
  //   total += tool.sum;
  // });
  // console.log("WINNER = ", summ, total, shipP1Battle, shipP2Battle);
  if (summ === total) {
    if (screenField === 2) {
      setTimeout(() => alert(`Игрок 1 - ВЫЙГРАЛ!`), 100)
    } else if (screenField === 3) {
      setTimeout(() => alert(`Игрок 2 - ВЫЙГРАЛ!`), 100)
    }
  }
}
function onOffModal(player = 1, msg, active) {
  // modal.classList.length === 1
  // ? modal.classList.add("hide")
  // : modal.classList.remove("hide");
  !active ? modal.classList.add("hide") : modal.classList.remove("hide")
  const template = `
  <div class="notification">
        <span 
        data-player="${player}" 
        class="label">
        ${player === 1 ? "Игрок 1" : "Игрок 2"}
        </span>
        <span>
          ${msg}
        </span>
      </div>
  `
  render(template, modal, false)
  // setTimeout(()=>{modal.classList.add("hide")},2000)
}
function getArrCollision(begin, rowId, ori, size) {
  // console.log('enter data = ', begin,rowId,ori,size,arrField)
  if (ori === 0) {
    // горизонталь
    const a1 = begin === rowId * SIZE ? begin : begin - 1
    const a11 =
      begin + size === (rowId + 1) * SIZE ? begin + size : begin + size + 1
    const a2 = a1 - SIZE
    const a22 = a11 - SIZE
    const a0 = a1 + SIZE
    const a00 = a11 + SIZE

    const piece2 = createArr(a2, a22)
    const piece1 = createArr(a1, a11)
    const piece0 = createArr(a0, a00)
    const piece = [...piece2, ...piece1, ...piece0].filter((val) => val >= 0)
    // console.log("piece2 = ",a2,a22,piece2)
    // console.log('piece1 = ',a1,a11,piece1)
    // console.log('piece0 = ',a0,a00,piece0)
    // console.log('piece = ',piece)
    const pieceShip = createArr(begin, begin + size)
    return { piece, pieceShip }
  } else {
    // вертикаль
    let piece = []
    const a1 = begin >= SIZE ? begin - SIZE : begin
    const ak = begin + (size - 1) * SIZE
    const a11 = ak + SIZE > SIZE * SIZE ? ak : ak + SIZE
    const height = (a11 - a1) / SIZE + 1

    const a0 = begin === rowId * SIZE ? a1 : a1 - 1
    // const a00 = a11 - 1;
    const a2 = begin + 1 === (rowId + 1) * SIZE ? a1 : a1 + 1
    // const a22 = a11 + 1;

    const res = []
    const temp = [a0, a1, a2]
    temp.forEach((val) => {
      res.includes(val) ? res : res.push(val)
    })
    const width = res.length

    for (let j = 0; j < width; j++) {
      let ref = res[j]
      for (let i = 0; i < height; i++) {
        let sl = ref + SIZE * i
        piece.push(sl)
        // console.log("sl = ",sl)
      }
      // console.log("@@@@@@@@@a0",pieceTemp)
      // piece.push(...pieceTemp);
    }
    // console.log("piece=", piece, a1, a0, a2);
    const pieceShip = createArr(begin, begin + size * SIZE, SIZE)
    return { piece, pieceShip }
  }
}
function createArr(xn, xk, step = 1) {
  let res = []
  for (let i = xn; i < xk; i += step) {
    res.push(i)
  }
  return res
}
function autolocn(shipPBattle, buffP) {
  // считаются доступные корабли
  const sumShip = tools.reduce((sum, curr) => {
    return sum + curr
  }, 0)
  // внешний цикл - пробегает по карточкам кораблей.
  // внутренний цикл - генерирует из текущей карточки
  // корабль и сразу располагает на поле, до тех пор
  // пока кол-во кораблей в карточке не станет = 0.
  let booked = []
  let arrShip = []
  const toolsT = tools.slice()
  toolsT.reverse().forEach((tool, idx) => {
    while (tool.sum > 0) {
      const rot = Math.random() * 2 < 1 ? 0 : 90
      shipPBattle.push(new Ship(tool.size, tool.sum, rot))
      shipPBattle[shipPBattle.length - 1].state = "S1"
      tool.sub()
      // выбор месторасположения корабля
      let isValid = true
      // генерирование валидного месторасположения
      while (isValid) {
        // console.log("меняй!")
        const size = tool.size
        let abs = 0
        const randomAbs = Math.floor(Math.random() * 110)
        const row =
          Math.trunc(randomAbs / SIZE) > 9 ? 9 : Math.trunc(randomAbs / SIZE)
        if (rot === 0) {
          // horiz
          abs =
            randomAbs + size > (row + 1) * SIZE - 1
              ? (row + 1) * SIZE - size
              : randomAbs
        } else if (rot === 90) {
          // vert
          const ak = randomAbs + (size - 1) * SIZE
          const q =
            Math.ceil((ak - SIZE * SIZE) / 10) === 0
              ? 1
              : Math.ceil((ak - SIZE * SIZE) / 10)
          abs = ak > SIZE * SIZE - 1 ? randomAbs - q * SIZE - 1 : randomAbs
          if (Math.ceil((ak - SIZE * SIZE) / 10)) {
            // console.log("@@@@@ = ",abs);
          }
        }
        // получить массив корабля и область
        const { piece, pieceShip } = getArrCollision(abs, row, rot, size)
        // проверка на валидность
        isValid = pieceShip.some((val) => {
          // console.log("valid = ", booked.includes(val));
          return booked.includes(val)
        })
        if (!isValid) {
          booked.push(...piece)
          // console.log("зафиксировал", abs, randomAbs, size);
        }
        arrShip = pieceShip
      }
      // добавление корабля на поле
      buffP.push(fieldTemp.slice())
      // console.log("autocoln buffer= ", buffP);
      arrShip.forEach((val, idx) => {
        fieldTemp[val] = shipPBattle[shipPBattle.length - 1]
        fieldTemp[val].ship[val] = false
      })
      // console.log("autolocn = ",abs,row,rot,size)
      // console.log("autolocn = ", pieceShip)
      // проверка на колизии
    }
    // tools.reverse()
    // отрисовка
    const cells = field.querySelectorAll(".cell")
    updateField(cells, fieldTemp)
  })
  // console.log("AUTOLOCN BOOKED = ", booked, fieldTemp);
  // перерисовка для обновления валидации кнопки "Дальше"
  Control(btns)
}
function checkTwist(arrEnemy, pos, stP, shipPBattle, lastPos) {
  let repeat = true
  let pre = lastPos
  let curr = ""
  if (arrEnemy[pos] !== 0 && arrEnemy[pos] !== "E1") {
    // попали в корабль
    if (arrEnemy[pos].ship[pos] === true) {
      // если уже стреляли сюда, то ничего не делаем
      onOffModal(
        screenField - 1,
        "По данной координате уже стреляли, корабль подбит",
        true
      )
      return { repeat, pre, curr }
    } else {
      // попали
      arrEnemy[pos].hit(pos)
      // stP.amount += 1;
      onOffModal(screenField - 1, "Корабль подбит", true)
      curr = +pos
      // проверяем уничтожение корабля
      if (arrEnemy[pos].state === "kill") {
        curr = "kill"
        stP[arrEnemy[pos].size] += 1
        win(stP, shipPBattle)
        onOffModal(screenField - 1, "Корабль уничтожен", true)
        // ****подсветка области уничтоженного корабля******
        const begin = +Object.keys(arrEnemy[pos].ship)[0]
        const ori = arrEnemy[pos].rotation
        const size = arrEnemy[pos].size
        const rowId = Math.trunc(begin / SIZE)
        // console.log("arr=", begin, rowId, ori, size, arrEnemy);
        const { piece, pieceShip } = getArrCollision(begin, rowId, ori, size)
        piece.forEach((val) => {
          if (typeof arrEnemy[val] !== "object") {
            arrEnemy[val] = "E1"
          }
        })
      }
      return { repeat, pre, curr }
    }
  } else if (arrEnemy[pos] === "E1") {
    // если уже стреляли сюда, то ничего не делаем
    onOffModal(screenField - 1, "В эту позицию уже стреляли, каллибровка", true)
    return { repeat, pre, curr }
  } else {
    // мимо
    onOffModal(screenField - 1, "Мимо, перезаряжаюсь", true)
    arrEnemy[pos] = "E1"
    stP.amount += 1
    screenField === 3 ? screenField-- : screenField++
    repeat = false
    return { repeat, pre, curr }
  }
}
function queensGambit() {
  // мозги
  let run = true
  let lastPos = ""
  let rdmNum = 0
  let newPos = 0
  let combi = [-1, 1, -10, 10]
  // цикл обработки и ход
  while (run) {
    if (!Object.keys(last).length) {
      // случайный выбор
      rdmNum = Math.trunc(Math.random() * 110)
      newPos = rdmNum > 99 ? 99 : rdmNum
      lastPos = ""
    } else {
      // аналитика - куда стрелять (обрабатываем последний случай,
      // когда последний исчерпывает себя, переходим к первому случаю)
      const cases = Object.entries(last)
      for (let i = cases.length - 1; i >= 0; i--) {
        const item = cases[i]
        console.log("@ purpose = ", item)
        //  item[0] (ключ)- попадание по кораблю
        // item[1] (значение) - вариации ходов {number1:null...number4:null}
        const variation = Object.entries(item[1])
        //variation = [[number1,null]...,[number4,null]]
        for (const variant of variation) {
          if (variant[1] === null) {
            newPos = +variant[0]
            lastPos = +item[0].slice(1)
            console.log("@@ Стреляем по позиции =", newPos, lastPos)
            break
          }
        }
        break
      }
      const pCases = cases[cases.length - 1]
      lastPos = +pCases[0].slice(1)
      lastCombi = Object.entries(pCases[1])
      lastCombi
      console.log("@@@ Entry = ?", last, cases, pCases, lastPos, lastCombi)
    }

    let { repeat, pre, curr } = checkTwist(
      fieldP1Loc,
      newPos,
      stP2,
      shipP2Battle,
      lastPos
    )
    // curr = kill, milk, "", number
    run = repeat

    // сохранение-формирование результата выстрела
    const keyLast = `a${curr}`
    // && typeof curr === "number"
    console.log(
      "@@@@****?",
      Object.keys(last),
      !Object.keys(last).includes(keyLast),
      typeof curr === "number"
    )
    console.log("@@@@****", curr, typeof curr)
    if (!Object.keys(last).includes(keyLast) && typeof curr === "number") {
      // вариации
      console.log(
        "@@@@ create",
        Object.keys(last),
        !Object.keys(last).includes(keyLast),
        typeof curr === "number"
      )
      console.log("@@@@", curr, typeof curr)
      last[keyLast] = {}
      // вариации ходов
      const row = Math.trunc(curr / SIZE)
      // combi=[-1,1,-10,10]
      combi.forEach((val, idx) => {
        newPos = curr + val
        // -1
        if (val === -1 && (newPos < 0 || newPos < row * SIZE)) {
          last[keyLast][newPos] = false
        }
        // +1
        else if (val === 1 && (newPos > 99 || newPos >= (row + 1) * SIZE)) {
          last[keyLast][newPos] = false
        }
        // -10
        else if (val === -10 && newPos < 0) {
          last[keyLast][newPos] = false
        }
        // +10
        else if (val === 10 && newPos > 99) {
          last[keyLast][newPos] = false
        } else {
          if (pre === newPos) {
            last[keyLast][newPos] = true
            last[`a${pre}`][curr] = true
          } else {
            last[keyLast][newPos] = null
          }
          console.log("@@@@ Попадание =", pre, curr)
        }
      })
    } else if (curr === "kill" || (pre === "" && curr === "")) {
      // корабли убит или мимо
      console.log("@@@@ kill or milk", pre, curr)
      last = {}
    } else {
      // мимо, но цель определена
      console.log("@@@@ push milk?", pre, curr)
      last[`a${pre}`][newPos] = false
    }
    console.log("@@@@@ exit = ", last, repeat, pre, curr)
  }
  // перерисовка + передача хода
  initNextGame(screenField)
}

// []: исправить обводку корабля позиция 10,20
// []: анализатор хода - одиночная игра
