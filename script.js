const searchInput= document.getElementById("search-input");
const searchButton= document.getElementById("search-button");
const urlTemplate= "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const nameEntry=document.getElementById("pokemon-name");
const idEntry=document.getElementById("pokemon-id");
const weightEntry=document.getElementById("weight");
const heightEntry=document.getElementById("height");
const hpEntry=document.getElementById("hp");
const attackEntry=document.getElementById("attack");
const defenseEntry=document.getElementById("defense");
const specialAttackEntry=document.getElementById("special-attack");
const specialDefenseEntry=document.getElementById("special-defense");
const speedEntry=document.getElementById("speed");
const typesDiv= document.getElementById("types");

// Function to reset the UI before loading new Pokémon data
const resetHTML = () => {
  results.style.display = "none";
  nameEntry.innerText = "";
  idEntry.innerText = "";
  weightEntry.innerText = "";
  heightEntry.innerText = "";
  hpEntry.innerText = "";
  attackEntry.innerText = "";
  defenseEntry.innerText = "";
  specialAttackEntry.innerText = "";
  specialDefenseEntry.innerText = "";
  speedEntry.innerText = "";

  // Hide sprite if it exists
  let spriteImg = document.getElementById("sprite");
  if (spriteImg) {
    spriteImg.style.display = "none";
  }

  // Clear types
  typesDiv.innerHTML = "";
};

// Function to update stats (HP, attack, etc.)
const updateStats = (data) => {
  nameEntry.innerText = data.name.toUpperCase();
  idEntry.innerText = `#${data.id}`;
  weightEntry.innerText = `Weight: ${data.weight}`;
  heightEntry.innerText = `Height: ${data.height}`;
  hpEntry.innerText = `${data.stats[0].base_stat}`;
  attackEntry.innerText = `${data.stats[1].base_stat}`;
  defenseEntry.innerText = `${data.stats[2].base_stat}`;
  specialAttackEntry.innerText = `${data.stats[3].base_stat}`;
  specialDefenseEntry.innerText = `${data.stats[4].base_stat}`;
  speedEntry.innerText = `${data.stats[5].base_stat}`;
};

// Function to update the Pokémon sprite image
const updateSprite = (spriteUrl) => {
  let spriteImg = document.getElementById("sprite");

  if (!spriteImg) {
    spriteImg = document.createElement("img");
    spriteImg.setAttribute("id", "sprite");
    spriteImg.setAttribute("src", spriteUrl);
    results.appendChild(spriteImg);
  } else {
    spriteImg.style.display = "block";
    spriteImg.setAttribute("src", spriteUrl);
  }
};

// Function to update the Pokémon types
const updateTypes = (types) => {
  typesDiv.innerHTML = ""; // Clear previous types

  types.forEach((typeObj) => {
    let typeName = typeObj.type.name;
    typesDiv.innerHTML += `<span class=${typeName}>${typeName.toUpperCase()}</span>`;
  });
};

// Main function to update the entire HTML when new data is fetched
const updateHTML = (data) => {
  results.style.display = "block";
  console.log("Data: ", data);

  // Call separate functions for updating different parts of the UI
  updateStats(data);
  updateSprite(data.sprites.front_default);
  updateTypes(data.types);
};

// Function to process input and fetch data from API
const processInput = async () => {
  const cleanedInput = searchInput.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, "").replace(/\s/g, "");
  console.log("cleanedInput: ", cleanedInput);

  let url = urlTemplate + cleanedInput;
  console.log("url: ", url);

  try {
    fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("Pokémon not found");
        resetHTML(); // Reset the UI if Pokémon is not found
        return Promise.reject();
      }
    }).then((data) => {
      console.log(data);
      updateHTML(data); // Update the UI with the fetched data
    });
  } catch (err) {
    console.log(err);
  }
};

// Event listener for search button
searchButton.addEventListener("click", processInput);
