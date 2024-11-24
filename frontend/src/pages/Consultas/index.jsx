import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import RodapeConsulta from "../../components/RodapeConsulta/Rodape";
import CabecalhoConsulta from "../../components/CabecalhoConsulta/Cabecalho";
import { Toaster, toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

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

export default function Consulta() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [dataHora, setDataHora] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleConfirmar = async () => {
    if (!dataHora) {
      toast.error("Por favor, selecione uma data e hora válida.");
      return;
    }

    const dadosAgendamento = {
      categoria,
      procedimento,
      dataHora: dataHora.toISOString(),
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5010/agendamentos",
        dadosAgendamento,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Consulta confirmada com sucesso!");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.erro ===
          "Você já tem uma consulta agendada. Cancele-a antes de agendar outra."
      ) {
        toast.error(
          "Você já tem uma consulta agendada. Cancele-a antes de agendar outra."
        );
      } else {
        toast.error(
          "Erro ao confirmar consulta: " +
            (error.response?.data?.erro || "Erro desconhecido")
        );
      }
    }
  };

  const procedimentosDisponiveis = () => {
    const categoriaSelecionada = categoriasProcedimentos.find(
      (cat) => cat.categoria === categoria
    );
    return categoriaSelecionada ? categoriaSelecionada.procedimentos : [];
  };

  return (
    <div>
      <Toaster />
      <CabecalhoConsulta />
      <div className="hero">
        <h2>Consultas:</h2>
        <p>
          São mais de{" "}
          <span>
            100 especialidades <br /> presenciais
          </span>
          , com profissionais atenciosos <br /> e equipamentos modernos que
          ajudam a <br /> garantir um resultado mais rápido e <br /> assertivo.
        </p>
      </div>
      <div className="content">
        <div className="left">
          <h3>ODONTOLOGIA</h3>
          <p>
            <strong>Descrição:</strong>
          </p>
          <p>
            Avaliações Odontológicas realizadas por um dos nossos especialistas.
          </p>
          <p>
            <strong>Preparo:</strong>
          </p>
          <p>Evitar o uso de cigarros uma hora antes.</p>
          <p>
            <strong>Atendimento:</strong>
          </p>
          <p>Atende a partir de 18 anos de idade. Todos os sexos.</p>
          <p>
            <strong>Ajuda:</strong>
          </p>
          <p>Caso queira cancelar ou mudar a consulta, entre em contato pelo whatsapp.</p>
        </div>
        <div className="right">
          <p>Qual categoria gostaria de fazer?</p>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categoriasProcedimentos.map((cat) => (
              <option key={cat.categoria} value={cat.categoria}>
                {cat.categoria}
              </option>
            ))}
          </select>
          <p>Qual procedimento gostaria de fazer?</p>
          <select
            value={procedimento}
            onChange={(e) => setProcedimento(e.target.value)}
            disabled={!categoria}
          >
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
            onChange={(date) => setDataHora(date)}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            minDate={new Date()}
            timeIntervals={30}
            placeholderText="Selecione uma data e hora"
            minTime={setHours(setMinutes(new Date(), 0), 8)}
            maxTime={setHours(setMinutes(new Date(), 0), 17)}
          />
          <button className="button-confirm" onClick={handleConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
      <RodapeConsulta />
    </div>
  );
}