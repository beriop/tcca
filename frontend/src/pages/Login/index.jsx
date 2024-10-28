import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const dadosLogin = {
      email,
      senha,
    };

    try {
      const response = await axios.post('http://localhost:5010/entrar', dadosLogin); // Ajuste para a URL correta
      console.log(response.data); // Log para depuração
      const token = response.data.token; // Salve o token se necessário
      localStorage.setItem('token', token); // Armazene o token no localStorage, se necessário
      navigate("/consultar"); // Redireciona para a página de consulta após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error); // Log para depuração
      alert('Erro ao fazer login: ' + (error.response?.data?.erro || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  );
}
