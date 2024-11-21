import con from './connection.js';
import crypto from 'crypto-js';

const hashSenha = (senha) => crypto.SHA256(senha).toString();

const criarComandoInserirUsuario = () => `
    INSERT INTO tb_usuario (nome, dt_nascimento, cpf, nm_celular, email, sexo, senha, isAdmin) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const criarComandoValidarUsuario = () => `
    SELECT id_usuario AS id, nome, isAdmin 
    FROM tb_usuario 
    WHERE cpf = ? AND email = ? AND senha = ?
`;

const criarComandoConsultarUsuarioPorId = () => `
    SELECT id_usuario AS id, nome, dt_nascimento, cpf, nm_celular, email, sexo, isAdmin 
    FROM tb_usuario 
    WHERE id_usuario = ?
`;

export async function inserirUsuario(pessoa) {
    const comando = criarComandoInserirUsuario();
    const hash = hashSenha(pessoa.senha);
    const [resposta] = await con.query(comando, [
        pessoa.nome,
        pessoa.dtNascimento,
        pessoa.cpf,
        pessoa.nm_celular,
        pessoa.email,
        pessoa.sexo,
        hash,
        pessoa.isAdmin || false
    ]);
    return resposta.insertId;
}

export async function validarUsuario(pessoa) {
    const comando = criarComandoValidarUsuario();
    const hash = hashSenha(pessoa.senha);
    const [registros] = await con.query(comando, [pessoa.cpf, pessoa.email, hash]);
    return registros.length > 0 ? registros[0] : null;
}

export async function consultarUsuarioPorId(id) {
    const comando = criarComandoConsultarUsuarioPorId();
    const [registros] = await con.query(comando, [id]);
    return registros.length > 0 ? registros[0] : null;
}

export async function atualizarUsuario(id, dados) {
    const comando = `
        UPDATE tb_usuario 
        SET nome = ?, dt_nascimento = ?, cpf = ?, nm_celular = ?, email = ?, sexo = ? 
        WHERE id_usuario = ?;
    `;
    await con.query(comando, [
        dados.nome,
        dados.dt_nascimento,
        dados.cpf,
        dados.nm_celular,
        dados.email,
        dados.sexo,
        id
    ]);
}
