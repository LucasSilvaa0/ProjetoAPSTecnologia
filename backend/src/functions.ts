import { json } from 'body-parser';
import connection from './db';
import axios from "axios";

export interface CepData {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    error: boolean;
}

export async function fetchCep(cep: string) : Promise<CepData | null> {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao buscar CEP');
        }
        const cepdata = await response.json();

        return cepdata
    } catch (error) {
        console.error('Erro ao buscar CEP.');
        return null
    }
}

export async function validateCNPJ(cnpj: string) {
    try {
        const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
        if (!response.ok) {
            throw new Error('Erro ao validar CNPJ na Receita WS');
        }
        const validcnpj = await response.json();
        return validcnpj;
    } catch (error) {
        return null
    }
};

export function newClient(listnewUser: any) {
    try {
        connection.query('INSERT INTO users (cnpj, nome, apelido, cep, logradouro, bairro, cidade, uf, complemento, email, telefone, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', listnewUser, (err, result) => {
          if (err) {
            return;
          }
          return 'Usuário criado com sucesso'
        });
      } finally {
        return null
      }
}

export function delClient(email:string, senha:string) {
    try {
        connection.query('DELETE FROM users WHERE (email, senha) = (?, ?)', [email, senha], (err, result) => {
            if (err) {
                return;
            }
            return 'Usuário deletado com sucesso'
        });
    } finally {
        return null
    }
}

export function login(email:string, senha:string, callback:any) {
    try {
        console.log(email, senha)

        connection.query("SELECT * FROM users WHERE (email, senha) = (?, ?)", [email, senha], (err, results) => {
            if (err) {
                console.log(`Deu erro viu: ${[err, results]}`)
                return callback(err, null)
            }
            console.log(`O resultado aqui: ${results}`)
            return callback(null, results)
        })
    } catch (e) {
        console.log("veio pra cá")
        //return null
    }
}

export async function atualizar(email:string, senha:string, coluna:string, novo_dado:string) : Promise<string> {
    if (coluna === "cep") {
        var novos_dados = await fetchCep(novo_dado)
        return atualizar_endereco(email, senha, novos_dados)
    } else if (coluna === "cnpj") {
        var valid = validateCNPJ(novo_dado)
        if (valid === null) {
            return "Erro no novo dado enviado."
        }
    }
    try {
        connection.query(`UPDATE users SET ${coluna} = ? WHERE (email, senha) = (?, ?)`, [novo_dado, email, senha], (err, result) => {
            if (err) {
                console.log("Deu erro viu: ", [err, result])
                return "ERRO"
            }
            console.log("Olha o resultado: ", result)
            return "OK"
        })
    } catch (e) {
        console.log("deu erro")
        return "ERRO"
    } finally {
        return "OK"
    }
}

function atualizar_endereco(email:string, senha:string, novos_dados:any) {
    try {
        connection.query("UPDATE users SET cep = ?, logradouro = ?, complemento = ?, bairro = ?, cidade = ?, uf = ? WHERE (email, senha) = (?, ?)", [novos_dados.cep, novos_dados.logradouro, novos_dados.complemento, novos_dados.bairro, novos_dados.localidade, novos_dados.uf, email, senha], (err, result) => {
            if (err) {
                console.log("Deu erro viu: ", [err, result])
                return "ERRO"
            }
            console.log("Olha o resultado: ", result)
            return "OK"
        })
    } catch (e) {
        console.log("deu erro")
        return "ERRO"
    } finally {
        return "OK"
    }
}