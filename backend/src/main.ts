import express, { type Request, type Response, type Application } from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";
import connection from './db';
import { UserSchema, User } from "./models"
import { fetchCep, CepData, validateCNPJ } from "./functions"
import { z } from "zod";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/new_user", async (req: Request, res: Response) => {
  const newUser: User = req.body;

  const data = await fetchCep(newUser.cep);
  if (data == null) {
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }

  //const validcnpj = await validateCNPJ(newUser.cnpj);

  res.send("tudo certo.")
  //console.log(validcnpj)

  try {
    UserSchema.parse({
      cnpj: newUser.cnpj,
      nome: newUser.nome,
      apelido: newUser.apelido,
      cep: newUser.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.logradouro,
      uf: data.uf,
      complemento: data.complemento,
      email: newUser.email,
      telefone: newUser.telefone
    }); // valida o novo usuário
  } catch (error) {
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }

  /*
  connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      res.status(500).json({ error: 'Erro ao inserir usuário' });
      return;
    }
    res.json({ message: 'Usuário criado com sucesso', newUser });
  });*/
});

app.use(zodMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});