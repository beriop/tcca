import { autenticar } from '../utils/jwt.js';

import * as db from '../repository/listaNegraRepository.js';

import { Router } from "express";
const endpoints = Router();


endpoints.get('/listaNegra', autenticar, async (req, resp) => {
    try {
        let idUsuario = req.user.id;
        let registros = await db.consultarListaNegra(idUsuario);
        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/listaNegra/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let registros = await db.consultarListaNegraPorId(id);
        resp.send(registros[0]);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/listaNegra/', autenticar, async (req, resp) => {
    try {
        let pessoa = req.body;
        pessoa.idUsuario = req.user.id;

        let id = await db.inserirListaNegra(pessoa);

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.put('/listaNegra/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let pessoa = req.body;

        let linhasAfetadas = await db.alterarListaNegra(id, pessoa);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.delete('/listaNegra/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerListaNegra(id);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})






export default endpoints;