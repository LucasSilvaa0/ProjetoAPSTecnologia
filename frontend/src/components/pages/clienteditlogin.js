import styles from "./new_delclient.module.css"
import { useState } from "react"
import Logar from "./clientedit"

function ClientEditLogin() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return (
        <>
            <h2>Faça o seu login.</h2>
            <div className={styles.Inputs}>
                E-MAIL:   <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} required /> <br/>
                Senha:    <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)} required /> <br />
                <button onClick={() => Logar(email, senha)} >EDITAR CONTA!</button>
            </div>
        </>
    )
}

export default ClientEditLogin