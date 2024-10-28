import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Consultar() {
  const [token, setToken] = useState(null);
  const [listaNegra, setListaNegra] = useState([]);
  const navigate = useNavigate();

  async function buscar() {
    if (!token) return;
    const url = `http://localhost:5010/listaNegra?x-access-token=${token}`;
    try {
      const resp = await axios.get(url);
      setListaNegra(resp.data);
    } catch (error) {
      alert('Erro ao buscar lista negra: ' + error.response.data.erro);
    }
  }

  async function excluir(id) {
    const url = `http://localhost:5010/listaNegra/${id}?x-access-token=${token}`;
    try {
      await axios.delete(url);
      await buscar();
    } catch (error) {
      alert('Erro ao excluir: ' + error.response.data.erro);
    }
  }

  async function sair() {
    localStorage.removeItem('USUARIO');
    navigate('/');
  }

  useEffect(() => {
    const usuarioToken = localStorage.getItem('USUARIO');
    setToken(usuarioToken);
    if (!usuarioToken || usuarioToken === 'null') {
      navigate('/');
    } else {
      buscar();
    }
  }, [navigate]);

  return (
    <div className='pagina-consultar'>
      <h2>Bem-vindo {token?.nome}</h2>
      <button onClick={sair}>Sair</button>
      <h1> CONSULTAR </h1>
      <button onClick={buscar}>Buscar</button>
      <button><Link to={'/cadastrar'}>Cadastrar</Link></button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Motivo</th>
            <th>Vingança</th>
            <th>Nota de Ódio</th>
            <th>Perdoado?</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaNegra.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.motivo}</td>
              <td>{new Date(item.vinganca).toLocaleDateString()}</td>
              <td>{item.notaOdio}</td>
              <td>{item.perdoado ? 'Sim' : 'Não'}</td>
              <td>
                <Link to={`/cadastrar/${item.id}`}>Alterar</Link>
                <button onClick={() => excluir(item.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
