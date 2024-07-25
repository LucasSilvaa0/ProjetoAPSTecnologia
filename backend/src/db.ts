import mysql from 'mysql2';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Admin#123',
  database: 'meu_app',
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
      return console.error('Erro ao conectar ao banco de dados: ' + err.message);
  }
  console.log('Conectado ao banco de dados.');
});


export default connection;
