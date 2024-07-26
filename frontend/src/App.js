import Home from "./components/pages/home";
import NewClient from "./components/pages/newclient";
import ClientEdit from "./components/pages/clientedit"
import ClientDelete from "./components/pages/clientdelete";
import ClientList from "./components/pages/clientslist";
import styles from "./App.css"

export default function App() {

  function inicio() {
    window.location.replace("http://localhost:3000/")
  }

  var vallink = window.location

  var bot = <button onClick={inicio}>Voltar para página inicial</button>
  var pagina
  if (`${vallink}` === "http://localhost:3000/") {
    bot = <></>
    pagina = <Home />
  } else if (`${vallink}` === "http://localhost:3000/new_client") {
    pagina = <><h1>ESSA PÁGINA É PARA ADICIONAR UM CLIENTE NOVO</h1><NewClient /></>
  } else if (`${vallink}` === "http://localhost:3000/list_client") {
    pagina = <><h1>ESSA É A LISTA DE TODOS OS USUÁRIOS</h1><ClientList/></>
  } else if (`${vallink}` === "http://localhost:3000/edit_client/login") {
    pagina = <><h1>ESSA PÁGINA É PARA EDITAR A SUA CONTA</h1><ClientEdit /></>
  } else if (`${vallink}` === "http://localhost:3000/edit_client/edit") {
    pagina = <><h1>ESSA PÁGINA É PARA EDITAR A SUA CONTA</h1><ClientEdit /></>
  } else if (`${vallink}` === "http://localhost:3000/del_client") {
    pagina = <><h1>ESSA PÁGINA É PARA DELETAR A SUA CONTA</h1><ClientDelete /></>
  } else {
    inicio()
  }

  return (
    <div className={styles.body}>
      {bot}
      {pagina}
    </div>
  );
}
