import { gerarToken } from '../utils/jwt.js';
import * as db from '../repository/usuarioRepository.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.post('/entrar', async (req, resp) => {
    try {
        const pessoa = req.body;
        const usuario = await db.validarUsuario(pessoa);

        if (!usuario) {
            return resp.status(401).json({ erro: "Usuário ou senha incorretos" });
        }

        const token = gerarToken(usuario);
        resp.json({ token });
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

export default endpoints;
