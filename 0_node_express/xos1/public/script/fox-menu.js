const menu = document.querySelector(".menu")
const setting = document.querySelector("#setting")



menu.addEventListener("click", (e) => {
  const { id } = e.target

  switch (Number(id)) {
    case 1:
      fetch(`/play/single`)
      break
    case 2:
      const uid = + new Date()  
      fetch(`/play/${uid}`,{method: get, redirect:'manual'})
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

