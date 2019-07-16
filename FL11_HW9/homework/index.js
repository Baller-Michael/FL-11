const data = [
    {
        '_id': '5b5e3168c6bf40f2c1235cd6',
        'index': 0,
        'age': 39,
        'eyeColor': 'green',
        'name': 'Stein',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e3168e328c0d72e4f27d8',
        'index': 1,
        'age': 38,
        'eyeColor': 'blue',
        'name': 'Cortez',
        'favoriteFruit': 'strawberry'
    },
    {
        '_id': '5b5e3168cc79132b631c666a',
        'index': 2,
        'age': 2,
        'eyeColor': 'blue',
        'name': 'Suzette',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e31682093adcc6cd0dde5',
        'index': 3,
        'age': 19,
        'eyeColor': 'green',
        'name': 'George',
        'favoriteFruit': 'banana'
    }
];

function getNumbers(x) {
    let arrayOfNumbers = [];
    for (let i = 0; i < x.length; i++) {
        if (!isNaN(x[i])) {
            arrayOfNumbers.push(x[i]);
        }
    }
    return arrayOfNumbers;
}

function findTypes() {
    let types = [];
    for (let i = 0; i < arguments.length; i++) {
        types[i] = typeof arguments[i];
    }
    return types;
}

function executeforEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

function mapArray(arr, func) {
    let newArray = [];
    executeforEach(arr, function (el) {
        newArray.push(func(el));
    });
    return newArray;
}

function filterArray(arr, func) {
    let newArray = [];
    executeforEach(arr, function (el) {
        if (func(el)) {
            newArray.push(el);
        }
    });
    return newArray;
}

function showFormattedDate(data) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Date: ${data.getDate()} ${months[data.getMonth()]} ${data.getFullYear()}`;
}

function canConvertToData(data) {
    return new Date(data).toString() !== 'Invalid Date'
}

function daysBetween(dayStart, dayFinish) {
    dayStart = Date.parse(dayStart);
    dayFinish = Date.parse(dayFinish);
    const ms = 1000, sec = 60, min = 60, hours = 24;
    return Math.abs(Math.round((dayFinish - dayStart) / (ms * sec * min * hours)));
}

function getAmountOfAdultPeople(data) {
    let counter = 0;
    let adultAge = 18;
    filterArray(data, function (user) {
        if (user.age > adultAge) {
            counter++;
        }
    });
    return counter;
}

function keys(data) {
    let keyArray = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            keyArray.push(key);
        }
    }
    return keyArray;
}

function values(data) {
    let valuesArray = [];
    for (let values in data) {
        if (data.hasOwnProperty(values)) {
            valuesArray.push(data[values]);
        }
    }
    return valuesArray;
}
getNumbers('string'); // returns [] 
getNumbers('n1um3ber95'); // returns [1,3,9,5] 
findTypes('number'); // returns {“string”:1} 
findTypes(null, 'hello'); // returns {“object”:1, “number”:1, “string”:1}
console.log(keys({ keyOne: 1, keyTwo: 2, keyThree: 3 }));
console.log(values({ keyOne: 1, keyTwo: 2, keyThree: 3 }));