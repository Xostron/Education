// ============генерация таблицы============
let body = document.querySelector(".container__table");


function generateTable2() {
  let fragment = new DocumentFragment();
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");
  const row = 10;
  const col = 10;
  for (let i = 1; i < row+1; i++) {
    let rowTable = document.createElement("tr");
    for (let j = 1; j < col+1; j++) {
      let cell = document.createElement("td");
      cell.classList.add("td");
      if ((i + j) % 3 ) {
        cell.classList.add("yellow");
      } else {
        cell.classList.add("blue");
      }

      rowTable.append(cell);
    }
    tbody.append(rowTable);
  }
  table.append(tbody);
  fragment.append(table);
  body.append(table);
}

generateTable2();
