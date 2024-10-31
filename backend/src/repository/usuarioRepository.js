import con from './connection.js';
import crypto from 'crypto-js';

// Função para inserir um novo usuário
export async function inserirUsuario(pessoa) {
    const comando = `
        INSERT INTO tb_usuario (nome, dt_nascimento, cpf, nm_celular, email, sexo, senha, isAdmin) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const hash = crypto.SHA256(pessoa.senha).toString();
    const [resposta] = await con.query(comando, [
        pessoa.nome,
        pessoa.dtNascimento,
        pessoa.cpf,
        pessoa.nm_celular,
        pessoa.email,
        pessoa.sexo,
        hash,
        pessoa.isAdmin || false // Define como false se não for especificado
    ]);
    
    return resposta.insertId;
}

// Função para validar um usuário com CPF, e-mail e senha
// Função para validar um usuário com CPF, e-mail e senha
export async function validarUsuario(pessoa) {
    const comando = `
        SELECT id_usuario AS id, nome, isAdmin 
        FROM tb_usuario 
        WHERE cpf = ? AND email = ? AND senha = ?`;
    
    const hash = crypto.SHA256(pessoa.senha).toString();
    const [registros] = await con.query(comando, [pessoa.cpf, pessoa.email, hash]);
    return registros.length > 0 ? registros[0] : null; // Retorna null se não encontrar
}



// Função para consultar um usuário por ID
export async function consultarUsuarioPorId(id) {
    const comando = `
        SELECT id_usuario AS id, nome, dt_nascimento, cpf, nm_celular, email, sexo, isAdmin 
        FROM tb_usuario 
        WHERE id_usuario = ?`;
    
    const [registros] = await con.query(comando, [id]);
    console.log('Registros encontrados:', registros); // Log dos registros
    return registros.length > 0 ? registros[0] : null; // Retorna null se não encontrar
}
