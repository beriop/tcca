import con from "./connection.js";

// Função para inserir um novo usuário
export async function inserirUsuario(pessoa) {
    const comando = `
        insert into tb_usuario (nome, idade, cpf, nm_celular, email, sexo, senha) 
        values (?, ?, ?, ?, ?, ?, ?)
    `;
    
    let resposta = await con.query(comando, [
        pessoa.nome, 
        pessoa.idade, 
        pessoa.cpf, 
        pessoa.nmCelular, 
        pessoa.email, 
        pessoa.sexo, 
        pessoa.senha
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
    
    let registros = await con.query(comando, [pessoa.cpf, pessoa.email, pessoa.senha]);
    return registros[0].length > 0 ? registros[0][0] : null; // Retorna null se não encontrar
}
