import React from "react";
import "./index.scss";

export default function Login() {
  return (
    <div>
      <div class="container">
        <div class="logo">HAYAN</div>
        <div class="login-title">Faça seu login</div>
        <div class="google-login">
          <img
            alt="Google logo"
            height="20"
            src="https://storage.googleapis.com/a1aa/image/6518bTpey6W7VKgQVPTe1IuOfEeq7pbfOWmhvEawkhkKkoYdC.jpg"
            width="20"
          />
        </div>
        <div class="or">ou</div>
        <div class="login-form">
          <input placeholder="Email" type="text" />
          <input placeholder="Senha" type="password" />
          <div class="forgot-password">Esqueceu sua senha?</div>
          <button class="login-button">Entrar</button>
        </div>
      </div>
      <div class="footer">
        <div>
          <span>HAYAN</span>
        </div>
        <div>
          <span>Serviços:</span>
          Consultas
        </div>
        <div>
          <span>Clínica:</span>
          Profissionais
        </div>
        <div>
          <span>Sobre a desenvolvedora:</span>
          Quem somos
        </div>
        <div>
          <span>Ajuda:</span>
          Ajuda (FAQ)
          <br />
          Ajuda Whatsapp
          <br />
          Termos de uso
        </div>
      </div>
    </div>
  );
}
