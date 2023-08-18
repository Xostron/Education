import { makeAutoObservable } from "mobx";

// store
class dTimer {
    type = 'ru'
	sec = new Date().toLocaleString(this.type);
    
	constructor() {
		makeAutoObservable(this);
	}

	// actions
	update() {
		this.sec = new Date().toLocaleString(this.type);
	}
	reset() {
		this.type ==='ru' ? this.type='en' : this.type='ru'
	}
}

export default new dTimer();

//
