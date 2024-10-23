const o = {
	id: 1,
	order: 2,
	name: 3,
	device: { order: 4, name: 5 },
}
// Рекурсивная трансформация - измененеие всеъ ключей в объекте
function transform(o){
    const result={}
    Object.entries(o).forEach(([k,v])=>{
        if (typeof v!=='object') return result[k] = v*10
        result[k] = transform(v)
    })
    return result
}

const r = transform(o)
console.log(r)


