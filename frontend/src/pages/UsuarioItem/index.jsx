import React from "react";
import { useNavigate } from "react-router-dom";

const UsuarioItem = ({ usuario }) => {
  const navigate = useNavigate();

  const editarUsuario = () => {
    if (usuario.id) {
      navigate(`/editar-usuario/${usuario.id}`); // Passando o ID do usuário na URL
    } else {
      console.error("ID do usuário não disponível.");
    }
  };

  return (
    <div onClick={editarUsuario}>
      <h3>{usuario.nome}</h3>
      {/* Outros detalhes do usuário */}
    </div>
  );
};

export default UsuarioItem;
