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
    this.currentHealth = data.hp;
    this.maxHealth = this.currentHealth;
    this.currentMona = 100;
    this.maxMona = this.currentMona;
    this.description = data.description;
    this.defenseType = "normal";
  }
}
