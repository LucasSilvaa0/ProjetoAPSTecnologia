import styles from "./new_delclient.module.css"
import { useState } from "react"
import axios from "axios"

function ClientDelete() {
    const [userEmail, setEmail] = useState('')
    const [userSenha, setSenha] = useState('')

    async function DeletarCliente() {
        // API para o backend

        var confirmacao = window.prompt("TEM CERTEZA QUE DESEJA DELETAR A CONTA? (S/N)")
        if (confirmacao !== "S") {
            return
        }

        try {

            const response = await axios.delete('http://localhost:5000/del_user', {
                data: { email: userEmail, senha: userSenha }
            })
            
            if (response.data === "OK") {
                window.alert("USUÁRIO DELETADO COM SUCESSO!")
            } else {
                window.alert("ERRO NOS DADOS DO CADASTRO DO USUÁRIO!")
            }
            
        } catch (e) {
            window.alert("ERRO!")
            console.log(e)
        }
        
    }

    return (
        <div className={styles.Inputs}>
            E-MAIL:   <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} required /> <br/>
            Senha:    <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)} required /> <br />
            <button onClick={DeletarCliente}>DELETAR CONTA!</button>
        </div>
    )
}

export default ClientDelete