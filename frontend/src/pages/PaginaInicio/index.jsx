import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.scss";

export default function PaginaInicial() {
  const [selectedService, setSelectedService] = useState("Endodontia");
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Referências para as seções
  const inicioRef = useRef(null);
  const servicosRef = useRef(null);
  const profissionaisRef = useRef(null);
  const devBlackSpaceRef = useRef(null);
  const contatoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = {
    "Endodontia (Canal)":
      "A Endodontia, popularmente conhecida como tratamento de canal, é a especialidade da odontologia que se dedica à prevenção e ao tratamento de doenças que afetam a polpa do dente.",
    Implante:
      "O implante dentário é uma técnica que permite substituir dentes perdidos por estruturas metálicas fixadas no osso da mandíbula.",
    Prótese:
      "A prótese dentária é uma área da odontologia que trabalha com a reposição de dentes perdidos, promovendo estética e funcionalidade.",
    "Tratamento de Gengiva":
      "Tratamentos focados na prevenção e cura de doenças periodontais, que afetam as gengivas e o osso de suporte dos dentes.",
    Cirurgia:
      "A cirurgia bucomaxilofacial trata patologias e traumas na região da boca, face e pescoço, envolvendo extrações e outros procedimentos complexos.",
    Radiografias:
      "Exames de imagem que ajudam no diagnóstico de problemas bucais, permitindo uma análise detalhada da saúde dos dentes e ossos.",
  };

  const handleUserClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      navigate('/perfil');
    }
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <header className={`cabecalho ${scrolled ? "scrolled" : ""}`}>
        <img
          alt="Logo Hayan"
          src={
            scrolled
              ? "./assets/images/HayanBlack.png"
              : "./assets/images/Hayan.png"
          }
          className="logo"
        />
        <nav className="menu">
          <Link to="#" onClick={() => scrollToSection(inicioRef)}>Home</Link>
          <Link to="#" onClick={() => scrollToSection(servicosRef)}>Procedimentos</Link>
          <Link to="#" onClick={() => scrollToSection(profissionaisRef)}>Profissionais</Link>
          <Link to="#" onClick={() => scrollToSection(devBlackSpaceRef)}>Desenvolvedora</Link>
          <Link to="#" onClick={() => ("https://www.whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta.?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta.")}>Contato</Link>
        </nav>
        <img
          src="./assets/images/perfil.png"
          alt="Logo Perfil"
          className="icone-perfil"
          onClick={handleUserClick}
        />
      </header>

      {showAuthModal && (
        <div className="auth-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAuthModal(false)}>
              &times;
            </span>
            <h2>Faça sua escolha</h2>
            <button onClick={() => navigate('/cadastrar')}>Cadastrar</button>
            <button onClick={() => navigate('/login')}>Logar</button>
          </div>
        </div>
      )}

      <section id="inicio" className="inicial" ref={inicioRef}>
        <h1>
          Cuidar da saúde das <br /> pessoas para{" "}
          <span className="destaque">
            melhorar o <br /> mundo
          </span>
        </h1>
        <Link to="/consultas" className="botao">
          Agendar Agora
        </Link>{" "}
        <p>ou</p>
        <a
          href="https://www.whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta.?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta."
          className="botao-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="./assets/images/whatslogo.png"
            alt="Logo WhatsApp"
            className="logo-whatsapp"
          />
          Agende uma consulta pelo WhatsApp
        </a>
      </section>

      <section id="servicos" className="servicos" ref={servicosRef}>
        <h2 className="titulo-servicos">
          Fazemos mais de 100 serviços de odontologia
        </h2>

        <div className="grade-servicos">
          {Object.keys(services).map((service) => (
            <div
              key={service}
              className={`item-servico ${
                selectedService === service ? "selected" : ""
              }`}
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

      <section id="profissionais" className="profissionais" ref={profissionaisRef}>
        <h2>Profissionais</h2>
        <p>
          <span className="corProfi">Profissionais altamente qualificados</span>
          ,
          <br /> prontos para oferecer o melhor cuidado.
        </p>
        <div className="grade-profissionais">
          <div className="item-profissional">
            <img
              alt="Profissional 1"
              height="300"
              src="./assets/images/.png"
              width="200"
            />
          </div>
          <div className="item-profissional">
            <img
              alt="Profissional 2"
              height="300"
              src="./assets/images/.png"
              width="200"
            />
          </div>
        </div>
      </section>

      <section id="Devblackspace" className="Devblackspace" ref={devBlackSpaceRef}>
        <div className="blackspace">
          <h3 className="blackspace-text">Desenvolvido por</h3>
          <img alt="Logo Black Space" src="./assets/images/blackspace.png" />
        </div>
      </section>

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
            <a href="https://whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11">
              Ajuda WhatsApp
            </a>
            <Link to="/termos-telemedicina">Termos de Telemedicina</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
