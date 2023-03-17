const Router = require("express")
const router = new Router()

let rooms = []

router.post("/create", (req, res) => {
  const { game, user } = req.body
  console.log("/create = ", game, user)
  console.log("rooms before= ", rooms, typeof rooms)
  let isInclude = false
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].game === game) {
      isInclude = true
      break
    }
  }
  if (!isInclude) {
    rooms.push({ game, user })
  }

  console.log("rooms after= ", rooms)
  res.status(200).send({ rooms })
})

module.exports = router
