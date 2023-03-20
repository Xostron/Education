const btnCreate = document.querySelector("#btn-create")
const inCreate = document.querySelector("#in-create")
const divList = document.querySelector(".list-item")
let rooms = []


// событие - документ загружен - загрузка и отображение списка игр
window.onload=(e)=>{
console.log('window =', e)
fetch('/api-room/')
.then((res)=>res.json())
.then((data)=>{
  rooms = data.rooms
  // рендер списка комнат
  divList.innerHTML = ""
  rooms.reverse().forEach((room, idx) => {
    renderRooms(divList, room, idx+1)
  })
})
}

// кнопка - создать игру
btnCreate.addEventListener("click", (e) => {
  const user = sessionStorage.getItem("user")
  const game = inCreate.value
  console.log("click = ", user, game)
  if (game === "") {
    return
  }
  if (user === "" || user === null) {
    return
  }

  const body = JSON.stringify({
    user: user,
    game: game,
  })
  const headers = { "Content-Type": "application/json" }
  // сохраняем данные о комнате на сервере и получаем список комнат
  fetch("/api-room/create", { method: "POST", body, headers })
    .then((res) => res.json())
    .then((data) => {
      rooms = data.rooms
      console.log("rooms=", rooms,data)
      // рендер списка комнат
      divList.innerHTML = ""
      rooms.reverse().forEach((room, idx) => {
        renderRooms(divList, room, idx+1)
      })
    })
})

//кнопка - войти в игру
divList.addEventListener("click", (e) => {
  console.log(e.target.id, e.target.name)
  const gameId = e.target.id
  if (e.target.name==="connect"){
    sessionStorage.setItem('gameId', gameId)
    const a = document.createElement('a')
    a.href = `${gameId}`
    a.click()
  }
})

// btnCopy.addEventListener("click", () => {})
