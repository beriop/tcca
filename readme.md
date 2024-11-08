# TCC - Hayan

Nosso **foco** é fazermos o melhor possivel para que o TCC fique perfeito.

![](./blackS.png)

## Estrutura de Tabelas
```sql
create database if not exists hayandb;
use hayandb;

-- criação da tabela de usuários
create table if not exists tb_usuario (
    id_usuario int primary key auto_increment,
    nome varchar(100) not null,
    dt_nascimento date not null,
    cpf varchar(14) not null unique,
    nm_celular varchar(15) not null,
    email varchar(200) not null unique,
    sexo enum('masculino', 'feminino') not null,
    senha varchar(255) not null,
    isAdmin boolean default false
);

-- criação da tabela de agendamentos
create table if not exists tb_agendamentos (
    id_agendamentos int primary key auto_increment,
    categoria varchar(100) not null,
    procedimento varchar(200) not null,
    data datetime not null,
    id_usuario int,
    foreign key (id_usuario) references tb_usuario(id_usuario) on delete cascade
);

-- consultas de teste
select * from tb_usuario;
select * from tb_agendamentos;
```
## Criação ADM


## Variaveis de Ambiente do Backend
```
http://localhost:5010/admin

{
  "nome": "AdminUser",
  "dtNascimento": "1980-01-01",
  "cpf": "11111111111",
  "nm_celular": "999999999",
  "email": "admin@gmail.com",
  "sexo": "Masculino",
  "senha": "adm123"
}
```

```
PORTA=5010

MYSQL_HOST='localhost'
MYSQL_USER='root'
MYSQL_PORT=3306
MYSQL_PWD='rootpassword'
MYSQL_DB='HayanDB'
```