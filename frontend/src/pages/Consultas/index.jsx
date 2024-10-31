import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate
import "./index.scss"; 
import Rodape from "../../components/Rodape/Rodape";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { Toaster, toast } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Estilo para o DatePicker
import axios from "axios";

const categoriasProcedimentos = [
  {
    categoria: "Odontologia",
    procedimentos: [
      "Avaliação Odontológica",
      "Limpeza Dental",
      "Restauração",
      "Exame Radiográfico",
    ],
  },
  {
    categoria: "Dermatologia",
    procedimentos: [
      "Consulta Dermatológica",
      "Tratamento de Acne",
      "Remoção de Manchas",
    ],
  },
];

export default function Consulta() {
  const navigate = useNavigate(); // Inicializa o useNavigate
  const [categoria, setCategoria] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [dataHora, setDataHora] = useState(new Date()); // Inicializa com a data atual

  const userId = localStorage.getItem("userId"); // Obtendo o ID do usuário logado

  useEffect(() => {
    // Verifica se o usuário não está logado e redireciona para a página de login
    if (!userId) {
      navigate("/login"); // Redireciona para a página de login
    }
  }, [userId, navigate]); // Dependências incluem userId e navigate

  const handleConfirmar = async () => {
    const dadosAgendamento = {
      categoria,
      procedimento,
      dataHora, // Usando o datetime que você vai enviar para o banco de dados
      idUsuario: userId, // Adiciona o ID do usuário logado
    };

    try {
      const response = await axios.post("http://localhost:5010/agendamentos", dadosAgendamento);
      if (response.status === 201) {
        toast.success("Consulta confirmada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao confirmar consulta: " + (error.response?.data?.erro || "Erro desconhecido"));
    }
  };

  const procedimentosDisponiveis = () => {
    const categoriaSelecionada = categoriasProcedimentos.find((cat) => cat.categoria === categoria);
    return categoriaSelecionada ? categoriaSelecionada.procedimentos : [];
  };

  return (
    <div>
      <Toaster />
      <Cabecalho />
      <div className="hero">
        <h2>Consultas:</h2>
        <p>
          São mais de <span>100 especialidades <br /> presenciais</span>, com
          profissionais atenciosos <br /> e equipamentos modernos que ajudam a <br /> garantir
          um resultado mais rápido e <br /> assertivo.
        </p>
      </div>
      <div className="content">
        <div className="left">
          <h3>ODONTOLOGIA</h3>
          <p><strong>Descrição:</strong></p>
          <p>Avaliações Odontológicas realizadas por um dos nossos especialistas.</p>
          <p><strong>Preparo:</strong></p>
          <p>Evitar o uso de cigarros uma hora antes.</p>
          <p><strong>Atendimento:</strong></p>
          <p>Atende a partir de 2 anos de idade. Todos os sexos.</p>
        </div>
        <div className="right">
          <p>Qual categoria gostaria de fazer?</p>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            {categoriasProcedimentos.map((cat) => (
              <option key={cat.categoria} value={cat.categoria}>
                {cat.categoria}
              </option>
            ))}
          </select>
          <p>Qual procedimento gostaria de fazer?</p>
          <select value={procedimento} onChange={(e) => setProcedimento(e.target.value)} disabled={!categoria}>
            <option value="">Selecione um procedimento</option>
            {procedimentosDisponiveis().map((proc) => (
              <option key={proc} value={proc}>
                {proc}
              </option>
            ))}
          </select>
          <p>Em qual dia e horário agendar?</p>
          <DatePicker
            selected={dataHora}
            onChange={(date) => setDataHora(date)} // Altera o estado com a data selecionada
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            minDate={new Date()} // Data mínima como a data atual
            timeIntervals={30} // Intervalo de 30 minutos
            placeholderText="Selecione uma data e hora"
          />
          <button className="button-confirm" onClick={handleConfirmar}>Confirmar</button>
        </div>
      </div>
      <Rodape />
    </div>
  );
}
