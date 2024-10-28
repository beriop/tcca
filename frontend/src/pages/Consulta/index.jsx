import React from "react";


export default function Consulta() {
  return (
    <div>
      <div class="header">
        <h1>HAYAN</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">Procedimentos</a>
            <a href="#">Profissionais</a>
            <a href="#">Localização</a>
            <a href="#">Contato</a>
        </nav>
        <i class="fas fa-user-circle user-icon"></i>
    </div>
    <div class="content">
        <div class="left">
            <h2>ODONTOLOGIA</h2>
            <p><strong>Descrição:</strong></p>
            <p>Avaliações Odontológicas<br/>Realizadas por um dos nossos especialistas</p>
            <p><strong>Preparo:</strong></p>
            <p>Evitar o uso de cigarros uma hora antes</p>
            <p><strong>Atendimento:</strong></p>
            <p>Atende a partir de 2 anos de idade<br/>Todos os sexos</p>
        </div>
        <div class="right">
            <p>Qual serviço gostaria de fazer?</p>
            <select>
                <option>Selecione um serviço</option>
            </select>
            <p>Em qual horario agendar?</p>
            <select>
                <option>Selecione um horario</option>
            </select>
            <button>Confirmar</button>
        </div>
    </div>
    <div class="footer">
        <div>
            <h3>HAYAN</h3>
        </div>
        <div>
            <h3>Serviços:</h3>
            <a href="#">Consultas</a>
        </div>
        <div>
            <h3>Clínica:</h3>
            <a href="#">Profissionais</a>
        </div>
        <div>
            <h3>Sobre a desenvolvedora:</h3>
            <a href="#">Quem somos</a>
        </div>
        <div>
            <h3>Ajuda:</h3>
            <a href="#">Ajuda (FAQ)</a>
            <a href="#">Ajuda Whatsapp</a>
            <a href="#">Termos de uso</a>
        </div>
    </div>
    </div>
  );
}
