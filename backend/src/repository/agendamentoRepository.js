import con from "./connection.js";

// Função para inserir um novo agendamento
export async function inserirAgendamento(agendamento) {
    const comando = `
        insert into tb_agendamentos (categoria, procedimento, data, id_usuario) 
        values (?, ?, ?, ?)
    `;
    
    let resposta = await con.query(comando, [agendamento.categoria, agendamento.procedimento, agendamento.data, agendamento.idUsuario]);
    let info = resposta[0];
    
    return info.insertId;
}

// Função para consultar todos os agendamentos de um usuário
export async function consultarAgendamentos(idUsuario) {
    const comando = `
        select id_agendamentos as id,
               categoria,
               procedimento,
               data,
               id_usuario 
        from tb_agendamentos
        where id_usuario = ?
    `;

    let resposta = await con.query(comando, [idUsuario]);
    let registros = resposta[0];

    return registros;
}

// Função para consultar um agendamento específico por ID
export async function consultarAgendamentoPorId(id) {
    const comando = `
        select id_agendamentos as id,
               categoria,
               procedimento,
               data,
               id_usuario
        from tb_agendamentos
        where id_agendamentos = ?
    `;

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];

    return registros.length > 0 ? registros[0] : null; // Retorna null se não encontrar
}

// Função para atualizar um agendamento
export async function alterarAgendamento(id, agendamento) {
    const comando = `
        update tb_agendamentos 
        set categoria = ?, 
            procedimento = ?, 
            data = ?, 
            id_usuario = ?
        where id_agendamentos = ?;
    `;

    let resposta = await con.query(comando, [agendamento.categoria, agendamento.procedimento, agendamento.data, agendamento.idUsuario, id]);
    let info = resposta[0];

    return info.affectedRows;
}

// Função para remover um agendamento
export async function removerAgendamento(id) {
    const comando = `
        delete from tb_agendamentos 
        where id_agendamentos = ?
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
