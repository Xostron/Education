module.exports = class EmployeeDTO {
	login;
	id;
	isActivated;
	companyId;
	type;
	role;
	code;
	name;
	img

	constructor(model) {
		this.login = model.login;
		this.id = model._id;
		// this.isActivated = model.isActivated;
		// this.type = model.type;
		// this.role = model.role;
		// this.code = model.code;
		// this.name = model.name;
		// this.img = model.img;
	}
};
