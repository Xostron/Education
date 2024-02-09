const p = [null, r()]

function r() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("@@@12")
			resolve(12)
		}, 1000)
	})
}

Promise.all(p)
	.then(([q, w]) => {
		console.log("q = ", q)
		console.log("w = ", w)
	})
	.catch(console.log)
