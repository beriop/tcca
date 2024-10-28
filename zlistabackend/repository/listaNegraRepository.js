import con from "./connection.js";


export async function inserirListaNegra(pessoa) {
    const comando = `
        insert into tb_lista_negra (nm_pessoa, ds_motivo, dt_vinganca, nr_nota_odio, bt_perdoado, id_usuario) 
					        values (?, ?, ?, ?, ?, ?)
    `;
    
    let resposta = await con.query(comando, [pessoa.nome, pessoa.motivo, pessoa.vinganca, pessoa.notaOdio, pessoa.perdoado, pessoa.idUsuario])
    let info = resposta[0];
    
    return info.insertId;
}


export async function consultarListaNegra(idUsuario) {
    const comando = `
        select id_lista_negra   id,
               nm_pessoa        nome,
               ds_motivo        motivo,
               dt_vinganca      vinganca,
               nr_nota_odio     notaOdio,
               bt_perdoado      perdoado 
          from tb_lista_negra
          where id_usuario = ?
    `;

    let resposta = await con.query(comando, [idUsuario]);
    let registros = resposta[0];

    return registros;
}

export async function consultarListaNegraPorId(id) {
    const comando = `
        select id_lista_negra   id,
               nm_pessoa        nome,
               ds_motivo        motivo,
               dt_vinganca      vinganca,
               nr_nota_odio     notaOdio,
               bt_perdoado      perdoado 
          from tb_lista_negra
          where id_lista_negra = ?
    `;

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];

    return registros;
}

export async function alterarListaNegra(id, pessoa) {
    const comando = `
         update tb_lista_negra 
            set nm_pessoa = ?,
                ds_motivo = ?,
                dt_vinganca = ?,
                nr_nota_odio = ?,
                bt_perdoado = ?
            where id_lista_negra = ?;
    `

    let resposta = await con.query(comando, [pessoa.nome, pessoa.motivo, pessoa.vinganca, pessoa.notaOdio, pessoa.perdoado, id])
    let info = resposta[0];

    return info.affectedRows;
}


export async function removerListaNegra(id) {
    const comando = `
        delete from tb_lista_negra 
         where id_lista_negra = ?
    `

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}

