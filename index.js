import express from 'express';

const app = express();
const port = process.env.PORT || 8765;

app.use(express.json());


app.listen(port, () => console.log(`Express Server listening on port ${port}`));