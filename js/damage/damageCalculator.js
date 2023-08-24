import { showAnimation } from "../UI/lottieAnimations.js";
import { getCurrentPokemon } from "../pokemons/currentPokemon.js";
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
  if (currentAttack > currentDefense) {
    damage = currentAttack - currentDefense;
  } else {
    damage = currentAttack / currentDefense;
  }

  const player = getCurrentPokemon();
  if (damage >= player.maxHealth) {
    damage = player.maxHealth * 0.75;
  }

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
  console.log(damage);
  return damage;
};
