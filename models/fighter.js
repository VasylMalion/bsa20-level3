class Fighter {
    constructor({ name, power, defense }) {
        this.name = name;
        this.health = 100;
        this.power = Number(power);
        this.defense = Number(defense);
    }
}

module.exports = Fighter;