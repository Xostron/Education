const btnCreate = document.querySelector("#btn-create")
const inCreate = document.querySelector("#in-create")
const divList = document.querySelector(".list-item")
let rooms = []
// создать игру
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
  fetch("/api-room/create", { method: "POST", body, headers })
  .then(res=>res.json())
  .then(data=>{
    rooms = data
    console.log(rooms)
  })
})

// войти в игру
divList.addEventListener("click", (e) => {})

// btnCopy.addEventListener("click", () => {})
