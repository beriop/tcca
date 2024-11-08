import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import Rodape from "../../components/Rodape/Rodape";
import Cabecalho from "../../components/Cabecalho/Cabecalho";

export default function PaginaInicial() {
  const [selectedService, setSelectedService] = useState("Endodontia");
  const [scrolled, setScrolled] = useState(false);

  const inicioRef = useRef(null);
  const servicosRef = useRef(null);
  const profissionaisRef = useRef(null);
  const devBlackSpaceRef = useRef(null);
  const quemSomosRef = useRef(null);

  const services = {
    "Endodontia (Canal)":
      "Tratamento de canal para preservar a polpa do dente.",
    Implante: "Substituição de dentes por implantes metálicos fixados no osso.",
    Prótese: "Reposição de dentes para estética e funcionalidade.",
    "Tratamento de Gengiva": "Prevenção e tratamento de doenças periodontais.",
    Cirurgia: "Procedimentos bucomaxilofaciais para traumas e patologias.",
    Radiografias: "Exames de imagem para diagnóstico bucal detalhado.",
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    switch (section) {
      case "inicioRef":
        inicioRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "servicosRef":
        servicosRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "profissionaisRef":
        profissionaisRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "quemSomosRef":
        quemSomosRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
        case "devBlackSpaceRef":
          devBlackSpaceRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      default:
        break;
    }
  };

  return (
    <div>
      <Cabecalho scrolled={scrolled} scrollToSection={scrollToSection} />

      <section id="inicio" className="inicial" ref={inicioRef}>
        <h1>
          Cuidar da saúde das <br /> pessoas para{" "}
          <span className="destaque">
            melhorar o <br /> mundo
          </span>
        </h1>
        <Link to="/consultas" className="botao">
          Agendar Agora
        </Link>
        <p>ou</p>
        <a
          href="https://www.whatsapp.com/channel/0029Vagr93P2kNFvuR2bQQ11?text=Ol%C3%A1%2C+gostaria+de+agendar+uma+consulta."
          className="botao-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/whatslogo.png"
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
              {selectedService === service && (
                <div className="seta-baixo"></div>
              )}
            </div>
          ))}
        </div>
        <div className="descricao-servico">
          <h3>{selectedService}</h3>
          <p>{services[selectedService]}</p>
        </div>
      </section>

      <section
        id="profissionais" className="profissionais" ref={profissionaisRef}>
        <h2>Profissionais</h2>
        <p>
          <span className="corProfi">Profissionais altamente qualificados</span>
          , <br /> prontos para oferecer o melhor cuidado.
        </p>
        <div className="grade-profissionais">
          <div className="item-profissional" data-info="Dr. Brunex">
            <img alt="Profissional 1" src="./assets/images/brunex.png" />
          </div>
          <div className="item-profissional" data-info="Dr. Lobo">
            <img alt="Profissional 2" src="./assets/images/lobox.png" />
          </div>
        </div>
      </section>

      <section id="quemSomos" className="quem-somos" ref={quemSomosRef}>
        <div className="quem-somos-container">
          <h2>Quem Somos</h2>
          <p>
            Somos uma clínica odontológica dedicada a proporcionar um
            atendimento de excelência e personalizado, focado na saúde e
            bem-estar de nossos pacientes. Nossa equipe de profissionais
            altamente qualificados oferece uma ampla gama de serviços
            odontológicos, garantindo o melhor cuidado possível para cada um de
            nossos pacientes.
          </p>
          <p>
            Com um ambiente acolhedor e equipamentos de última geração, buscamos
            não apenas tratar problemas odontológicos, mas também prevenir e
            promover a saúde bucal, impactando positivamente a vida de todos que
            nos confiam o seu sorriso.
          </p>
        </div>
      </section>

      <section
        id="Devblackspace"
        className="Devblackspace"
        ref={devBlackSpaceRef}
      >
        <div className="blackspace-container">
          <div className="blackspace-content">
            <h3 className="blackspace-text">Desenvolvido por</h3>
            <img alt="Logo Black Space" src="./assets/images/blackspace.png" />
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4345.11968819073!2d-46.70905370719574!3d-23.683267657064032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce502d2289a843%3A0x14406b17b30d0174!2sInstituto%20Social%20Nossa%20Senhora%20de%20F%C3%A1tima!5e0!3m2!1spt-BR!2sbr!4v1730201100591!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa do Instituto Social Nossa Senhora de Fátima"
          ></iframe>
        </div>
      </section>

      <Rodape scrollToSection={scrollToSection} />
    </div>
  );
}
