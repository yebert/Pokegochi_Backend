import ErrorResponse from "../utils/ErrorResponse.js";
import Pokemon from "../models/pokemon.js";

// GET /pokemon ALL
const getPokemons = async (req, res) => {
  try {
    let { filter, page, limit } = req.query;
    if (!filter) {
      filter = {};
    }
    let offset = 0;
    let parsedLimit = 151;

    if (page && limit) {
      const parsedPage = parseInt(page);
      parsedLimit = parseInt(limit);
      offset = (parsedPage - 1) * parsedLimit;
    }

    const pokemons = await Pokemon.findAll(
      {
        where: filter,
      },
      offset,
      parsedLimit
    );
    res.json({ pokemons });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

// GET /pokemon/:id
const getPokemonById = async (req, res) => {
  const id = req.params.id;
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) return res.status(404).json({ message: "Pokemon not found" });
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pokemon" });
  }
};

// POST /pokemon
const createPokemon = async (req, res) => {
  try {
    const pokemon = await Product.create(req.body);
    res.json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /pokemon/:id
const updatePokemon = async (req, res) => {
  try {
    console.log(req.body);
    const pokemon = await Pokemon.findByPk(req.params.id);
    if (!pokemon) return res.status(404).json({ error: "Pokemon not found" });
    await pokemon.update(req.body);
    res.json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /pokemon/:id
const deletePokemon = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Pokemon not found" });
    await product.destroy();
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting pokemon" });
  }
};

export {
  getPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
