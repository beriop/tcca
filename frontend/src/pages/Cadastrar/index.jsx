import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./index.scss";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);

  const navigate = useNavigate();

  // Função para salvar os dados do cadastro
  const salvarCadastro = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    const dadosCadastro = {
      nome,
      idade,
      cpf,
      celular,
      email,
      sexo,
      senha,
    };

    console.log(dadosCadastro); // Apenas para visualização no console

    // Navegar para outra página após o cadastro
    navigate("/"); // Redireciona para a página inicial após o cadastro
  };

  // Referências para as seções
  const informacoesRef = useRef(null);
  const beneficiosRef = useRef(null);
  const contatoRef = useRef(null);


  return (
    <div className="container">
      <h1>HAYAN</h1>
      <h2>Cadastre seus dados</h2>
      <p>Estas informações também vão fazer parte do seu prontuário médico.</p>

      <form onSubmit={salvarCadastro}>
        <div className="grupo-formulario">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label>Qual sua idade</label>
          <input
            type="date"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label>Qual seu número</label>
          <PhoneInput
            defaultCountry="br" // Altere para o código de país desejado
            value={celular}
            onChange={(phone) => setCelular(phone)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label>Escolha seu sexo biológico</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>
        <div className="grupo-formulario">
          <label>Escolha uma senha</label>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <input
            type="password"
            placeholder="Repita a senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <div className="grupo-formulario">
          <input
            type="checkbox"
            id="terms"
            checked={aceitoTermos}
            onChange={(e) => setAceitoTermos(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            Aceito os <Link to="#">termos de telemedicina</Link>
          </label>
        </div>
        <button type="submit" className="botao">
          Cadastrar
        </button>
      </form>

      <footer className="rodape">
        <div className="grade-rodape">
          <div className="item-rodape">
            <h3>Serviços</h3>
            <Link to="#inicio">Consultas</Link>
          </div>
          <div className="item-rodape">
            <h3>Clínica</h3>
            <Link to="#profissionais">Profissionais</Link>
          </div>
          <div className="item-rodape">
            <h3>Sobre a desenvolvedora</h3>
            <Link to="/sobre">Quem somos</Link>
          </div>
          <div className="item-rodape">
            <h3>Ajuda</h3>
            <Link to="/faq">Ajuda (FAQ)</Link>
            <a href="https://whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11">
              Ajuda WhatsApp
            </a>
            <Link to="/termos-telemedicina">Termos de Telemedicina</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
