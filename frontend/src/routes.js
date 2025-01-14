import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaInicio from "./pages/PaginaInicio";
import Consultas from "./pages/Consultas";
import Cadastrar from "./pages/Cadastrar";
import Login from "./pages/Login";
import VerConsultas from "./pages/VerConsultas";
import EditarUsuario from './pages/EditarUsuario';

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verconsultas" element={<VerConsultas />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />;
      </Routes>
    </BrowserRouter>
  );
}
