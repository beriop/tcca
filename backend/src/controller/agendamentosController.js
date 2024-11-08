import { autenticar } from '../utils/jwt.js';
import * as db from '../repository/agendamentoRepository.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.get('/agendamentos', autenticar, async (req, resp) => {
    try {
        if (!req.user.isAdmin) {
            return resp.status(403).json({ erro: "Acesso negado" });
        }

        const registros = await db.consultarTodosAgendamentos();
        resp.json(registros);
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

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

endpoints.post('/agendamentos', autenticar, async (req, resp) => {
    try {
        const agendamento = { ...req.body, idUsuario: req.user.id };

        const agendamentosExistentes = await db.consultarAgendamentos(agendamento.idUsuario);
        if (agendamentosExistentes.length > 0) {
            return resp.status(400).json({ erro: "Você já tem uma consulta agendada. Cancele-a antes de agendar outra." });
        }

        const id = await db.inserirAgendamento(agendamento);
        resp.status(201).json({ novoId: id });
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

endpoints.put('/agendamentos/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        const agendamento = req.body;
        const linhasAfetadas = await db.alterarAgendamento(id, agendamento);
        
        if (linhasAfetadas > 0) {
            resp.sendStatus(204);
        } else {
            resp.status(404).json({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

endpoints.delete('/agendamentos/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        const linhasAfetadas = await db.removerAgendamento(id);
        
        if (linhasAfetadas > 0) {
            resp.sendStatus(204);
        } else {
            resp.status(404).json({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

export default endpoints;