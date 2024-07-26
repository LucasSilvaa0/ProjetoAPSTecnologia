import styles from './clientedit.module.css';
import { useState } from "react"
import axios from "axios"

export default function ClientEdit() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [coluna, setColuna] = useState('')
    const [novoDado, setNovoDado] = useState('')
    
    async function Atualizar() {
        
        try {
            const novo = {
                email,
                senha,
                coluna,
                novoDado
            }

            if (novo.coluna === "senha") {
                var confirmacao = window.prompt("TEM CERTEZA QUE DESEJA MODIFICAR A SUA SENHA? (S/N)")
                if (confirmacao !== "S") {
                    return
                }
            }

            const response = await axios.put("http://localhost:5000/edit_user", novo)
            
            if (response.data === "OK") {
                window.alert("USUÁRIO ATUALIZADO COM SUCESSO!")
            } else {
                window.alert("ERRO NOS DADOS DO CADASTRO DO USUÁRIO!")
            }
            
        } catch (e) {
            window.alert(e)
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.Inputs}><br />
                <h3>Qual dado da sua conta você deseja mudar?</h3><br />
                Escreva seu email:   <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/><br/>
                Escreva sua senha:   <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)}/><br/>
                Escreva o novo dado: <input type='text' onChange={(e) => setNovoDado(e.target.value)}/><br/>
                <select id="colunas" multiple onChange={(e) => setColuna(e.target.value)}>
                    <option value="email">Email</option>
                    <option value="senha">Senha</option>
                    <option value="cep">CEP</option>
                    <option value="cnpj">CNPJ</option>
                    <option value="complemento">Complemento</option>
                </select><br/>
                <button onClick={Atualizar}>ATUALIZAR</button>
            </div>
        </div>
    )
}