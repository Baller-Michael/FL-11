let a = +prompt('Enter first length');
let b = +prompt('Enter second length');
let c = +prompt('Enter third length');

if (a + b > c && a + c > b && b + c > a && a > 0 && b > 0 && c > 0) {
    if (a === b && b === c) {
        console.log('Eequivalent triangle')
    } else if (a === b || b === c || a === c) {
        console.log('Isosceles triangle')
    } else {
        console.log('Normal triangle')
    }
} else {
    console.log('Triangle doesn’t exist')
}