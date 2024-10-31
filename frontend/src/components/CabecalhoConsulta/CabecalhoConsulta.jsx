import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CabecalhoConsulta.scss';

const Cabecalho = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  return (
    <header className={`cabecalho ${scrolled ? "scrolled" : ""}`}>
      <img
        alt="Logo Hayan"
        src={scrolled ? "/assets/images/HayanBlack.png" : "/assets/images/Hayan.png"}
        className="logo"
      />
      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/">Procedimentos</Link>
        <Link to="/">Profissionais</Link>
        <Link to="/">Desenvolvedora</Link>
        <a href="https://www.whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta.">Contato</a>
      </nav>
      <img
        src="/assets/images/perfil.png"
        alt="Logo Perfil"
        className="icone-perfil"
        onClick={handleUserClick}
      />
      {showAuthModal && (
        <div className="auth-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAuthModal(false)}>&times;</span>
            <h2>Faça sua escolha</h2>
            <Link to="/cadastrar" className="botao">Cadastrar</Link>
            <Link to="/login" className="botao">Logar</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;
