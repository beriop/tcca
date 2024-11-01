import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CabecalhoUser.scss';

const CabecalhoUser = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  
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

  return (
      <header className={`cabecalho ${scrolled ? "scrolled" : ""}`}>
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
                      <h2>{isLoggedIn ? "Bem-vindo!" : "Faça sua escolha"}</h2>
                      {!isLoggedIn ? (
                          <>
                              <Link to="/cadastrar" className="botao">Cadastrar</Link>
                              <Link to="/login" className="botao">Logar</Link>
                          </>
                      ) : (
                          <>
                              {isAdmin && <Link to="/verconsultas" className="botao">Ver Consultas</Link>}
                              <button onClick={handleLogout} className="botao">Sair</button>
                          </>
                      )}
                  </div>
              </div>
          )}
      </header>
  );
};

export default CabecalhoUser;
