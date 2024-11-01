import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedStatus = localStorage.getItem("isLoggedIn");
    if (loggedStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const isAgeValid = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const hasBirthdayPassedThisYear = 
      today.getMonth() > birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    return age > 18 || (age === 18 && hasBirthdayPassedThisYear);
  };

  const salvarCadastro = async (e) => {
    e.preventDefault();
    const cpfLimpo = cpf.replace(/\D/g, "");

    if (!isAgeValid(dtNascimento)) {
      toast.error("Você precisa ter pelo menos 18 anos para se cadastrar.");
      return;
    }

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
      cpf: cpfLimpo,
      nm_celular: celular,
      email,
      sexo,
      senha,
    };

    try {
      const response = await axios.post("http://4.172.207.208:3026/usuario", dadosCadastro);
      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!");
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.erro && error.response.data.erro.includes("Duplicate entry")) {
        toast.error("O e-mail informado já está cadastrado.");
      } else {
        toast.error("Erro ao cadastrar: " + (error.response?.data?.erro || "Erro desconhecido"));
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="container">
      <Toaster />
      <button className="close-button" onClick={() => navigate("/")}>✖</button>
      <h1>HAYAN</h1>
      <h2>Cadastre seus dados</h2>
      <p>Estas informações também vão fazer parte do seu prontuário médico.</p>
      {!isLoggedIn ? (
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
                  setCpf(inputCpf);
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

          <button type="submit" className="botaoCadastrar">
            Cadastrar
          </button>
        </form>
      ) : (
        <div>
          <p>Bem-vindo, {nome}!</p>
          <button onClick={logout} className="botaoLogout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
