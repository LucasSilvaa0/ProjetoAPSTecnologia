import { useState } from 'react'

function Condicional() {

    const [email, setEmail] = useState()
    const [userEmail, setUserEmail] = useState()

    function enviarEmail(e) {
        e.preventDefault()
        setUserEmail(email)
        console.log(userEmail)
    }

    return (
        <div>
            <h2>Cadastr o seu email:</h2>
            <form>
                <input 
                    type='email' 
                    placeholder='digite o seu email...' 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button type="submit" onClick={enviarEmail}>Enviar e-mail</button>
            </form>
        </div>
    )
}

export default Condicional