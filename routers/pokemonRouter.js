import { Router } from "express";
import {
  getPokemonById,
  getPokemons,
  createPokemon,
  deletePokemon,
  updatePokemon,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/").get(getPokemons).post(createPokemon);
userRouter
  .route("/:id")
  .get(getPokemonById)
  .put(updatePokemon)
  .delete(deletePokemon);

export default userRouter;
