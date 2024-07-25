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
  const newU: User = req.body;

  const data = await fetchCep(newU.cep);
  if (data == null) {
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }

  const validcnpj = await validateCNPJ(newU.cnpj);

  //console.log(validcnpj)

  const newUser = {...newU, ...data, cidade:data.localidade}

  const listnewUser = [
    newU.cnpj,
    newU.nome,
    newU.apelido,
    newU.cep,
    data.logradouro,
    data.bairro,
    data.localidade,
    data.uf,
    data.complemento,
    newU.email,
    newU.telefone,
    newU.senha
  ]

  if (validcnpj != null) {
    try {
      UserSchema.parse(newUser); // valida o novo usuário
    } catch (error) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }
  } else {
    //res.status(400).json({ error: 'Dados inválidos' })
    return
  }

  res.send("tudo certo.")

  console.log(listnewUser)

  connection.query('INSERT INTO users (cnpj, nome, apelido, cep, logradouro, bairro, cidade, uf, complemento, email, telefone, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', listnewUser, (err, result) => {
    if (err) {
      return;
    }
    res.send('Usuário criado com sucesso')
  });

});

app.use(zodMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});