const events = require('events')
const emitter = new events.EventEmitter()

exports.connectRT = (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  })
  emitter.on("newMessage", (message) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`)
  })
}

exports.newMsg = (req, res) => {
  const message = req.body
  emitter.emit("newMessage",message)
  res.status(200).end()
}
