import React, { useState, useEffect } from 'react';
import styles from "./clientlist.module.css"
import axios from 'axios';

function ClientList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/list_user');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <ul className={styles.Lista}>
        <br />
        <p className={styles.Usuario}>ID | NOME - EMAIL - CEP - CIDADE - LOGRADOURO - CNPJ - TELEFONE</p>
        <br />
        {users.map((user) => (
            <>
                <p key={user.id} className={styles.Usuario}>{user.id} | {user.nome} - {user.email} - {user.cep} - {user.cidade} - {user.logradouro} - {user.cnpj} - {user.telefone}</p> <br />
            </>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;