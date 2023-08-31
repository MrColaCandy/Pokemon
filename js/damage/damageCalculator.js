import { showAnimation } from "../UI/game-ui/lottieAnimations.js";
import { get } from "../pokemons/pokemonsApi.js";

export const calculateDamage = async (
  attacker,
  defender,
  attackType = "normal",
  defenseType = "normal"
) => {
  const attack = attacker.attack;
  const specialAttack = attacker.specialAttack;
  const defense = defender.defense;
  const specialDefense = defender.specialDefense;
  const currentAttack = attackType === "normal" ? attack : specialAttack;
  const currentDefense = defenseType === "normal" ? defense : specialDefense;
  let damage = 0;
  const chance = attacker.speed / 255;
  if (currentAttack > currentDefense) {
    damage = currentAttack * 2 - currentDefense;
  } else {
    damage = (currentAttack * currentAttack) / currentDefense;
  }
  damage *= chance;

  const defenderType = defender.type.type.name;
  const attackerTypeUrl = defender.type.type.url;
  let multiplier = 1;
  showAnimation(
    "../../assets/animations/spinner.json",
    "damage-spinner",
    false
  );
  const { data } = await get(attackerTypeUrl);

  if (
    data.damage_relations.double_damage_to.find((t) => {
      t.name == defenderType;
    })
  ) {
    multiplier = 2;
  }
  if (
    data.damage_relations.no_damage_to.find((t) => {
      t.name == defenderType;
    })
  ) {
    multiplier = 0.4;
  }
  if (
    data.damage_relations.half_damage_to.find((t) => {
      t.name == defenderType;
    })
  ) {
    multiplier = 0.5;
  }
  document.getElementById("damage-spinner").remove();
  damage *= multiplier;

  if (damage >= defender.maxHealth) {
    damage = defender.maxHealth * 0.6;
  }
  return damage;
};
