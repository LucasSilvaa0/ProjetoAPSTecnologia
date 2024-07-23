import './App.css';

function MyButton() {
  const botoes = [
    {type: "Adicionar cliente"},
    {type: "Lista de clientes"},
    {type: "Remover cliente"},
    {type: "Editar cliente"}
  ]

  const listButtons = botoes.map(botao =>
    <>
      <button className='Botao'>
        {botao.type}
      </button>
    </>
  )

  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <>
      {listButtons[0]}
      {listButtons[1]}
      <br />
      {listButtons[2]}
      {listButtons[3]}
    </>
  );
}

function AboutPage() {
  return (
    <div className='About'>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </div>
  );
}

export default function App() {
  return (
    <div className='App'>
      <div className='Titulo'>
        <h1>APS Tecnologia</h1>
        <img src='https://apsinformatica.com.br/wp-content/uploads/2020/09/logo-horisontal.png'/>
      </div>
      <div className='Botoes'>
        <MyButton />
      </div>
      <AboutPage />
    </div>
  );
}
