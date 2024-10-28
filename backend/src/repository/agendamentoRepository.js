import con from './connection.js';

// Função para inserir um novo agendamento
export async function inserirAgendamento(agendamento) {
    const comando = `
        INSERT INTO tb_agendamentos (categoria, procedimento, data, id_usuario) 
        VALUES (?, ?, ?, ?)`;
    
    const [resposta] = await con.query(comando, [
        agendamento.categoria,
        agendamento.procedimento,
        agendamento.data,
        agendamento.idUsuario,
    ]);
    
    return resposta.insertId;
}

// Função para consultar todos os agendamentos de um usuário
export async function consultarAgendamentos(idUsuario) {
    const comando = `
        SELECT id_agendamentos AS id, categoria, procedimento, data 
        FROM tb_agendamentos 
        WHERE id_usuario = ?`;
    
    const [registros] = await con.query(comando, [idUsuario]);
    return registros;
}

// Função para consultar um agendamento específico por ID
export async function consultarAgendamentoPorId(id) {
    const comando = `
        SELECT id_agendamentos AS id, categoria, procedimento, data 
        FROM tb_agendamentos 
        WHERE id_agendamentos = ?`;

    const [registros] = await con.query(comando, [id]);
    return registros.length > 0 ? registros[0] : null; // Retorna null se não encontrar
}

// Função para atualizar um agendamento
export async function alterarAgendamento(id, agendamento) {
    const comando = `
        UPDATE tb_agendamentos 
        SET categoria = ?, procedimento = ?, data = ? 
        WHERE id_agendamentos = ?`;
    
    const [resposta] = await con.query(comando, [
        agendamento.categoria,
        agendamento.procedimento,
        agendamento.data,
        id,
    ]);
    
    return resposta.affectedRows;
}

// Função para remover um agendamento
export async function removerAgendamento(id) {
    const comando = `
        DELETE FROM tb_agendamentos 
        WHERE id_agendamentos = ?`;
    
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}
