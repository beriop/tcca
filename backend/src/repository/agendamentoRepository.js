import con from './connection.js';

export async function inserirAgendamento(agendamento) {
    const comando = `
        INSERT INTO tb_agendamentos (categoria, procedimento, data, id_usuario) 
        VALUES (?, ?, ?, ?)`;
    
    try {
        // Verifica se dataHora existe e converte para o formato MySQL DATETIME
        const dataFormatada = agendamento.dataHora
            ? new Date(agendamento.dataHora).toISOString().slice(0, 19).replace('T', ' ')
            : null;

        const [resposta] = await con.query(comando, [
            agendamento.categoria,
            agendamento.procedimento,
            dataFormatada,
            agendamento.idUsuario,
        ]);

        return resposta.insertId;
    } catch (error) {
        throw new Error(`Erro ao inserir agendamento: ${error.message}`);
    }
}

// Função para consultar todos os agendamentos de um usuário
export async function consultarAgendamentos(idUsuario) {
    const comando = `
        SELECT id_agendamentos AS id, categoria, procedimento, data 
        FROM tb_agendamentos 
        WHERE id_usuario = ?`;
    
    try {
        const [registros] = await con.query(comando, [idUsuario]);
        return registros;
    } catch (error) {
        throw new Error(`Erro ao consultar agendamentos: ${error.message}`);
    }
}

// Função para consultar um agendamento específico por ID
export async function consultarAgendamentoPorId(id) {
    const comando = `
        SELECT id_agendamentos AS id, categoria, procedimento, data 
        FROM tb_agendamentos 
        WHERE id_agendamentos = ?`;

    try {
        const [registros] = await con.query(comando, [id]);
        return registros.length > 0 ? registros[0] : null; // Retorna null se não encontrar
    } catch (error) {
        throw new Error(`Erro ao consultar agendamento por ID: ${error.message}`);
    }
}

// Função para atualizar um agendamento
export async function alterarAgendamento(id, agendamento) {
    const comando = `
        UPDATE tb_agendamentos 
        SET categoria = ?, procedimento = ?, data = ? 
        WHERE id_agendamentos = ?`;
    
    try {
        const [resposta] = await con.query(comando, [
            agendamento.categoria,
            agendamento.procedimento,
            agendamento.data,
            id,
        ]);
        
        return resposta.affectedRows;
    } catch (error) {
        throw new Error(`Erro ao alterar agendamento: ${error.message}`);
    }
}

// Função para remover um agendamento
export async function removerAgendamento(id) {
    const comando = `
        DELETE FROM tb_agendamentos 
        WHERE id_agendamentos = ?`;
    
    try {
        const [resposta] = await con.query(comando, [id]);
        return resposta.affectedRows;
    } catch (error) {
        throw new Error(`Erro ao remover agendamento: ${error.message}`);
    }
}

export async function confirmarAgendamento(id) {
    const comando = `
        UPDATE tb_agendamentos 
        SET confirmado = 1 
        WHERE id_agendamentos = ? AND confirmado = 0`; // Presumindo que há uma coluna 'confirmado'
    
    try {
        const [resposta] = await con.query(comando, [id]);
        return resposta.affectedRows > 0; // Retorna true se o agendamento foi confirmado
    } catch (error) {
        throw new Error(`Erro ao confirmar agendamento: ${error.message}`);
    }
}

// Função para consultar todos os agendamentos
export async function consultarTodosAgendamentos() {
    const comando = `
        SELECT 
            id_agendamentos AS id, 
            categoria, 
            procedimento, 
            data, 
            (SELECT nome FROM tb_usuario WHERE id_usuario = tb_agendamentos.id_usuario) AS usuarioNome
        FROM tb_agendamentos`;
    
    try {
        const [registros] = await con.query(comando);
        return registros;
    } catch (error) {
        throw new Error(`Erro ao consultar todos os agendamentos: ${error.message}`);
    }
}
