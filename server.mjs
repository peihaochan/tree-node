import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const app = express();
const port = 8080;
const data = JSON.parse(readFileSync(resolve('./data.json'), 'utf-8'));

app.use(cors());

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
