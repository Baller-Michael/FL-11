const maxAgility = 100;
class Fighter {
    constructor(name, damage, hp, agility, win = 0, lose = 0) {
        this._name = name;
        this._damage = damage;
        this._hp = hp;
        this._agility = agility;
        this._win = win;
        this._lose = lose;
    }

    getName() {
        return this._name;
    }
    getDamage() {
        return this._damage;
    }
    getAgility() {
        return this._agility;
    }
    getHealth() {
        return this._hp;
    }
    heal(healPoints) {
        this._hp += healPoints;
        if (this._hp > totalHP) {
            this._hp = totalHP;
            console.log(`${this.getName()} heal is ${this.getHealth()} now!`);
        }
    }
    dealDamage(damagePoints) {
        this._hp -= damagePoints;
        if (this._hp < 0) {
            this._hp = 0;
            console.log(`${this.getName()} heal is ${this.getHealth()} now!`)
        }
    }
    attack(enemy) {
        if (enemy.getAgility() <= Math.floor(Math.random() * maxAgility)) {
            enemy.dealDamage(this._damage);
            console.log(`${this._name} make ${this._damage} to ${enemy.getName()}`);
        } else {
            console.log(`${this._name} attack missed`);
        }
    }
    addWin() {
        this._win++;
    }
    addLoss() {
        this._loss++;
    }
    logCombatHistory() {
        return `Name: ${this._name}, Wins: ${this._win}, Losses: ${this._loss}`;
    }
}

function battle(fighter, defender) {
    let defenderWin = true;
    if (fighter.getHealth() === 0) {
        console.log(`${fighter.getName()} is dead and can't fight`);
        return undefined;
    }
    if (defender.getHealth() === 0) {
        console.log(`${defender.getName()} is dead and can't fight`);
        return undefined;
    }
    while (fighter.getHealth() > 0) {
        fighter.attack(defender);
        if (defender.getHealth() === 0) {
            defenderWin = false;
            break;
        }
        defender.attack(fighter);
    }
    if (defenderWin) {
        defender.addWin();
        fighter.addLoss();
    } else {
        fighter.addWin();
        defender.addLoss();
    }
}
let Fighter1 = new Fighter('John', 20, 100, 25);
let Fighter2 = new Fighter('Mike', 30, 100, 30);
battle(Fighter1, Fighter2);