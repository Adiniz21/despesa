-- Tabela de Usuários (Vinculada ao Firebase Auth)
CREATE TABLE usuarios (
    id VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL
);

-- Tabela de Contas Bancárias
CREATE TABLE contas_bancarias (
    id SERIAL PRIMARY KEY,
    usuario_id VARCHAR(128) REFERENCES usuarios(id) ON DELETE CASCADE,
    nome_banco VARCHAR(100) NOT NULL,
    saldo DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de categorias padrão
INSERT INTO categorias (nome_categoria) VALUES 
('Alimentação'), ('Transporte'), ('Moradia'), ('Lazer');
