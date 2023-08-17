console.log("index1.js");
// *****************************************************
const obj1 = {
	name: "xostron",
	q: 1,
	abc: "123",
};
let q = Object.getOwnPropertyNames(obj1);
// let r = Object.getOwnPropertySymbols(obj)
console.log("getOwnPropertyNames = ", q);
// console.log('getOwnPropertySymbols = ',r)
// *****************************************************
const obj = { name: { f: 123, m: 456 } };
// delete obj.name
delete obj.owner;
console.log("delete property = ", obj);
// *****************************************************
const doc = null;
console.log("obj ? ", !!doc);
const doc1 = {};
console.log("obj ? ", !!doc1);
// *****************************************************
// *****************************************************
switch (false) {
	case !!null:
		console.log("null = ", !!null);
		break;
	case !!{}:
		console.log("{} =", !!{});
		break;
	default:
		break;
}
// *****************************************************
const id = {}
const i = []
console.log('object = ', id instanceof Array)
console.log('arr = ')
// *****************************************************
// insert date in mongo by gui
// { "$date": "2021-07-15T10:30:48.021Z" }
// *****************************************************
console.log('filter: ', [1,2,3,4,5].filter(val=>val>3))

const p = [
	{id:1, valid:true},{id:2, valid:false},{id:3, valid:false}
]
function filter(arr){
	return arr.filter(el=>
		el.valid
	)
}
console.log('filter 2: ', filter(p))
// *****************************************************
const obj2 = {
	name:'qwe',
	psw:'123'
}
const a1 = Object.entries(obj2)
console.log('entries = ', a1)


// **JSON циклические ссылки***************************************************
const obj3 = {
	id: 123,
	name:'xos'
}
const obj4={
	id:410,
}
obj3.parent = obj4
obj4.children = obj3
console.log('obj3 = ',obj3)
const j = JSON.stringify(obj3,['id','parent','name'], 2)
console.log('obj3 Json = ', j)
// *****************************************************
console.log('NULL = ', null, typeof null, !!null, null || 'null+||', null ?? 'null??')
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
// *****************************************************
