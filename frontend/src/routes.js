import { BrowserRouter, Route, Routes } from "react-router-dom";

import PaginaInicio from "./pages/PaginaInicio";
import Consultas from "./pages/Consultas";
import Cadastrar from "./pages/Cadastrar";
import Login from "./pages/Login";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
