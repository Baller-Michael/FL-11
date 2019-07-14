function pipe() {
    let finish = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        finish = addOne(finish);
    }
    return finish;
}
function addOne(x) {
    return x + 1;
}

pipe(1, addOne);
pipe(1, addOne, addOne);