import con from "./connection.js";
import crypto from 'crypto-js';

// Função para inserir um novo usuário
export async function inserirUsuario(pessoa) {
    const comando = `
        insert into tb_usuario (nome, dt_nascimento, cpf, nm_celular, email, sexo, senha) 
        values (?, ?, ?, ?, ?, ?, ?)
    `;
    
    let hash = crypto.SHA256(pessoa.senha).toString()
    let resposta = await con.query(comando, [
        pessoa.nome, 
        pessoa.dt_nascimento, 
        pessoa.cpf, 
        pessoa.nm_celular, 
        pessoa.email, 
        pessoa.sexo, 
        hash
    ]);
    let info = resposta[0];
    
    return info.insertId;
}

// Função para validar um usuário com CPF, e-mail e senha
export async function validarUsuario(pessoa) {
    const comando = `
        select 
            id_usuario as id,
            nome
        from tb_usuario 
        where 
            cpf = ?
            and email = ?
            and senha = ?
    `;
    let hash = crypto.SHA256(pessoa.senha).toString()
    let registros = await con.query(comando, [pessoa.cpf, pessoa.email, hash]);
    return registros[0].length  > 0 ? registros[0][0] : null; // Retorna null se não encontrar
}





