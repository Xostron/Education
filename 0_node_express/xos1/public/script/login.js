const formL = document.querySelector(".login")
formL.addEventListener("submit", (e) => {
  e.preventDefault()
  const form = e.target
  const body = JSON.stringify({
    email: form.elements.email.value,
    password: form.elements.password.value,
  })
  //   console.log(form, form.elements, body)

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
      console.log("@ = ",json)
      const token = json.token
      localStorage.setItem("token",token)
      elErr.classList.remove("hide")
      elErr.innerText = json.msg
      // ????? добавить только при валидном user
      setTimeout(()=>{
        elErr.classList.add("hide")
        const link = document.createElement('a')
        link.href="/game"
        link.click()
      },3000)
    })
    .catch((err) => {
      console.log("@@ = ",err)
    })

  
})
