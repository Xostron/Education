const fs = require("fs")
const path = require("path")

// чтение файла
function read() {
	return new Promise((resolve, reject) => {
		fs.readFile(
			path.join(__dirname, "qwe.txt"),
			{ encoding: "utf-8" },
			(err, data) => {
				if (err) reject(err)

				resolve(data)
			}
		)
	})
}
function main() {
	let result = {}
	read()
		.then((data) => {
			console.log("@ result = ", data)
		})
		.catch(console.log)
}

main()

// потоковое чтение
const s = fs.createReadStream(path.join(__dirname, "qwe.txt"), "utf-8")
s.on("data", (chunk) => {
	console.log("@stream = ", chunk)
})
