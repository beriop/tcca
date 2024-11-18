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
      "A Endodontia, popularmente conhecida como tratamento de canal, é a especialidade da odontologia que se dedica à prevenção e ao tratamento de doenças que afetam a polpa do dente.",
    Implante:
      "Implantodontia é um ramo da Odontologia que se destina ao tratamento do edentulismo com reabilitações protéticas suportadas ou retidas por implantes dentários. Com a Implantodontia são feitas desde reabilitações unitárias ate grandes reabilitações totais fixas ou removíveis.",
    Prótese: "A prótese dentária é a arte dental, ciência que lida com a reposição de tecidos bucais, visando restaurar e manter a forma, função, aparência e saúde bucal. Aplicados à odontologia, são utilizados indistintamente os termos prostodontia e prótese dentária.",
    "Tratamento de Gengiva": "O tratamento é focado em reduzir a inflamação local através de uma profilaxia (limpeza) que deve ser feita pelo dentista, removendo a placa bacteriana e qualquer outro resíduo alimentar. Essa remoção pode ser feita com instrumentos ultrassônicos, raspadores ou curetas.",
    Cirurgia: "São consideradas cirurgias odontológicas todas as intervenções realizadas de forma manual, ou com auxílio de instrumentos, para tratar traumatismos e doenças que afetam os tecidos bucais, a arcada dentária e a face do paciente.",
    Radiografias: "A radiografia odontológica (também conhecida como Raio-X odontológico) é um exame que utiliza doses seguras de radiação para a obtenção de imagens utilizadas em diagnósticos, no planejamento e no acompanhamento da evolução de um tratamento realizado por dentistas, cirurgiões e ortodontistas.",
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
        id="profissionais"
        className="profissionais"
        ref={profissionaisRef}
      >
        <h2>Profissionais</h2>
        <p>
          <span className="corProfi">Profissionais altamente qualificados</span>
          , <br /> prontos para oferecer o melhor cuidado.
        </p>
        <div className="grade-profissionais">
          <div className="item-profissional" data-info="Dr. Brunex">
            <img alt="Profissional 1" src="./assets/images/brunex.png" />
          </div>
          <div className="item-profissional" data-info="Dr. Wolf">
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
