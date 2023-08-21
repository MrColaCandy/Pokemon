export class Pokemon {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.level = 1;
    this.frontImage = data.frontImage;
    this.backImage = data.backImage;
    this.type = data.type;
    this.hp = data.hp;
    this.attack = data.attack;
    this.defense = data.defense;
    this.specialAttack = data.specialAttack;
    this.specialDefense = data.specialDefense;
    this.speed = data.speed;
    this.xp = data.xp;
    this.maxHealth = data.hp;
    this.maxMona = 100;
    this.currentHealth = data.hp;
    this.description = data.description;
    this.currentMona = 100;
  }
}
