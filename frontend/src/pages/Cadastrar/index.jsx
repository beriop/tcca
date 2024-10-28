import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import axios from 'axios';
import "react-international-phone/style.css";
import "./index.scss";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const navigate = useNavigate();

  const salvarCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const dadosCadastro = {
      nome,
      dt_nascimento: dtNascimento,
      cpf,
      nm_celular: celular, // Ajustando o nome do campo celular para 'nm_celular'
      email,
      sexo,
      senha,
    };

    try {
      const response = await axios.post('http://localhost:5010/usuario', dadosCadastro);
      alert('Cadastro realizado com sucesso! ID do novo usuário: ' + response.data.novoId);
      navigate("/"); 
    } catch (error) {
      alert('Erro ao cadastrar: ' + (error.response?.data?.erro || 'Erro desconhecido'));
    }
  };

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
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={dtNascimento}
            onChange={(e) => setDtNascimento(e.target.value)}
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
            defaultCountry="br"
            value={celular}
            onChange={(phone) => setCelular(phone)} // Garantindo que o valor do número de celular seja atualizado
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
            <option value="">Selecione</option>
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
    </div>
  );
}
