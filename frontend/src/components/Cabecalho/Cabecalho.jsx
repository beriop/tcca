import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cabecalho.scss";

const Cabecalho = ({ scrollToSection }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const updateAuthState = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  const handleUserClick = () => {
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.reload();
  };

  const userId = localStorage.getItem("userId"); // Recupera o userId do localStorage

  return (
    <header className={`cabecalho ${scrolled ? "scrolled" : ""}`}>
      <img
        alt="Logo Hayan"
        src={
          scrolled
            ? "/assets/images/HayanBlack.png"
            : "/assets/images/Hayan.png"
        }
        className="logo"
      />
      <nav className="menu">
        <Link to="/" onClick={() => scrollToSection("inicioRef")}>
          Home
        </Link>
        <Link to="/" onClick={() => scrollToSection("servicosRef")}>
          Procedimentos
        </Link>
        <Link to="/" onClick={() => scrollToSection("profissionaisRef")}>
          Profissionais
        </Link>
        <Link to="/" onClick={() => scrollToSection("devBlackSpaceRef")}>
          Desenvolvedora
        </Link>
        <a href="https://www.whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta.">
          Contato
        </a>
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
            <span className="close" onClick={() => setShowAuthModal(false)}>
              &times;
            </span>
            <h2>{isLoggedIn ? "Bem-vindo!" : "Faça sua escolha"}</h2>
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/verconsultas" className="botao">
                    Ver Consultas
                  </Link>
                )}
                <Link to={`/editar-usuario/${userId}`} className="botao">
                  Editar Perfil
                </Link>
                <button onClick={handleLogout} className="botao">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/cadastrar" className="botao">
                  Cadastrar
                </Link>
                <Link to="/login" className="botao">
                  Logar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;
