// Global
// input field
let player1,
  player2 = "";

function render(template, where, wrapper = true) {
  // функция отображения компонетов
  if (wrapper) {
    const container = document.createElement("div");
    container.innerHTML = template;
    where.append(container);
    return container;
  } else {
    where.innerHTML = template;
    return where;
  }
}
function DragEl(tool, idx, where) {
  // отображение фантомной копии
  const { size } = tool;
  const imgShip = {
    front: `<img class="cell" src="./src/source/icon/1xh.svg"/>`,
    middle: `<img class="cell" src="./src/source/icon/0x.svg"/>`,
    back: `<img class="cell" src="./src/source/icon/1xh.svg"/>`,
  };
  let container = document.createElement("div");
  container.classList.add("drag-el");
  container.id = `drag${idx}`;
  for (let i = 0; i < size; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.state = "phantom";
    i === 0
      ? (cell.innerHTML += imgShip.front)
      : (cell.innerHTML += imgShip.middle);
    container.append(cell);
  }
  where.append(container);
}
function Login(where, display = true) {
  // окно логина
  let template = `
  <span class="login-title">Морской бой</span>
  <span class="login-subtitle"> 1 на 1</span>
  <div class="login-input">
  <input class="input" type="text" id="in1" placeholder="Игрок 1"/>
  </div>
  <div class="login-input">
  <input class="input" type="text" id="in2" placeholder="Игрок 2"/>
  </div>
  <button class="btn btn-text">Начать игру</button>
  <div class="blur"></div>
  `;
  display ? render(template, where, false) : render("", where, false);
  if (display) {
    const hndlStart = where.querySelector(".btn-text");
    const in1 = where.querySelector("#in1");
    const in2 = where.querySelector("#in2");
    // ====подписка на события====
    hndlStart.addEventListener("click", () => {
      hndlLoginStart(in1, in2);
    });
  }
}
function Field(where, arr = [0], render = true) {
  // отрисовка игрового поля
  where.innerHTML = "";
  for (let i = 0; i < SIZE; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < SIZE; j++) {
      let cell = document.createElement("div");
      let x = i * 10 + j;
      if (arr[x] === 1) {
        cell.dataset.state = "ship";
      } else if (arr[x] === 0) {
        cell.dataset.state = "cell";
      } else if (arr[x] === "E1") {
        cell.dataset.state = "away";
      } else if (arr[x].ship[x] === true) {
        if (arr[x].state === "kill") {
          cell.dataset.state = "destroy";
        } else {
          cell.dataset.state = "hit";
        }
        
      } else {
        cell.dataset.state = "cell";
      }
      cell.classList.add("cell");
      row.append(cell);
    }
    where.append(row);
  }
  where.classList.add("bg");
}
function Control(where) {
  // кнопки управления
  const isValid = permitted();
  let template = "";
  if (screenField <= 1) {
    template = `
  <div class="btns">
  <button id="close" class="btn btn-text">Завершить игру</button>
  <button ${
    !isValid ? "disabled" : ""
  } id="next" class="btn btn-text">Дальше</button>
  </div>
`;
  } else {
    template = `
  <div class="btns">
  <button id="close" class="btn btn-text">Завершить игру</button>
  
  </div>
`;
  }
  const container = render(template, where, false);
  const btns = container.querySelector(".btns");
  if (screenField <= 1) {
    btnNext = btns.querySelector("#next");
    isValid
      ? btnNext.classList.remove("disabled")
      : btnNext.classList.add("disabled");
  }
  btns.addEventListener("click", hndlControl);
}
function Toolbar(where, elements) {
  // панель инструментов - корабли
  const title = [
    "Игрок 1 расставляет корабли",
    "Игрок 2 расставляет корабли",
    "Ходит Игрок 1",
    "Ходит Игрок 2",
  ];
  let template =
    screenField < 2
      ? `
  <div class="header-inner">
  <span class="header-title">
  ${title[screenField]}
  </span>
  <div class="toolbar"></div>
  </div>`
      : `
  <div class="header-inner">
  <span class="header-title">
  ${title[screenField]}
  </span>
  </div>`;
  const header = render(template, where, false);
  header.style.fontSize = "25px";
  if (screenField < 2) {
    const toolbar = document.querySelector(".toolbar");
    elements.map((tool, idx) => Tool(toolbar, tool, idx));
    header.style.fontSize = "18px";
  }
}
function Tool(where, tool, idx) {
  // инструмент + объект в атрибуиах
  const { img, sum, size, draggable, rotation } = tool;
  // on/off draggable element
  const style = ["tool"];
  const styleImg = ["img-ship"];
  if (sum < 1) {
    tool.draggable = false;
    style.push("off");
    styleImg.push("off");
  }
  const template = `
<div draggable="${tool.draggable}" id="tool${idx}" class="${style.join(" ")}">
<img id="tool${idx}" draggable="false" class="${styleImg.join(
    " "
  )}" src="${img}" alt="" 
style="transform:rotateZ(${rotation}deg)"
/>
<span class="sum">${sum}</span>
</div>`;
  const container = render(template, where);
  const item = container.querySelector(`#tool${idx}`);

  // ====подписка на события====
  item.addEventListener("dragstart", (event) => {
    // выбор фантомной копии - находится за пределами экрана и отображение
    const el = document.querySelector(`#drag${idx}`);
    // el.style.transform=`rotateZ(${tool.rotation}deg)`
    // el.style.backgroundColor='red'
    // console.log(el);
    event.dataTransfer.setDragImage(el, 15, 15);
    // устанавливаем данные перетаскивания
    // global - выбранный корабль и tool
    selectedShip = new Ship(size, sum, tool.rotation);
    selectedTool = tool;
  });

  item.addEventListener("dragend", (ev) => {
    // console.log("dragend = ", ev.target);
  });
}
function Progress(where, stP, arrShipBattle) {
  // прогресс игры
  template = `
  <div>
  <div class="st-row">
  <img height="25px" src="./src/source/icon/1xh.svg" />
  ${tools[0].total} : ${stP[1]}
</div>

<div class="st-row">
  <img height="25px" src="./src/source/icon/2xh.svg" />
  ${tools[1].total} : ${stP[2]}
</div>
</div>
<div>
<div class="st-row">
  <img height="25px" src="./src/source/icon/3xh.svg" />
  ${tools[2].total} : ${stP[3]}
</div>

<div class="st-row">
  <img height="25px" src="./src/source/icon/4xh.svg" />
  ${tools[3].total} : ${stP[4]}
</div>
Количество промахов: ${stP.amount}  
</div>
  `;
  where.innerHTML = "";
  render(template, where, false);
}

// устанавливаем данные перетаскивания Drag&Drop ev.dataTransfer
// let dt = ev.dataTransfer
// dt.setData("ship", JSON.stringify(new Ship(tool.size)))
// dt.setData("tool", JSON.stringify(tool))
// в другом месте получаем данные перетаскивания
// передаваемые данные при
// let ship = JSON.parse(ev.dataTransfer.getData("ship"));
// let tool = JSON.parse(ev.dataTransfer.getData("tool"));
