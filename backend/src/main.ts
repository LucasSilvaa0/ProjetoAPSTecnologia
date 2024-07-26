import express, { type Request, type Response, type Application } from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";
import { UserSchema, User } from "./models"
import { fetchCep, validateCNPJ, newClient, delClient, login, atualizar } from "./functions"
import { z } from "zod";
import connection from "./db";

const app: Application = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/new_user", async (req: Request, res: Response) => {
  const newU = req.body;
  
  console.log(req.body)
  
  const data = await fetchCep(newU.cep);
  if (data == null) {
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }

  const validcnpj = await validateCNPJ(newU.cnpj);

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
    return res.status(400).json({ error: 'Dados inválidos' })
  }

  newClient(listnewUser)
  res.send("OK")
});

app.delete("/del_user", async (req: Request, res: Response) => {
  const user = req.body;
  
  console.log(req.body)
  
  delClient(user.email, user.senha)
  res.send("OK")
});

app.post("/edit_user/login", async (req: Request, res: Response) => {
  const user = req.body;

  console.log("---------------------")
  console.log(req.body)
  console.log(user)
  console.log(user.email, user.senha)
  console.log("---------------------")

  login(user.email, user.senha, (err:any, result:any) => {
    if (err) {
      console.log('Erro ao buscar usuário:', err);
    }
    if (!result) {
      console.log('Usuário não encontrado');
    }
    console.log(`Usuário aqui: ${result[0]}`)
    return res.status(200).json(result[0])
  });

})

app.put("/edit_user/edit", async (req: Request, res: Response) => {
  const dados = req.body
  
  var retorno = await atualizar(dados.email, dados.senha, dados.coluna, dados.novo_dado)
  
  if (retorno === "OK") {
    res.send("OK")
  }
})

app.get("/list_user", async (req: Request, res: Response) => {
  try {
      connection.query("SELECT * FROM users", [], (err, result) => {
          if (err) {
              console.log("Deu erro viu: ", [err, result])
              return "ERRO"
          }
          return res.json(result)
      })
  } catch (e) {
      console.log("deu erro")
      return "ERRO"
  } finally {
      return "OK"
  }
})

app.use(zodMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});