const { dict } = require('@tool/dict');
const pwd = require('@api/auth/user/pwd');
const exportDump = require('@util/db/export');
const importDump = require('@util/db/import');

function checkDB(db) {
	const uri = process.env.BD_URI;
	const p = [
		process.env.EXPORT ? exportDump(uri) : null,
		process.env.IMPORT ? importDump(uri) : null,
	];

	Promise.all(p)
		.then((_) => {
			process.env.EXPORT = undefined;
			process.env.IMPORT = undefined;
		})
		.then((_) => {
			const defUser = process.env?.ROOT_USER
				? JSON.parse(process.env.ROOT_USER)
				: {
						login: 'root',
						password: 'hiZopOx3',
				  };

			dict(db, 'employee', defUser.login, 'login')
				.then((usr) => (!usr ? pwd(defUser.password) : null))
				.then((hash) => {
					if (!hash) return;
					console.log('Добавление root пользователя');
					defUser.password = hash;
					defUser.on = true;
					db.employee.insert(defUser);
				})
				.catch(console.log);
		});
}

module.exports = checkDB;
