const btnLogin = document.querySelector("#login")
const btnRegistration = document.querySelector("#registration")
const spanRegistration = document.querySelector(".reg")

btnLogin.addEventListener("click", (e) => {
  // e.preventDefault()
  const form = document.querySelector(".login")
  console.log(e.target)
  const body = JSON.stringify({
    email: form.querySelector("#email").value,
    password: form.querySelector("#password").value,
  })
  console.log(form, form.elements, body)

  const headers = { "Content-Type": "application/json" }

  const elErr = document.querySelector(".err")

  fetch("/api-auth/login", { method: "POST", body, headers })
    .then((res) => {
      // if (res.status < 200 || res.status >= 300) {
      //   throw new Error("запрос отклонен со статусом, " + res.status)
      // }
      return res.json()
    })
    .then((json) => {
      console.log("@ = ", json)
      const token = json.token
      localStorage.setItem("token", token)
      localStorage.setItem("isAuth",true)
      elErr.classList.remove("hide")
      elErr.innerText = json.msg
      currUser = body.email
      console.log("@login = ", currUser)
      //автоматический переход на главную страницу через 3 сек
      setTimeout(() => {
        if (token) {
          elErr.classList.add("hide")
          const link = document.createElement("a")
          link.href = "/game"
          link.click()
        }
      }, 3000)
    })
    .catch((err) => {
      console.log("@@ = ", err)
      localStorage.setItem("isAuth",false)
    })
})

btnRegistration.addEventListener("click", (e) => {
  const form = document.querySelector(".login")
  const body = JSON.stringify({
    email: form.querySelector("#email").value,
    password: form.querySelector("#password").value,
  })
  console.log(form, form.elements, body)

  const headers = { "Content-Type": "application/json" }

  const elErr = document.querySelector(".err")

  fetch("/api-auth/registration", { method: "POST", body, headers })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log("@ = ", json)
      elErr.classList.remove("hide")
      elErr.innerText = json.msg
      //автоматический переход на главную страницу через 3 сек
      setTimeout(() => {
        if (token) {
          elErr.classList.add("hide")
        }
      }, 3000)
    })
    .catch((err) => {
      console.log("@@ = ", err)
    })
})

spanRegistration.addEventListener("click",()=>{
  btnRegistration.classList.remove('hide')
  spanRegistration.classList.add('hide')
})