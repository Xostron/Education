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

  const container = document.querySelector("#login_container")

  fetch("/api/login", { method: "POST", body, headers })
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error("запрос отклонен со статусом, " + res.status)
      }
      return res.json()
    })
    .then((json) => {
      console.log(json)
      container.innerHTML = "Добро пожаловать! " + json.name
    })
    .catch((err) => {
      container.innerHTML = "Извините, возникли проблемы при регистрации"
    })
})
