# TCC - Dental Consults

Nosso **foco** é fazermos o melhor possivel para que o TCC fique perfeito.

![](./blackS.png)

## Estrutura de Tabelas
```sql
create database dental_consults;
use dental_consults;

create table pacientes (
    paciente_id int auto_increment primary key,
    nome varchar(100) not null,
    data_nascimento date not null,
    telefone varchar(15),
    email varchar(100),
    endereco varchar(255),
    data_registro date
);

create table dentistas (
    dentista_id int auto_increment primary key,
    nome varchar(100) not null,
    especialidade varchar(100),
    telefone varchar(15),
    email varchar(100),
    data_contratacao date
);

create table bairros (
    bairro_id int auto_increment primary key,
    nome varchar(100) not null
);

create table servicos (
    servico_id int auto_increment primary key,
    descricao varchar(100) not null,
    preco decimal(10, 2) not null
);

create table avaliacoes (
    avaliacao_id int auto_increment primary key,
    descricao varchar(200) not null,
    detalhes text
);

create table horarios (
    horario_id int auto_increment primary key,
    hora_inicio time not null,
    hora_fim time not null
);

create table consultas (
    consulta_id int auto_increment primary key,
    paciente_id int,
    dentista_id int,
    avaliacao_id int,
    bairro_id int,
    horario_id int,
    data_consulta date not null,
    servico_id int,
    observacoes text,
    foreign key (paciente_id) references pacientes(paciente_id),
    foreign key (dentista_id) references dentistas(dentista_id),
    foreign key (avaliacao_id) references avaliacoes(avaliacao_id),
    foreign key (bairro_id) references bairros(bairro_id),
    foreign key (horario_id) references horarios(horario_id),
    foreign key (servico_id) references servicos(servico_id)
);

create table pagamentos (
    pagamento_id int auto_increment primary key,
    consulta_id int,
    valor_pago decimal(10, 2) not null,
    data_pagamento date,
    metodo_pagamento varchar(200) not null,
    foreign key (consulta_id) references consultas(consulta_id)
);
```

## Variaveis de Ambiente do Backend

```
PORTA=5010

MYSQL_HOST='localhost'
MYSQL_USER='root'
MYSQL_PORT=3306
MYSQL_PWD='rootpassword'
MYSQL_DB='dental_consults'
```