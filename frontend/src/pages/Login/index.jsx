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
  
        const { token, id, isAdmin } = response.data; // Incluindo isAdmin aqui
  
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id); 
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", isAdmin); // Salva o status de admin
        localStorage.setItem("token", response.data.token);
  
        toast.success("Login realizado com sucesso!");
        navigate("/"); // Redireciona para a página inicial
    } catch (error) {
        toast.error("Erro ao realizar login: " + (error.response?.data?.erro || "Erro desconhecido"));
    } finally {
        setLoading(false);
    }
  };

  const handleCpfChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere que não seja número
    if (inputValue.length <= 11) { // Limita a 11 dígitos
      setCpf(inputValue);
    }
  };

  return (
    <div className="container">
      <Toaster />
      <button className="close-button" onClick={() => navigate("/")}>✖</button>
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
          onChange={handleCpfChange} // Usa a nova função para controlar a entrada do CPF
          maxLength={11} // Limita a 11 caracteres
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
