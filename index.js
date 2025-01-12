const statName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonType = document.getElementById("pokemon-type");
const pokemonWeakness = document.getElementById("pokemon-weakness");
const imgElement = document.getElementById("pokemon-sprite");
const rightBtn = document.getElementById("right-btn");
const leftBtn = document.getElementById("left-btn");



async function fetchData() {
  try {
    // take the user input value
    const pokemonName = document.getElementById("pokemon-name-input").value.toLowerCase().replace(" ", "-");

    // fetch data from api
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    // convert to javascript object
    const data = await response.json();

    const pokemonSprite = data.sprites.front_default; // default sprite 
    const id = data.id; // id of a pokemon

    // gets each type name from a pokemon types object
    const types = data.types.map(typeInfo => typeInfo.type.name);

    rightBtn.addEventListener('click', ()=> {
      imgElement.src = data.sprites.back_default;
    })

    leftBtn.addEventListener('click', ()=> {
      imgElement.src = data.sprites.front_default;
    })

    imgElement.src = pokemonSprite;

    const weaknessSet = new Set(); // use a set to avoid duplicate weaknesses

    // go through each weakness type and add to set
    types.forEach(type => {
      const weaknesses = pokemonWeaknesses[type];
      weaknesses.forEach(weakness => weaknessSet.add(weakness));
    })

    //updates the stats on screen
    statName.innerHTML = `Name: ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}`;
    pokemonId.innerHTML = `Id: ${id.toString().padStart(4, '0')}`;
    pokemonType.innerHTML = `Type: ${types.join(', ')}`;
    pokemonWeakness.innerHTML = `Weakness: ${Array.from(weaknessSet).join(', ')}`;

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// weaknesses of each pokemon type
const pokemonWeaknesses = {
  grass: ["flying", "ground", "rock"],
  water: ["grass", "electric"],
  fire: ["water", "Ground", "Rock"],
  normal: ["fighting"],
  fighting: ["Psychic", "Fairy", "Flying"],
  electric: ["Ground"],
  flying: ["Electic", "Ice", "Rock"],
  ground: ["water", "grass", "ice"],
  rock: ["water", "grass", "fighting", "ground", "steel"],
  psychic: ["bug", "ghost", "dark"],
  ghost: ["ghost", "dark"],
  dark: ["fighting", "bug", "fairy"],
  bug: ["fire", "flying", "rock"],
  poison: ["ground", "psychic"],
  steel: ["fire", "fighting", "ground"],
  ice: ["fire", "fighting", "rock", "steel"],
  dragon: ["dragon", "fairy"],
  fairy: ["poison", "steel"]
}



fetchData();