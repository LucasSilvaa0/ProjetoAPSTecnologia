import styles from "./clientedit.module.css"

function ClientEditEdit(user) {
    return (
        <div className={styles.body}>
            <div><br />
                <select id="colunas" multiple>
                    <option value="email">Email</option>
                    <option value="senha">Senha</option>
                    <option value="cep">CEP</option>
                    <option value="cnpj">CNPJ</option>
                    <option value="complemento">Complemento</option>
                </select><br/>
                <button>EDITAR CONTA!</button>
            </div>
        </div>
    )
}

export default ClientEditEdit