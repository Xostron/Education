// Проверка уникальности логина
function user(db, login) {
	return new Promise((resolve, reject) => {
		db.employee.findOne({ login }, (err, doc) => {
			if (err) reject(err)
			if (doc) resolve(true)
			resolve(false)
			console.log('@@@user')
		})
	})
}

function create(db, name, obj){
	return new Promise((resolve,reject)=>{
		db[name].insertOne(obj, (err, doc)=>{
			if (err) reject(err)
			resolve(doc)
		})
	})
}

module.exports = { user, create }
