import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./index.scss";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const realizarLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const cpfLimpo = cpf.replace(/\D/g, ""); 
  
    try {
      const response = await axios.post("http://localhost:5010/entrar", {
        cpf: cpfLimpo,
        email,
        senha,
      });
  
      const { token, id } = response.data; // Supondo que o ID do usuário é retornado aqui
  
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id); // Armazenando o ID do usuário
      localStorage.setItem("isLoggedIn", "true");
  
      toast.success("Login realizado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      toast.error("Erro ao realizar login: " + (error.response?.data?.erro || "Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Toaster />
      <img
        alt="Logo Hayan"
        src={"/assets/images/HayanBlack.png"}
        className="logo"
      />
      <h2 className="login-title">Faça seu Login</h2>
      <form onSubmit={realizarLogin} className="login-form">
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <a href="/recuperar-senha" className="forgot-password">Esqueceu a senha?</a>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
