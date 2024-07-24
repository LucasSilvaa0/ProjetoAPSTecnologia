import mysql from 'mysql';

const dbConfig = {
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão com MySQL estabelecida.');
});

export default connection;
