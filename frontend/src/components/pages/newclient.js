import styles from "./newclient.module.css"

function NewClient() {
    function AdicionarCliente() {
        // API para o backend
    }

    return (
        <div className={styles.Inputs}>
            Nome:     <input type="text" id="name"></input> <br/>
            Apelido:  <input type="text" id="apelido"></input> <br/>
            CNPJ:     <input type="text" id="cnpj"></input> <br/>
            CEP:      <input type="text" id="cep"></input> <br/>
            E-MAIL:   <input type="text" id="email"></input> <br/>
            TELEFONE: <input type="text" id="telefone"></input> <br/>
            <button onClick={AdicionarCliente}>Adicionar cliente</button>
        </div>
    )
}

export default NewClient