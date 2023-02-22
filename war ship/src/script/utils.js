function permitted() {
    let sum = 0;
    tools.forEach((tool) => {
      sum += tool.sum;
    });
    return sum <= 0 ? true : false;
  }

  function clearField(arr){
    arr.forEach((val, idx) => {
      val === 1 ? (arr[idx] = 0) : arr[idx];
    });
  }

  function updateField(arrElem,arrField){
    arrElem.forEach((elem, idx) => {
      if (arrField[idx] === 1 || arrField[idx].state === "S1") {
        elem.dataset.state = "ship";
      } else {
        elem.dataset.state = "cell";
      }
    });
  }

  function getCollision(arrField){
    
    const a1 = absId === rowId * SIZE ? absId : absId - 1;
    const a11 =
      absId + selectedShip.size === (rowId + 1) * SIZE
        ? absId + selectedShip.size
        : absId + selectedShip.size + 1;
    const a2 = a1 - SIZE;
    const a22 = a11 - SIZE;
    const a0 = a1 + SIZE;
    const a00 = a11 + SIZE;
    const piece2 = a2 >= 0 ? fieldTemp.slice(a2, a22) : [];
    const piece1 = fieldTemp.slice(a1, a11);
    const piece0 = fieldTemp.slice(a0, a00);
    const piece = [...piece2, ...piece1, ...piece0];
    const isCollision = piece
      .map((val) => (typeof val === "object" ? "S1" : val))
      .includes("S1");
  }