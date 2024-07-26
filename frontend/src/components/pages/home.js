import styles from './home.module.css';
import LinkButton from '../layout/linkbutton';

function Botoes() {
  return (
    <>
      <LinkButton text="Adicionar cliente" url="new_client" />
      <LinkButton text="Lista de clientes" url="list_client" />
      <br />
      <LinkButton text="Remover cliente" url="del_client" />
      <LinkButton text="Editar cliente" url="edit_client/login" />
    </>
  );
}

function Home() {
  return (
    <div>
      <div className={styles.Botoes}>
        <Botoes />
      </div>
    </div>
  );
}

export default Home