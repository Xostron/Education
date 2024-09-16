class Packed {
	constructor(obj) {
		this._id = obj._id
		this.code = obj.code
	}
	getCode() {
		return this.code
	}
	setCode(val) {
		this.code = val
	}
	get full() {
		return this
	}

	set full(obj) {
		for (const key in obj) {
			this[key] = obj[key]
		}
	}
}

const o = new Packed({ _id: 1, code: "xos" })
console.log(o)

o.setCode("xostron")
console.log(o.getCode())
console.log(o.full)

o.full = { _id: 10, code: "re", name: "Ro-Mu-31" }
console.log(o)
