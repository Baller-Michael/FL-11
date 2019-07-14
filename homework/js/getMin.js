function getMin() {
    let minValue = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        if (minValue > arguments[i]) {
            minValue = arguments[i];
        }
    }
    return minValue;
}

getMin(1, 2, 3);