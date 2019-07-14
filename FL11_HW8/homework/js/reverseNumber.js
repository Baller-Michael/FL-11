function reverseNumber(x) {
    let newNumber = x.toString();
    let revers = '';
    if (x < 0) {
        for (let i = newNumber.length - 1; i >= 1; i--) {
            revers += newNumber[i];
        }
        return '-' + revers;
    } else {
        for (let i = newNumber.length - 1; i >= 0; i--) {
            revers += newNumber[i];
        }
        return +revers;
    }
}
reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);