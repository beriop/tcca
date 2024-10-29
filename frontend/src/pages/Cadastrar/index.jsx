import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
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

    const cpfLimpo = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (!cpfValidator.isValid(cpfLimpo)) {
      toast.error("CPF inválido!");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (!celular) {
      toast.error("Por favor, insira um número de celular completo.");
      return;
    }

    const dadosCadastro = {
      nome,
      dtNascimento,
      cpf: cpfLimpo, // Usando o CPF limpo
      nm_celular: celular,
      email,
      sexo,
      senha,
    };

    try {
      await axios.post("http://localhost:5010/usuario", dadosCadastro);
      toast.success("Cadastro realizado com sucesso!");

      // Salvar que o usuário está logado
      localStorage.setItem("isLoggedIn", true); // Exemplo simples de armazenamento

      // Adiciona um pequeno atraso antes de navegar
      setTimeout(() => {
        navigate("/");
      }, 2000); // 2000 milissegundos = 2 segundos
    } catch (error) {
      toast.error(
        "Erro ao cadastrar: " +
          (error.response?.data?.erro || "Erro desconhecido")
      );
    }
  };

  return (
    <div className="container">
      <Toaster />
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
            onChange={(e) => {
              const inputCpf = e.target.value;
              if (inputCpf.length <= 11) {
                setCpf(inputCpf); // Permite apenas até 11 caracteres
              }
            }}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label>Qual seu número</label>
          <PhoneInput
            defaultCountry="br"
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
