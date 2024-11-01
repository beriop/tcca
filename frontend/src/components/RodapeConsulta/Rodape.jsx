import React from 'react';
import { Link } from 'react-router-dom';
import './Rodape.scss';

const RodapeConsulta = () => {
  return (
    <footer className="rodape">
      <div className="grade-rodape">
        <div className="item-rodape">
          <h3>Serviços</h3>
          <Link to="/">
            Procedimentos
          </Link>
        </div>
        <div className="item-rodape">
          <h3>Clínica</h3>
          <Link to="/">
            Profissionais
          </Link>
        </div>
        <div className="item-rodape">
          <h3>Sobre a desenvolvedora</h3>
          <Link to="/">Quem somos</Link>
        </div>
        <div className="item-rodape">
          <h3>Ajuda</h3>
          <a href="https://whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11">
            Ajuda WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default RodapeConsulta;
