const menu = document.querySelector(".menu")
const setting = document.querySelector("#setting")

menu.addEventListener("click", (e) => {
  const { id } = e.target
  const navlink = document.createElement("a")
  switch (Number(id)) {
    // одиночная игра
    case 1:
      navlink.href = `/single`
      navlink.click()
      break
    // сетевая
    case 2:
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
      break
    default:
      break
  }
})
