import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "react-international-phone/style.css";

export default function EditarUsuario() {
  const [nome, setNome] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) {
      toast.error("Você precisa estar logado para acessar esta página.");
      navigate("/login");
      return;
    }

    const carregarUsuario = async () => {
      try {
        const { data } = await axios.get(`http://4.172.207.208:3026/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNome(data.nome);
        setDtNascimento(data.dt_nascimento);
        setCpf(data.cpf);
        setCelular(data.nm_celular);
        setEmail(data.email);
        setSexo(data.sexo);
      } catch (error) {
        toast.error("Erro ao carregar dados do usuário.");
      }
    };
    carregarUsuario();
  }, [userId, token, navigate]);

  const isAgeValid = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const hasBirthdayPassedThisYear = 
      today.getMonth() > birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    return age > 18 || (age === 18 && hasBirthdayPassedThisYear);
  };
  
  const salvarAlteracoes = async (e) => {
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
  
    const dadosAtualizados = {
      nome,
      dt_nascimento: dtNascimento,
      cpf: cpfLimpo,
      nm_celular: celular,
      email,
      sexo,
    };
  
    try {
      await axios.put(`http://localhost:5010/usuario/${userId}`, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Usuário atualizado com sucesso!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Erro ao atualizar usuário.");
    }
  };
  

  return (
    <div className="container">
      <Toaster />
      <button className="close-button" onClick={() => navigate("/")}>✖</button>
      <h1>HAYAN</h1>
      <h2>Editar Perfil</h2>
      <form onSubmit={salvarAlteracoes}>
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
          <label>Celular</label>
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
          <label>Sexo Biológico</label>
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
        <button type="submit" className="botaoCadastrar">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
