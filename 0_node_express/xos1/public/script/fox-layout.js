const elStatus = document.querySelector(".auth-status")
const elName = document.querySelector(".auth-name")
const elLogin = document.querySelector("#svg-login")
const elLogout = document.querySelector("#svg-logout")


let user = sessionStorage.getItem("user") || ''

if (user==="") {
  elStatus.dataset.state = "logout"
} else  {
  elStatus.dataset.state = "login"
  elLogin.classList.add('hide')
  elLogout.classList.remove('hide')
}
elName.innerHTML=user


elLogin.addEventListener("click",(e)=>{
  const a = document.createElement('a')
  a.href='/login'
  a.click()
})
elLogout.addEventListener("click",(e)=>{
  const a = document.createElement('a')
  a.href='/game'
  a.click()
  elLogout.classList.add('hide')
  elLogin.classList.remove('hide')
  localStorage.removeItem("token")
  localStorage.removeItem("isAuth")
  sessionStorage.removeItem("user")
  elStatus.dataset.state = "logout"
  elName.innerHTML=''
  
})

