const moment = require('moment');
moment.defaultFormat = "YYYY-DD-MM HH:mm";

let m = moment().add(7, 'years').format("HH:mm");
let mn = moment(undefined);
let mo = new moment(0);
let ma = moment(new Date());

console.log(`\n${m}\n${mn}\n${mo}\n${ma}\n`);

mo.add(7, 'years');
console.log(mo.format("HH:mm"));
console.log(mo.format(moment.defaultFormat));

console.log(`\n${m}`)