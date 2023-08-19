import { gameState } from "../gameState.js";

export const openCatchScene = (pokemonData) => {
  const catchScene = document.createElement("div");
  catchScene.setAttribute("id", "catch-scene");
  const pokemon = document.createElement("div");
  const pokemonName = document.createElement("h5");
  const character = document.createElement("div");
  const pokemonImage = document.createElement("img");
  const catchBtn = document.createElement("button");
  const leaveBtn = document.createElement("button");
  leaveBtn.className = "btn leave-btn";
  leaveBtn.innerText = "LEAVE!";
  leaveBtn.setAttribute("data-catchScene", "leave-btn");

  catchBtn.innerText = "CATCH! 10";
  catchBtn.className = "btn catch-btn";
  catchBtn.setAttribute("data-catchScene", "catch-btn");
  character.className = "throw-ball";
  character.setAttribute("data-catchScene", "character");
  pokemonName.style.textAlign = "center";
  pokemonName.style.color = "white";
  pokemonName.style.fontWeight = "bold";
  pokemonName.innerHTML = `You found <span class="lead">${pokemonData.name}</span> try to catch it!`;
  pokemonImage.src = pokemonData.front;
  pokemon.style.position = "absolute";
  pokemon.style.right = "100px";
  pokemon.style.bottom = "100px";
  pokemonImage.style.width = "300px";
  pokemonImage.style.height = "300px";
  pokemon.append(pokemonName);
  pokemon.append(pokemonImage);
  catchScene.append(pokemon);
  catchScene.append(catchBtn);
  catchScene.append(leaveBtn);
  catchScene.append(character);

  catchScene.style.position = "absolute";
  catchScene.style.top = 0;
  catchScene.style.left = 0;
  catchScene.style.right = 0;
  catchScene.style.bottom = 0;
  catchScene.style.zIndex = 100;
  catchScene.style.backgroundColor = "black";
  catchScene.style.backgroundImage = `url('../assets/images/CatchBackground.png')`;
  catchScene.style.backgroundRepeat = "no-repeat";
  catchScene.style.backgroundSize = "cover";
  document.querySelector("#base").append(catchScene);
};

export const closeCatchScene = () => {
  document.querySelector("#catch-scene").remove();
  gameState.catch = false;
};
