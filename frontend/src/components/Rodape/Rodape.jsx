import React from 'react';
import { Link } from 'react-router-dom';
import './Rodape.scss';

const Rodape = ({ scrollToSection }) => {
  return (
    <footer className="rodape">
      <div className="grade-rodape">
        <div className="item-rodape">
          <h3>Serviços</h3>
          <Link to="/" onClick={() => scrollToSection('servicosRef')}>
            Procedimentos
          </Link>
        </div>
        <div className="item-rodape">
          <h3>Clínica</h3>
          <Link to="/" onClick={() => scrollToSection('profissionaisRef')}>
            Profissionais
          </Link>
        </div>
        <div className="item-rodape">
          <h3>Sobre a desenvolvedora</h3>
          <Link to="/" onClick={() => scrollToSection('quemSomosRef')}>
            Quem Somos
          </Link>
        </div>
        <div className="item-rodape">
          <h3>Ajuda</h3>
          <a href="https://whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11">
            Ajuda WhatsApp
          </a>
          <Link to="/termos-telemedicina">Termos de Telemedicina</Link>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
