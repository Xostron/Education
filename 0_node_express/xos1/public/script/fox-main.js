const menu = document.querySelector(".menu")
const setting = document.querySelector("#setting")
const elMsg = document.querySelector("#message")

const authToken = `Bearer ${localStorage.getItem("token")}`
console.log("client token = ", authToken)
fetch("/api-auth/is", { headers: { Authorization: authToken } })
  .then((res) => res.json())
  .then((json) => {
    const isAuth = json.isAuth
    localStorage.setItem("isAuth", isAuth)
    console.log("fetched = ", isAuth, json)
  })

menu.addEventListener("click", (e) => {
  const { id } = e.target
  const navlink = document.createElement("a")
  const isAuth = localStorage.getItem("isAuth")
console.log("isAuth = ", isAuth, typeof isAuth, null===false, null===true)
  switch (Number(id)) {
    // одиночная игра
    case 1:
      navlink.href = `/single`
      navlink.click()
      break
    // сетевая
    case 2:
      if (isAuth === "false" || isAuth===null) {
        elMsg.classList.remove("hide")
        elMsg.innerText = "Для игры по сети необходимо войти или зарегистрироваться (*)(*)"
        //скрыть сообщение через 2 сек
        setTimeout(() => {
            elMsg.classList.add("hide")
        }, 1500)
        break
      }
      const uid = +new Date()
      navlink.href = `/online/${uid}`
      navlink.click()
      break
    // настройки
    case 3:
      setting.classList.length > 1
        ? setting.classList["remove"]("hide")
        : setting.classList["add"]("hide")
      break
    // Правила
    case 4:
      navlink.href = `/login`
      navlink.click()
      break
    default:
      break
  }
})
