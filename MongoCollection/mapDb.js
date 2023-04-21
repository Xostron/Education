const tables = document.querySelectorAll("table");



// // массив имен коллекций из xml
// const coll = [];
// for (let i = 0; i < tables.length; i++) {
//   const table = tables[i].attributes.name.nodeValue;
//   coll.push(table);
// }
// console.log(coll)


// // удалить дупликаты
// const cl = [];
// for (let i = 0; i < coll.length; i++) {
//   if (!cl.includes(coll[i])) {
//     cl.push(coll[i]);
//   } else {
//     console.log("duplex", coll[i]);
//   }
// }
const arr = []
console.log('name',tables[1].attributes.name.nodeValue, tables[1])
for (const table of tables) {
    const row = table.querySelectorAll('.row')
    // console.log('name',tables[i].attributes.name.nodeValue table)
    // console.log('row', row)
    // const 
    // const data = {
    //     name:table.attributes.name.nodeValue,
    //     fld:[...data.fld, ]
    // }
    

}