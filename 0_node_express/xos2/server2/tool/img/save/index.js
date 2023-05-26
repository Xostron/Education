const handler = require('./handler');
const { ObjectId } = require('mongojs');
// Сохранение изображений
function save(db, req, value, data, def) {
    return new Promise((resolve, reject) => {
        try {
            let a = Object.keys(data.img);
            if (!a.length) return resolve();
            const id = value[0] ? ObjectId(value[0]) : null;
            const p = Promise.resolve(
                !id && def.imgId ? def.imgId(db, req.info) : id
            );
            p.then((r) => {
                console.log('@@@ id (owner.id) = ',r)
                if (!r) return reject('Не удалось получить значение owner.id');
                a = a.map((key) => {
                    const obj = {
                        id: ObjectId(r),
                        key,
                        code: def?.name,
                        value: data?.all?.[key],
                        img: data?.img?.[key],
                        file: req?.files?.[key],
                    };    
                    return handler(db, req.info, obj);
                });
                return Promise.all(a);
            })
                .then(resolve)
                .catch(reject);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
module.exports = save;
