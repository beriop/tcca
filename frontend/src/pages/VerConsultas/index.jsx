import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import axios from "axios";
import CabecalhoUser from "../../components/UsuarioApenas/CabecalhoUser";
import './index.scss'; 

export default function VerConsultas() {
    const navigate = useNavigate();
    const [consultas, setConsultas] = useState([]);
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") === "true"; 
    const token = localStorage.getItem("token"); 

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        } else if (!isAdmin) {
            toast.error("Você não tem permissão para acessar esta página.");
            navigate("/"); 
        } else {
            buscarConsultas();
        }
    }, [userId, isAdmin, navigate]);

    const buscarConsultas = async () => {
        try {
            const response = await axios.get("http://localhost:5010/agendamentos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setConsultas(response.data);
            toast.success(`${response.data.length} consulta(s) encontrada(s)!`);
        } catch (error) {
            toast.error("Erro ao buscar consultas: " + (error.response?.data?.erro || "Erro desconhecido"));
        }
    };

    return (
        <>
            <CabecalhoUser />
            <Toaster />
            <div className="pagina-ver-consultas">
                <h1>Consultas Agendadas</h1>
                <div className="acoes">
                    <button onClick={buscarConsultas}>Buscar</button>
                    <button onClick={() => navigate('/')}>Voltar</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuário</th>
                            <th>Categoria</th>
                            <th>Procedimento</th>
                            <th>Data e Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((consulta) => (
                            <tr key={consulta.id}>
                                <td>{consulta.id}</td>
                                <td>{consulta.usuarioNome || "Desconhecido"}</td>
                                <td>{consulta.categoria}</td>
                                <td>{consulta.procedimento}</td>
                                <td>{new Date(consulta.data).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
