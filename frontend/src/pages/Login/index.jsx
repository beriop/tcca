import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./index.scss";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const realizarLogin = async (e) => {
    e.preventDefault();

    const cpfLimpo = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

    try {
      const response = await axios.post("http://localhost:5010/entrar", {
        cpf: cpfLimpo,
        email,
        senha,
      });

      const { token } = response.data;

      // Salvar o token e o estado do login
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);
      toast.success("Login realizado com sucesso!");

      navigate("/");
    } catch (error) {
      toast.error(
        "Erro ao fazer login: " +
          (error.response?.data?.erro || "Erro desconhecido")
      );
    }
  };

  return (
    <div>
      <div className="container">
        <Toaster />
        <div className="logo">HAYAN</div>
        <div className="login-title">Faça seu login</div>

        <div className="login-form">
          <input
            placeholder="CPF"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="forgot-password">Esqueceu sua senha?</div>
          <button className="login-button" onClick={realizarLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
