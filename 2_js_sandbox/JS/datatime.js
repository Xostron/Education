// преобразования строки '21.10.2023, 10:00:05' в объект даты и времени
const t = '21.10.2023, 10:00:05';

// Разбиваем строку на составляющие
const parts = t.split(/[\s,]+/); // Разделители могут быть пробелы, запятые и другие символы

// Получаем дату и время
const [datePart, timePart] = parts;
const [day, month, year] = datePart.split('.').map(Number);
const [hour, minute, second] = timePart.split(':').map(Number);

// Создаем объект даты и времени
const dateTime = new Date(year, month - 1, day, hour, minute, second); // Месяцы в JavaScript начинаются с 0
const q = new Date().toLocaleString()
const q1 = new Date('2023-10-25 11:12:05' )
console.log('строка в объект даты =', q1);
console.log('дата в строку =', q);
console.log('строка разложенная в объект даты =',dateTime);