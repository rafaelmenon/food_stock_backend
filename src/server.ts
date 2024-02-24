import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

routes(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
