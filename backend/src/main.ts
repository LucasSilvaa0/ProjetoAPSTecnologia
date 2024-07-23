import express, { type Request, type Response, type Application } from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(zodMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});