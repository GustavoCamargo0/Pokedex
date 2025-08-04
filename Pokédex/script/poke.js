const button = document.getElementById("pokebut");
const input = document.getElementById("pokemonInput");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

button.addEventListener('click', function() {
  const nome = input.value.toLowerCase().trim();
  const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
  const infoDiv = document.getElementById("pokemonInfo");
  const statsDiv = document.getElementById("pokemonStats");
  const pokebox = document.getElementById("ladoAlado");
  const pokeNomeDiv = document.getElementById("pokenome"); 

  pokebox.classList.add("ladoAlado");     
  statsDiv.classList.add("pokemon-stats");

  infoDiv.innerHTML = "Carregando...";

  fetch(url)
    .then(resposta => {
      if (!resposta.ok) {
        statsDiv.innerText = ""
        pokeNomeDiv.innerText = ""
        pokebox.classList.remove("ladoAlado");     
        throw new Error("Pokémon não encontrado");
      }
      return resposta.json();
    })
    .then(data => {
      const nomeFormatado = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const imagem = data.sprites.front_default;
      const tipos = data.types.map(type => {
        const tipoNome = type.type.name;
        return `<span class="tipo ${tipoNome}">${tipoNome}</span>`;
      }).join(", ");

      const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join("<br>");

      pokeNomeDiv.innerHTML = `<h2>${nomeFormatado}</h2>`;
      infoDiv.innerHTML = `<img src="${imagem}" alt="${nomeFormatado}" />`;
      statsDiv.innerHTML = `
        <h2>Stats</h2>
        <h3>Tipo: ${tipos}</h3>
        <p>${stats}</p>`;
    })
    .catch(error => {
      infoDiv.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    });
});

   
