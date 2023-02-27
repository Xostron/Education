function permitted() {
  let sum = 0;
  tools.forEach((tool) => {
    sum += tool.sum;
  });
  return sum <= 0 ? true : false;
}
function clearField(arr) {
  arr.forEach((val, idx) => {
    val === 1 ? (arr[idx] = 0) : arr[idx];
  });
}
function updateField(arrElem, arrField) {
  arrElem.forEach((elem, idx) => {
    if (arrField[idx] === 1 || arrField[idx].state === "S1") {
      elem.dataset.state = "ship";
    } else {
      elem.dataset.state = "cell";
    }
  });
}
function getCollision(arrField, absId, rowId, rltId) {
  // console.log("Collision=", selectedShip);
  let isCollision = false;
  let arrSlice = [];
  let rotation = selectedShip.rotation;
  if (selectedShip.rotation === 0) {
    // горизонталь
    const a1 = absId === rowId * SIZE ? absId : absId - 1;
    const a11 =
      absId + selectedShip.size === (rowId + 1) * SIZE
        ? absId + selectedShip.size
        : absId + selectedShip.size + 1;
    const a2 = a1 - SIZE;
    const a22 = a11 - SIZE;
    const a0 = a1 + SIZE;
    const a00 = a11 + SIZE;
    const piece2 = a2 >= 0 ? arrField.slice(a2, a22) : [];
    const piece1 = arrField.slice(a1, a11);
    const piece0 = arrField.slice(a0, a00);
    const piece = [...piece2, ...piece1, ...piece0];
    let validArea = piece
      .map((val) => (typeof val === "object" ? "S1" : val))
      .includes("S1");
    let validBorder = selectedShip.size <= SIZE - rltId + 1;
    // console.log("horiz = ", piece);
    isCollision = validBorder && !validArea;
  } else {
    // вертикаль
    let piece = [];
    const a1 = absId > SIZE ? absId - SIZE : absId;
    const ak = absId + (selectedShip.size - 1) * SIZE;
    const a11 = ak + SIZE > SIZE * SIZE ? ak : ak + SIZE;
    const height = (a11 - a1) / SIZE + 1;

    const a0 = a1 === rowId * SIZE ? a1 : a1 - 1;
    const a00 = a11 - 1;
    const a2 = a1 === (rowId + 1) * SIZE ? a1 : a1 + 1;
    const a22 = a11 + 1;

    const res = [];
    const temp = [a0, a1, a2];
    temp.forEach((val) => {
      res.includes(val) ? res : res.push(val);
    });
    const width = res.length;

    // console.log("res =", [a0,a1,a2],res)

    for (let j = 0; j < width; j++) {
      let ref = res[j];
      let pieceTemp = [];
      for (let i = 0; i < height; i++) {
        let sl = ref + SIZE * i;
        piece.push(arrField[sl]);
      }
      piece.push(...pieceTemp);
    }

    for (let i = 0; i < selectedShip.size; i++) {
      let sl = absId + SIZE * i;
      arrSlice.push(sl);
    }

    // const piece = [...piece2, ...piece1, ...piece0];
    let validArea = piece
      .map((val) => (typeof val === "object" ? "S1" : val))
      .includes("S1");
    let validBorder = ak >= SIZE * SIZE ? false : true;
    isCollision = validBorder && !validArea;
    // console.log("vert = ", absId,ak);
  }
  return { isCollision, arrSlice, rotation };
}
function initLocation(side = "left") {
  // init field для расположения
  tools = [
    new shipCard(1, 1),
    new shipCard(2, 1),
    new shipCard(3, 1),
    new shipCard(4, 1),
  ];
  fieldTemp = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    fieldTemp.push(0);
  }

  Field(field, fieldTemp);
  if (side === "left") {
    field.classList.add("left");
    field.classList.remove("right");
  } else {
    field.classList.remove("left");
    field.classList.add("right");
  }
  Control(btns);
  game.classList.remove("hide");
  Toolbar(header, tools);
  // console.log("@1tools = ", tools);
  const drag_el = document.querySelectorAll(`.drag-el`);
  // console.log(drag_el)
  drag_el.forEach((val) => {
    val.style.flexDirection = "row";
    const phantomCell = val.querySelector(".cell");
    const phantomImg = phantomCell.querySelector(".cell");
    phantomImg.style.transform = `rotateZ(0deg)`;
  });
}
function initGame(screenField) {
  // init field для игры
  field.classList.remove("left");
  field.classList.remove("right");
  Toolbar(header, tools);
  Field(field, fieldP2Loc);
  Field(field2, fieldP1Loc);
  Progress(st1, stP1);
  Progress(st2, stP2);
  if (screenField === 2) {
    field.style.opacity = "1";
    field2.style.opacity = "0.4";
    st1.style.opacity = "1";
    st2.style.opacity = "0.4";
    field.addEventListener("click", hndlBattle);
    field2.removeEventListener("click", hndlBattle);
  } else if (screenField === 3) {
    field.style.opacity = ".4";
    field2.style.opacity = "1";
    st1.style.opacity = ".4";
    st2.style.opacity = "1";
    field2.addEventListener("click", hndlBattle);
    field.removeEventListener("click", hndlBattle);
  }
  Control(btns);
}
function init() {
  // Завершить игру - переинициализация
  field.innerHTML = "";
  field.classList.remove("left");
  field.classList.remove("right");
  field.classList.remove("bg");
  field2.innerHTML = "";
  field2.classList.remove("bg");
  header.innerHTML = "";
  btns.innerHTML = "";
  st1.innerHTML = "";
  st2.innerHTML = "";
  tools = [
    new shipCard(1, 4),
    new shipCard(2, 3),
    new shipCard(3, 2),
    new shipCard(4, 1),
  ];
  fieldTemp = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    fieldTemp.push(0);
  }
  screenField = 0;
  stP1 = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    amount: 0,
  };
  stP2 = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    amount: 0,
  };
  fieldP1Loc = [];
  fieldP2Loc = [];
  shipP1Battle = [];
  shipP2Battle = [];
  fieldTemp = [];
  onOffModal(1, "", false);
}
function win(stP) {
  // победа - вычисление и уведомление
  let summ = stP[1] + stP[2] + stP[3] + stP[4];
  let total = 0;
  shipP1Battle.slice(0, shipP1Battle.length/2).forEach((tool) => {
    total += tool.sum;
  });
  console.log("WINNER = ", summ, total);
  if (summ === total) {
    if (screenField === 2) {
      setTimeout(() => alert(`Игрок 1 - ВЫЙГРАЛ!`), 100);
    } else if (screenField === 3) {
      setTimeout(() => alert(`Игрок 2 - ВЫЙГРАЛ!`), 100);
    }
  }
}
function onOffModal(player = 1, msg, active) {
  // modal.classList.length === 1
  // ? modal.classList.add("hide")
  // : modal.classList.remove("hide");
  !active ? modal.classList.add("hide") : modal.classList.remove("hide");
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
  `;
  render(template, modal, false);
  // setTimeout(()=>{modal.classList.add("hide")},2000)
}
function getArrCollision(begin,rowId,ori,size,arrField){
  console.log('enter data = ', begin,rowId,ori,size,arrField)
  if (ori === 0) {
    // горизонталь
    const a1 = begin === rowId * SIZE ? begin : begin - 1;
    const a11 =
      begin + size === (rowId + 1) * SIZE
        ? begin + size
        : begin + size + 1;
    const a2 = a1 - SIZE;
    const a22 = a11 - SIZE;
    const a0 = a1 + SIZE;
    const a00 = a11 + SIZE;
    const piece2 = a2 >= 0 ? arrField.slice(a2, a22) : [];
    const piece1 = arrField.slice(a1, a11);
    const piece0 = arrField.slice(a0, a00);
    const piece = [...piece2, ...piece1, ...piece0];
    console.log('piece=',piece2,piece1,piece0)
    return piece
  } else {
    // вертикаль
    let piece = [];
    const a1 = begin > SIZE ? begin - SIZE : begin;
    const ak = begin + (size - 1) * SIZE;
    const a11 = ak + SIZE > SIZE * SIZE ? ak : ak + SIZE;
    const height = (a11 - a1) / SIZE + 1;

    const a0 = a1 === rowId * SIZE ? a1 : a1 - 1;
    const a00 = a11 - 1;
    const a2 = a1 === (rowId + 1) * SIZE ? a1 : a1 + 1;
    const a22 = a11 + 1;

    const res = [];
    const temp = [a0, a1, a2];
    temp.forEach((val) => {
      res.includes(val) ? res : res.push(val);
    });
    const width = res.length;

    for (let j = 0; j < width; j++) {
      let ref = res[j];
      let pieceTemp = [];
      for (let i = 0; i < height; i++) {
        let sl = ref + SIZE * i;
        piece.push(arrField[sl]);
      }
      piece.push(...pieceTemp);
    }
    console.log('piece=',piece)
    return piece
  }
  
}