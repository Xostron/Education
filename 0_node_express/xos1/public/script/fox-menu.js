const menu = document.querySelector(".menu")
const setting = document.querySelector("#setting")


menu.addEventListener("click", (e) => {
  const { id } = e.target
  const navlink = document.createElement('a')
  switch (Number(id)) {
    case 1:
      navlink.href=`/play/single`
      navlink.click()
      break
    case 2:
      const uid = + new Date()  
      navlink.href=`/play/online/${uid}`
      navlink.click()
      break
    case 3:
    setting.classList.length>1 ?
      setting.classList["remove"]("hide") :
      setting.classList["add"]("hide")
      break
    default:
      break
  }
})


