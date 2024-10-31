import { gerarToken } from '../utils/jwt.js';
import * as db from '../repository/usuarioRepository.js';
import { Router } from 'express';
import { autenticar } from '../utils/jwt.js';

const endpoints = Router();

endpoints.post('/entrar', async (req, resp) => {
    try {
        const pessoa = req.body;
        const usuario = await db.validarUsuario(pessoa);

        if (!usuario) {
            return resp.status(401).json({ erro: "Usuário ou senha incorretos" });
        }

        const token = gerarToken({ id: usuario.id, isAdmin: usuario.isAdmin }); // Inclui isAdmin no token
        resp.json({ token, isAdmin: usuario.isAdmin }); // Retorna também se é admin
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

endpoints.post('/usuario', async (req, resp) => {
    try {
        const pessoa = req.body;
        const id = await db.inserirUsuario(pessoa);
        resp.status(201).json({ novoId: id });
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});

endpoints.get('/usuario/:id', autenticar, async (req, resp) => {
    try {
        const id = req.params.id;
        console.log('Buscando usuário com ID:', id); // Log do ID
        const usuario = await db.consultarUsuarioPorId(id); 
        console.log('Usuário encontrado:', usuario); // Log do usuário encontrado
        if (usuario) {
            resp.json(usuario);
        } else {
            resp.status(404).json({ erro: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao buscar usuário:', err.message);
        resp.status(400).json({ erro: 'Erro ao carregar os dados do usuário.' });
    }
});

endpoints.post('/admin', async (req, resp) => {
    try {
        const pessoa = {
            ...req.body,
            isAdmin: true // Define o usuário como administrador
        };
        const id = await db.inserirUsuario(pessoa);
        resp.status(201).json({ novoId: id });
    } catch (err) {
        resp.status(400).json({ erro: err.message });
    }
});



export default endpoints;
