const path = require('path')

console.log('join = ',path.join(__dirname, '.env'))
console.log('resolve = ',path.resolve(__dirname, '.env'))
console.log('@=',path.join('/foo', 'bar', 'baz', 'quux'));
console.log('@@=',path.resolve('/foo', 'bar', 'baz', 'quux'));