import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import axios from "axios";
import CabecalhoUser from "../../components/UsuarioApenas/CabecalhoUser";
import './index.scss';

const categoriasProcedimentos = [
  {
    categoria: "Odontologia Geral",
    procedimentos: [
      "Avaliação Odontológica",
      "Limpeza Dental",
      "Restauração",
      "Exame Radiográfico",
    ],
  },
  {
    categoria: "Ortodontia",
    procedimentos: [
      "Colocação de Aparelho",
      "Ajuste de Aparelho",
      "Consulta de Manutenção",
    ],
  },
  {
    categoria: "Endodontia",
    procedimentos: ["Tratamento de Canal", "Retratamento Endodôntico"],
  },
  {
    categoria: "Implantodontia",
    procedimentos: [
      "Implante Dentário",
      "Enxerto Ósseo",
      "Manutenção de Implante",
    ],
  },
  {
    categoria: "Prótese",
    procedimentos: [
      "Prótese Parcial",
      "Prótese Total",
      "Manutenção de Prótese",
    ],
  },
];

export default function VerConsultas() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [consultaEditando, setConsultaEditando] = useState(null);
  const [categoria, setCategoria] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else if (!isAdmin) {
      toast.error("Você não tem permissão para acessar esta página.");
      navigate("/");
    }
  }, [userId, isAdmin, navigate]);

  const buscarConsultas = async () => {
    setCarregando(true);
    try {
      const response = await axios.get("http://4.172.207.208:3026/agendamentos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultas(response.data);
      toast.success(`${response.data.length} consulta(s) encontrada(s)!`);
    } catch (error) {
      toast.error("Erro ao buscar consultas: " + (error.response?.data?.erro || "Erro desconhecido"));
    } finally {
      setCarregando(false);
    }
  };

  const deletarConsulta = async (idConsulta) => {
    const confirmacao = window.confirm("Tem certeza de que deseja deletar esta consulta?");
    if (!confirmacao) return;
  
    try {
      await axios.delete(`http://4.172.207.208:3026/agendamentos/${idConsulta}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultas((prev) => prev.filter((consulta) => consulta.id !== idConsulta));
      toast.success("Consulta deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar consulta: " + (error.response?.data?.erro || "Erro desconhecido"));
    }
  };

  const abrirModalEdicao = (consulta) => {
    setConsultaEditando({ ...consulta });
    setCategoria(consulta.categoria);
    setProcedimento(consulta.procedimento);
  };

  const fecharModalEdicao = () => {
    setConsultaEditando(null);
    setCategoria("");
    setProcedimento("");
  };

  const salvarEdicao = async () => {
    try {
      const consultaAtualizada = { ...consultaEditando, categoria, procedimento };
      await axios.put(`http://4.172.207.208:3026/agendamentos/${consultaEditando.id}`, consultaAtualizada, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultas((prev) => prev.map((consulta) => 
        consulta.id === consultaEditando.id ? consultaAtualizada : consulta
      ));
      toast.success("Consulta atualizada com sucesso!");
      fecharModalEdicao();
    } catch (error) {
      toast.error("Erro ao atualizar consulta: " + (error.response?.data?.erro || "Erro desconhecido"));
    }
  };

  const procedimentosDisponiveis = () => {
    const categoriaSelecionada = categoriasProcedimentos.find(
      (cat) => cat.categoria === categoria
    );
    return categoriaSelecionada ? categoriaSelecionada.procedimentos : [];
  };

  return (
    <>
      <CabecalhoUser />
      <Toaster />
      <div className="pagina-ver-consultas">
        <h1>Consultas Agendadas</h1>
        <div className="acoes">
          <button onClick={buscarConsultas} disabled={carregando}>
            {carregando ? 'Carregando...' : 'Buscar'}
          </button>
          <button onClick={() => navigate('/')}>Voltar</button>
        </div>
        {consultas.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Categoria</th>
                <th>Procedimento</th>
                <th>Data e Hora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{consulta.id}</td>
                  <td>{consulta.usuarioNome || "Desconhecido"}</td>
                  <td>{consulta.categoria}</td>
                  <td>{consulta.procedimento}</td>
                  <td>{new Date(consulta.data).toLocaleString()}</td>
                  <td>
                    <button onClick={() => abrirModalEdicao(consulta)}>Editar</button>
                    <button onClick={() => deletarConsulta(consulta.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {consultaEditando && (
          <div className="modal">
            <div className="modal-conteudo">
              <h2>Editar Consulta</h2>
              <label>
                Categoria:
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="">Selecione uma categoria</option>
                  {categoriasProcedimentos.map((cat) => (
                    <option key={cat.categoria} value={cat.categoria}>
                      {cat.categoria}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Procedimento:
                <select value={procedimento} onChange={(e) => setProcedimento(e.target.value)} disabled={!categoria}>
                  <option value="">Selecione um procedimento</option>
                  {procedimentosDisponiveis().map((proc) => (
                    <option key={proc} value={proc}>
                      {proc}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Data e Hora:
                <input
                  type="datetime-local"
                  name="data"
                  value={new Date(consultaEditando.data).toISOString().slice(0, 16)}
                  onChange={(e) => setConsultaEditando((prev) => ({ ...prev, data: e.target.value }))}
                />
              </label>
              <div className="modal-acoes">
                <button onClick={salvarEdicao}>Salvar</button>
                <button onClick={fecharModalEdicao}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
