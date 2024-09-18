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
    // Публичные аксессоры
	// getter - вычисляемое свойство
	get full() {
		return this
	}
	// setter - установить свойство
	set full(obj) {
		for (const key in obj) {
			this[key] = obj[key]
		}
	}
    // Приватные аксессоры
    get #secret(){
        return this.primary
    }
    set #secret(val){
        this.primary = val
    }
	// приватный метод
	#calc() {
		return this.code + "-" + new Date().getFullYear() + "-" + this._id
	}
	setPrimary() {
		this.primary = this.#calc()
	}
}

const o = new Packed({ _id: 1, code: "xos" })
console.log(o)

o.setCode("xostron")
console.log(o.getCode())
console.log(o.full)

o.full = { _id: 10, code: "re", name: "Ro-Mu-31" }
console.log(o)

o.setPrimary()
console.log(o)
