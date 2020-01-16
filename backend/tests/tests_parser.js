let js2xml = require('../parser.js').js2xml;
let logger = require('../logger.js').logger;


let conf = {
    compact : false,
    indent : 4,
    rootname : 'towns',
    arrayChildNameMap : {'towns' : 'town'}
};



let obj1 = {
    _id : 12345678,
    name : "Orsay",
    highways : ['A6', 'A7', 'A8']
};

let obj2 = {
    _id : 1234543,
    name : "Massy",
    numbers : [1, 2 ,3]
};

let arr = [obj1, obj2];

logger.info('OBJ1');
console.log(obj1);
console.log(js2xml(obj1, conf));

logger.info('OBJ2');
console.log(obj2);
console.log(js2xml(obj2, conf));

logger.info('ARR');
console.log(arr);
console.log(js2xml(arr, conf));

logger.info('ARR');
console.log(arr);
console.log(js2xml(arr, {compact : false, indent : 2}));