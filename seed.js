import sequelize from "./db/index.js";
import Pokemon from "./models/pokemon.js";
import ErrorResponse from "./utils/ErrorResponse.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });
  const pokemonArray = [];
  const evolutionsArray = [];

  for (let ind = 1; ind <= 78; ind++) {
    //78
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${ind}`);
    if (!res.ok) {
      throw new ErrorResponse("Error fetching Evolutionchain", 500);
    }

    const json = await res.json();
    const first = parseInt(json.chain.species.url?.split("/")[6]) || null;
    const second =
      parseInt(json.chain.evolves_to[0]?.species.url.split("/")[6]) || null;
    const third =
      parseInt(
        json.chain.evolves_to[0]?.evolves_to[0]?.species.url.split("/")[6]
      ) || null;
    let evolution = { first, second, third };
    console.log(evolution);
    evolutionsArray.push(evolution);
  }

  for (let i = 1; i <= 151; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    if (!response.ok) {
      throw new ErrorResponse("Error fetching Pokemon", 500);
    }

    const json = await response.json();
    const name = json.name;
    const orderNumber = json.id;
    const types = json.types.map((t) => t.type.name);
    const health = json.stats[0].base_stat;
    const attackValue = json.stats[1].base_stat;
    const attack = json.moves[0].move.name;
    const defenseValue = json.stats[2].base_stat;
    const level = 1;
    const hunger = 100;
    const ownerId = null;
    const refStatus = true;
    const imgFront = json.sprites.front_shiny;
    const imgBack = json.sprites.back_shiny;
    const imgCard = json.sprites.other.dream_world.front_default;
    let type = "";
    types.forEach((element) => {
      type = type + element + ";";
    });
    const pokemon = {
      name,
      orderNumber,
      type,
      health,
      attack,
      attackValue,
      defenseValue,
      level,
      hunger,
      ownerId,
      refStatus,
      imgBack,
      imgFront,
      imgCard,
    };
    let ev = await evolutionsArray.find(
      (p) => p.first == i || p.second == i || p.third == i
    );
    if (!ev) {
      pokemon.predecessor = null;
      pokemon.successor = null;
    } else {
      if (ev.first == i) {
        pokemon.predecessor = null;
        pokemon.successor = ev.second <= 151 ? ev.second : null;
      } else if (ev.second == i) {
        pokemon.predecessor = ev.first <= 151 ? ev.first : null;
        pokemon.successor = ev.third <= 151 ? ev.third : null;
      } else {
        pokemon.predecessor = ev.second <= 151 ? ev.second : null;
        pokemon.successor = null;
      }
    }

    //console.log(pokemon);
    pokemonArray.push(pokemon);
    await Pokemon.create(pokemon);
  }

  //await Pokemon.bulkCreate(pokemonArray, { individualHooks: true });
};

try {
  await seedDB();
  console.log("Database seeded");
} catch (error) {
  console.error({ error });
} finally {
  sequelize.close();
  console.log("Database connection closed");
}
