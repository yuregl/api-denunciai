import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server rodando na porta ${process.env.PORT}.`);
});
