const btnCreate = document.querySelector("#create")
const btnConnect = document.querySelector("#connect")
const divCreate = document.querySelector("#onlineCreate")
const divConnect = document.querySelector("#onlineConnect")
const btnOk = document.querySelector("#ok")
const btnStart = document.querySelector("#start")
const btnCopy = document.querySelector("#btn-copy")
subscribe()
btnCopy.addEventListener("click", () => {})

btnCreate.addEventListener("click", () => {
  btnCreate.classList.add("btn-active")
  btnConnect.classList.remove("btn-active")
  divCreate.classList.remove("hide")
  divConnect.classList.add("hide")
})

btnConnect.addEventListener("click", () => {
  btnConnect.classList.add("btn-active")
  btnCreate.classList.remove("btn-active")
  divConnect.classList.remove("hide")
  divCreate.classList.add("hide")
})

btnOk.addEventListener("click", () => {})

btnStart.addEventListener("click", () => {
    sendMessage()
})



async function subscribe(){
    const online = new EventSource('http://localhost:3000/rt-connect')
    online.onmessage=(event)=>{
        const msg = event.data
        console.log("onmessage = ",msg)
    }
}

async function sendMessage() {
  const body = JSON.stringify({
    message: currUser,
    id: Date.now(),
  })
  const headers = { "Content-Type": "application/json" }
  await fetch("http://localhost:3000/rt-new", 
  { method: "POST", body, headers })

}
