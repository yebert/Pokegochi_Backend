import ErrorResponse from "./utils/ErrorResponse.js";
import cors from "cors";
import express from "express";
import pokemonRouter from "./routers/pokemonRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = process.env.PORT || 8765;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/pokemon", pokemonRouter);

app.use((err, req, res, next) => {
  process.env.NODE_ENV !== "production" && console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(port, () => console.log(`Express Server listening on port ${port}`));
