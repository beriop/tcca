import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.scss";

export default function PaginaInicial() {
  const [selectedService, setSelectedService] = useState("Endodontia");
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Referências para seções da página
  const inicioRef = useRef(null);
  const servicosRef = useRef(null);
  const profissionaisRef = useRef(null);
  const devBlackSpaceRef = useRef(null);
  const contatoRef = useRef(null);

  // Dados de serviços
  const services = {
    "Endodontia (Canal)": "Tratamento de canal para preservar a polpa do dente.",
    "Implante": "Substituição de dentes por implantes metálicos fixados no osso.",
    "Prótese": "Reposição de dentes para estética e funcionalidade.",
    "Tratamento de Gengiva": "Prevenção e tratamento de doenças periodontais.",
    "Cirurgia": "Procedimentos bucomaxilofaciais para traumas e patologias.",
    "Radiografias": "Exames de imagem para diagnóstico bucal detalhado."
  };

  // Detecta a rolagem para aplicar estilo ao cabeçalho
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para navegação do usuário
  const handleUserClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      navigate('/perfil');
    }
  };

  // Função para rolar até uma seção específica
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Cabeçalho */}
      <header className={`cabecalho ${scrolled ? "scrolled" : ""}`}>
        <img
          alt="Logo Hayan"
          src={scrolled ? "./assets/images/HayanBlack.png" : "./assets/images/Hayan.png"}
          className="logo"
        />
        <nav className="menu">
          <Link to="#" onClick={() => scrollToSection(inicioRef)}>Home</Link>
          <Link to="#" onClick={() => scrollToSection(servicosRef)}>Procedimentos</Link>
          <Link to="#" onClick={() => scrollToSection(profissionaisRef)}>Profissionais</Link>
          <Link to="#" onClick={() => scrollToSection(devBlackSpaceRef)}>Desenvolvedora</Link>
          <a href="https://www.whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta.">Contato</a>
        </nav>
        <img
          src="./assets/images/perfil.png"
          alt="Logo Perfil"
          className="icone-perfil"
          onClick={handleUserClick}
        />
      </header>

      {/* Modal de Autenticação */}
      {showAuthModal && (
        <div className="auth-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAuthModal(false)}>&times;</span>
            <h2>Faça sua escolha</h2>
            <button onClick={() => navigate('/cadastrar')}>Cadastrar</button>
            <button onClick={() => navigate('/login')}>Logar</button>
          </div>
        </div>
      )}

      {/* Seção Inicial */}
      <section id="inicio" className="inicial" ref={inicioRef}>
        <h1>Cuidar da saúde das <br /> pessoas para <span className="destaque">melhorar o <br /> mundo</span></h1>
        <Link to="/consultas" className="botao">Agendar Agora</Link>
        <p>ou</p>
        <a
          href="https://www.whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta."
          className="botao-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="./assets/images/whatslogo.png" alt="Logo WhatsApp" className="logo-whatsapp" />
          Agende uma consulta pelo WhatsApp
        </a>
      </section>

      {/* Seção Serviços */}
      <section id="servicos" className="servicos" ref={servicosRef}>
        <h2 className="titulo-servicos">Fazemos mais de 100 serviços de odontologia</h2>
        <div className="grade-servicos">
          {Object.keys(services).map((service) => (
            <div
              key={service}
              className={`item-servico ${selectedService === service ? "selected" : ""}`}
              onClick={() => setSelectedService(service)}
            >
              <p>{service}</p>
            </div>
          ))}
        </div>
        <div className="descricao-servico">
          <h3>{selectedService}</h3>
          <p>{services[selectedService]}</p>
        </div>
      </section>

      {/* Seção Profissionais */}
      <section id="profissionais" className="profissionais" ref={profissionaisRef}>
        <h2>Profissionais</h2>
        <p><span className="corProfi">Profissionais altamente qualificados</span>, <br /> prontos para oferecer o melhor cuidado.</p>
        <div className="grade-profissionais">
          <div className="item-profissional">
            <img alt="Profissional 1" src="./assets/images/profissional1.png" />
          </div>
          <div className="item-profissional">
            <img alt="Profissional 2" src="./assets/images/profissional2.png" />
          </div>
        </div>
      </section>

      {/* Seção Desenvolvedora */}
      <section id="Devblackspace" className="Devblackspace" ref={devBlackSpaceRef}>
        <div className="blackspace">
          <h3 className="blackspace-text">Desenvolvido por</h3>
          <img alt="Logo Black Space" src="./assets/images/blackspace.png" />
        </div>
      </section>

      {/* Rodapé */}
      <footer className="rodape" ref={contatoRef}>
        <div className="grade-rodape">
          <div className="item-rodape">
            <h3>Serviços</h3>
            <Link to="#" onClick={() => scrollToSection(servicosRef)}>Procedimentos</Link>
          </div>
          <div className="item-rodape">
            <h3>Clínica</h3>
            <Link to="#" onClick={() => scrollToSection(profissionaisRef)}>Profissionais</Link>
          </div>
          <div className="item-rodape">
            <h3>Sobre a desenvolvedora</h3>
            <Link to="/sobre">Quem somos</Link>
          </div>
          <div className="item-rodape">
            <h3>Ajuda</h3>
            <Link to="/faq">Ajuda (FAQ)</Link>
            <a href="https://whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11">Ajuda WhatsApp</a>
            <Link to="/termos-telemedicina">Termos de Telemedicina</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
