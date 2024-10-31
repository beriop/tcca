import { Router } from 'express';
import { autenticar } from '../utils/jwt.js'; // Certifique-se de que a função de autenticação está importada
import * as db from '../repository/agendamentoRepository.js'; // Repositório de agendamentos

const endpoints = Router();

// Rota para agendar consulta
endpoints.post('/agendamentos', autenticar, async (req, resp) => {
    try {
        const agendamento = { ...req.body, idUsuario: req.user.id }; // Associa agendamento ao usuário logado
        const id = await db.inserirAgendamento(agendamento);
        resp.status(201).json({ novoId: id });
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

// Obter um agendamento específico por ID
endpoints.get('/agendamentos/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        const registro = await db.consultarAgendamentoPorId(id);
        if (registro) {
            resp.json(registro);
        } else {
            resp.status(404).json({ erro: 'Agendamento não encontrado' });
        }
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

// Criar um novo agendamento
endpoints.post('/agendamentos', autenticar, async (req, resp) => {
    try {
        const agendamento = { ...req.body, idUsuario: req.user.id }; // Associar o agendamento ao usuário logado
        const id = await db.inserirAgendamento(agendamento);
        resp.status(201).json({ novoId: id });
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

// Atualizar um agendamento existente
endpoints.put('/agendamentos/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        const agendamento = req.body;
        const linhasAfetadas = await db.alterarAgendamento(id, agendamento);
        
        if (linhasAfetadas > 0) {
            resp.sendStatus(204); // No Content
        } else {
            resp.status(404).json({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

// Remover um agendamento
endpoints.delete('/agendamentos/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        const linhasAfetadas = await db.removerAgendamento(id);
        
        if (linhasAfetadas > 0) {
            resp.sendStatus(204); // No Content
        } else {
            resp.status(404).json({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

// Adicionar endpoint para confirmar consulta
endpoints.post('/agendamentos/:id/confirmar', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        const confirmacao = await db.confirmarAgendamento(id); // Você precisa implementar essa função no repositório
        if (confirmacao) {
            resp.sendStatus(204); // No Content
        } else {
            resp.status(404).json({ erro: 'Agendamento não encontrado ou já confirmado' });
        }
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

export default endpoints;
