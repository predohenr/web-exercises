const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.NEON_URL,
    ssl: process.env.NEON_URL ? { rejectUnauthorized: false } : false
});
const app = express();

app.use(express.json());
app.use(express.static("."));

pool.query(`CREATE TABLE IF NOT EXISTS contatos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
)`).catch(err => console.error("Erro ao criar tabela:", err.message));

app.post("/api/contato", async (req, res) => {
    const { nome, email, mensagem } = req.body;
    if (!nome || !email || !mensagem) return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    const r = await pool.query("INSERT INTO contatos (nome, email, mensagem) VALUES ($1, $2, $3) RETURNING *", [nome, email, mensagem]);
    res.status(201).json({ sucesso: true, contato: r.rows[0] });
});

app.get("/api/contatos", async (req, res) => {
    const r = await pool.query("SELECT * FROM contatos ORDER BY criado_em DESC");
    res.json(r.rows);
});

app.listen(5000, "0.0.0.0", () => console.log("Servidor rodando na porta 5000"));
