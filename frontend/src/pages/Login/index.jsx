import React from "react";
import "./index.scss";

export default function Login() {
  return (
    <div>
      <div class="container">
        <div class="logo">HAYAN</div>
        <div class="login-title">Faça seu login</div>
  
        <div class="login-form">
          <input placeholder="CPF" type="text" />
          <input placeholder="Email" type="text" />
          <input placeholder="Senha" type="password" />
          <div class="forgot-password">Esqueceu sua senha?</div>
          <button class="login-button">Entrar</button>
        </div>
      </div>
      
    </div>
  );
}