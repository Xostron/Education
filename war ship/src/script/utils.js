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