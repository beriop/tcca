import { autenticar } from '../utils/jwt.js';
import * as db from '../repository/agendamentoRepository.js';
import { Router } from 'express';

const endpoints = Router();

// Obter todos os agendamentos do usuário logado
endpoints.get('/agendamentos', autenticar, async (req, resp) => {
    try {
        // Verifica se o usuário é admin
        if (!req.user.isAdmin) {
            return resp.status(403).json({ erro: "Acesso negado" });
        }

        const registros = await db.consultarTodosAgendamentos(); // Chama a função que busca todos os agendamentos
        resp.json(registros);
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

// Adicionar um novo endpoint para obter agendamentos por data
endpoints.get('/agendamentos/data/:data', autenticar, async (req, resp) => {
    try {
        const data = req.params.data;
        const registros = await db.consultarAgendamentosPorData(data);
        resp.json(registros);
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

// Adicionar um novo endpoint para obter agendamentos por status
endpoints.get('/agendamentos/status/:status', autenticar, async (req, resp) => {
    try {
        const status = req.params.status;
        const registros = await db.consultarAgendamentosPorStatus(status);
        resp.json(registros);
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

// Adicionar um novo endpoint para obter agendamentos por data e status
endpoints.get('/agendamentos/data/:data/status/:status', autenticar, async (req, resp) => {
    try {
        const data = req.params.data;
        const status = req.params.status;
        const registros = await db.consultarAgendamentosPorDataEStatus(data, status);
        resp.json(registros);
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

export default endpoints;