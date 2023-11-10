import { makeAutoObservable } from "mobx";

/* store - представляет class
makeAutoObservable - авто настройка работы mobx
makeObservable - ручная настройка работы mobx makeObservable(this, {})
методы класса - action в которых можем изменять данные
computed - вычисляемые свойства (get - геттеры, set - сеттеры)
*/
class dTimer {
    type = 'ru'
	sec = new Date().toLocaleString(this.type);
    todo=12
	constructor() {
		makeAutoObservable(this);
	}

	// actions
	update() {
		this.sec = new Date().toLocaleString(this.type);
	}
	lang() {
		this.type ==='ru' ? this.type='en' : this.type='ru'
	}
    get inf(){return this.type}
}

export default new dTimer();

//
