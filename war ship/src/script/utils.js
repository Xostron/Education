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
  console.log("Collision=", selectedShip);
  let isCollision = false;
  let arrSlice = []
  let rotation = selectedShip.rotation
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
    console.log("horiz = ", piece);
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

    const res = []
    const temp=[a0, a1, a2]
    temp.forEach((val) => {
      res.includes(val) ? res : res.push(val);
    });
    const width = res.length

console.log("res =", [a0,a1,a2],res)

for (let j = 0; j < width; j++) {
    let ref = res[j]
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
    console.log("vert = ", absId,ak);
  }
  return {isCollision, arrSlice, rotation};
}
