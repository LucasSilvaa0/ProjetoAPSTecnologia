import Home from "./components/pages/home";
import NewClient from "./components/pages/newclient";
import ClientEdit from "./components/pages/clientedit";
import ClientDelete from "./components/pages/clientdelete";
import ClientList from "./components/pages/clientslist";

export default function App() {

  function inicio() {
    window.location.replace("http://localhost:3000/")
  }

  var vallink = window.location

  var bot = <button onClick={inicio}>Voltar para página inicial</button>
  var pagina
  if (`${vallink}` === "http://localhost:3000/") {
    console.log("cheguei no caso 1")
    bot = <></>
    pagina = <Home />
  } else if (`${vallink}` === "http://localhost:3000/new_client") {
    pagina = <><h1>ESSA PÁGINA É PARA ADICIONAR UM CLIENTE NOVO</h1><NewClient /></>
  } else if (`${vallink}` === "http://localhost:3000/list_client") {
    pagina = <><h1>ESSA É A LISTA DE CLIENTES</h1><ClientList/></>
  } else if (`${vallink}` === "http://localhost:3000/edit_client") {
    pagina = <><h1>ESSA PÁGINA É PARA EDITAR UA CONTA</h1><ClientEdit /></>
  } else if (`${vallink}` === "http://localhost:3000/del_client") {
    pagina = <><h1>ESSA PÁGINA É PARA DELETAR A SUA CONTA</h1><ClientDelete/></>
  } else {
    inicio()
  }

  return (
    <div>
      {bot}
      {pagina}
    </div>
  );
}
