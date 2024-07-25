import styles from "./newclient.module.css"
import { useState } from "react"

function NewClient() {
    const [nome, setNome] = useState('')
    const [apelido, setApelido] = useState('')
    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [cep, setCep] = useState('')
    const [telefone, setTelefone] = useState('')

    async function AdicionarCliente() {
        // API para o backend
        window.alert("cheguei aqui 0")

        try {
            window.alert("cheguei aqui 1")

            var usuario = {
                nome,
                apelido,
                senha,
                email,
                cnpj,
                cep,
                telefone
            }

            window.alert("cheguei aqui 2")

            const response = await fetch('http://localhost:5000/new_user', {
                method: 'POST',
                body: JSON.stringify(usuario)
            });
            
            window.alert("cheguei aqui 3")

            if (response.ok) {
                window.alert("USUÁRIO CADASTRADO COM SUCESSO!")
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
            Nome:     <input type="text" id="name" onChange={(e) => setNome(e.target.value)} required /> <br/>
            Apelido:  <input type="text" id="apelido" onChange={(e) => setApelido(e.target.value)} required /> <br/>
            Senha:    <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)} required /> <br />
            CNPJ:     <input type="text" id="cnpj" onChange={(e) => setCnpj(e.target.value)} required /> <br/>
            CEP:      <input type="text" id="cep" onChange={(e) => setCep(e.target.value)} required /> <br/>
            E-MAIL:   <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} required /> <br/>
            TELEFONE: <input type="text" id="telefone" onChange={(e) => setTelefone(e.target.value)} required /> <br/>
            <button onClick={AdicionarCliente}>Adicionar cliente</button>
        </div>
    )
}

export default NewClient