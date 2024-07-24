import styles from './home.module.css';
import LinkButton from '../layout/linkbutton';

function Botoes() {
  return (
    <>
      <LinkButton text="Adicionar cliente" url="/new_client" />
      <LinkButton text="Lista de clientes" url="/list_client" />
      <br />
      <LinkButton text="Remover cliente" url="/del_client" />
      <LinkButton text="Editar cliente" url="/edit_client" />
    </>
  );
}

function AboutPage() {
  return (
    <div className={styles.About}>
      <h1>Sobre o site</h1>
      <p>Olá, esse é um site para cadastro de CNPJ.</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <div className={styles.Titulo}>
        <h1>APS Tecnologia</h1>
        <img src='https://apsinformatica.com.br/wp-content/uploads/2020/09/logo-horisontal.png'/>
      </div>
      <div className={styles.Botoes}>
        <Botoes />
      </div>
      <AboutPage />
    </div>
  );
}

export default Home