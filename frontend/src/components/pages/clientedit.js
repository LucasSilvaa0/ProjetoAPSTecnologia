import styles from './clientedit.module.css';
import { useState } from "react"
import axios from "axios"

class User {
    constructor(nome, apelido, email, senha, cep, cnpj) {
        this.nome = nome
        this.apelido = apelido
        this.email = email
        this.senha = senha
        this.cep = cep
        this.cnpj = cnpj
        
    }
}

async function Logar(email, senha) {
    // API para o backend

    try {

        console.log("CHEGUEI AQUI 1")

        const response = await axios.post('http://localhost:5000/edit_user/login', {email, senha})
        var user = response.data
        
        const usuariologado = new User(user.nome, user.apelido, user.email, user.senha, user.cep, user.cnpj, user.complemento)

        console.log("CHEGUEI AQUI 2")

        if (response.data != null) {
            window.alert("CHEGUEI AQUI 3")
            return usuariologado
        } else {
            window.alert("ERRO NOS DADOS DO USUÁRIO!")
            return
        }
        
    } catch (e) {
        console.log("DEU ERRO!")
        window.alert("ERRO!")
        console.log(e)
    } finally {
        console.log("veio pra cá...")
    }
    
}

export default function ClientEdit() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [coluna, setColuna] = useState('')
    const [novoDado, setNovoDado] = useState('')
    const [usuariologado, setUsuario] = useState('')
    
    async function Atualizar() {
        
        try {
            const novo = [
                coluna,
                novoDado
            ]

            await axios.put("http://localhost:5000/edit_user", novo)
            
            if (response.data === "OK") {
                window.alert("USUÁRIO CADASTRADO COM SUCESSO!")
            } else {
                window.alert("ERRO NOS DADOS DO CADASTRO DO USUÁRIO!")
            }
            
        } catch (e) {
            window.alert(e)
        }
    }

    async function mudar() {
        let us = await Logar(email, senha)
        setUsuario(us)
        console.log(usuariologado)
        window.location.replace("http://localhost:3000/edit_client/edit")
    }

    if (window.location == "http://localhost:3000/edit_client/login") {
        return (
            <>
                <h2>Faça o seu login.</h2>
                <div className={styles.Inputs}>
                    E-MAIL:   <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} required /> <br/>
                    Senha:    <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)} required /> <br />
                    <button onClick={mudar}>EDITAR CONTA!</button>
                </div>
            </>
        )
    } else {
        return (
            <div className={styles.body}>
                <div><br />
                    <p>Qual dado da sua conta você deseja mudar?</p><br />
                    <select id="colunas" multiple onChange={(e) => setColuna(e.target.value)}>
                        <option value="email">Email</option>
                        <option value="senha">Senha</option>
                        <option value="cep">CEP</option>
                        <option value="cnpj">CNPJ</option>
                        <option value="complemento">Complemento</option>
                    </select><br/>
                    <input type='text' onChange={(e) => setNovoDado(e.target.value)}/>
                    <button onClick={Atualizar}>ATUALIZAR</button>
                </div>
            </div>
        )
    }
}