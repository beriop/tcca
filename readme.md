# TCC - Hayan

Nosso **foco** é fazermos o melhor possivel para que o TCC fique perfeito.

![](./blackS.png)

## Estrutura de Tabelas
```sql
CREATE DATABASE HayanDB;
USE HayanDB;

CREATE TABLE tb_usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    dt_nascimento DATE NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nm_celular VARCHAR(15) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    sexo ENUM('Masculino', 'Feminino') NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE tb_agendamentos (
    id_agendamentos INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(100) NOT NULL,
    procedimento VARCHAR(200) NOT NULL,
    data DATETIME NOT NULL,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
);

SELECT * FROM tb_usuario;

select * from tb_usuario;
drop database HayanDB;
```

## Variaveis de Ambiente do Backend

```
PORTA=5010

MYSQL_HOST='localhost'
MYSQL_USER='root'
MYSQL_PORT=3306
MYSQL_PWD='rootpassword'
MYSQL_DB='HayanDB'
```