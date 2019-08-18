function Hamburger(type, calories, secretIngredient) {
    let amountOfCheese = 0;
    let amountOfTomato = 0;
    let amountOfBite = 0;
    let amountOfSecretIngredient = 0;

    this.secretIngredient = secretIngredient;
    this.type = type;
    this.calories = calories;

    if (secretIngredient === true) {
        this.addSecretIngredient();
    }
    this.getCalories = function () {
        return this.calories;
    };

    this.setCalories = function (calories) {
        return this.calories = calories;
    }
    this.addCheese = function () {
        if (amountOfCheese) {
            console.log('Sorry, you can add cheese only once');
        } else {
            this.calories = this.calories + 120;
            amountOfCheese++;
        }

    }
    this.addTomato = function () {
        if (amountOfTomato < 2 && !amountOfBite) {
            this.calories = this.calories + 20;
            amountOfTomato++;
        } else {
            console.log('Sorry, you can add tomato only twice')
        }

    }
    this.addSecretIngredient = function () {
        if (amountOfCheese == 0 && amountOfTomato == 0 && amountOfSecretIngredient < 1) {
            amountOfSecretIngredient++;
            this.secretIngredient = true;
            this.calories = this.calories + 100;
        } else if (amountOfSecretIngredient > 0) {
            console.log('Sorry, you can add secret ingredient only once')
        } else if (amountOfCheese > 0 && amountOfTomato > 0) {
            console.log('Sorry, you can add secret ingredient only before ingredient')
        }
    }

    this.bite = function () {
        amountOfBite++;

        this.addTomato = function () {
            console.log('Sorry, you cannot add tomato');
        }
        this.addCheese = function () {
            console.log('Sorry, you cannot add cheese');
        }
        this.addSecretIngredient = function () {
            console.log('Sorry, you cannot add secretIngredient');
        }
    }
    this.info = function () {
        let str = this.type + ' hamburger: ';

        str += this.secretIngredient == true ? 'with secret ingredient, ' : '';
        str += amountOfCheese > 0 ? 'with cheese, ' : '';
        str += amountOfTomato > 0 ? `with ${amountOfTomato} tomato, ` : '';
        str += amountOfBite > 0 ? `is bit ${amountOfBite} times. ` : '';

        str += `Total calories: ${this.calories}.`;

        return str;
    }
}

let myHamburger = new Hamburger('classic', 600);

myHamburger.addSecretIngredient();
myHamburger.addTomato();
myHamburger.addCheese();
myHamburger.bite();
myHamburger.bite();
myHamburger.bite();
console.log(myHamburger.info());