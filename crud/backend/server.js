const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------ FUNCIONÁRIOS ------------------------

// Create
app.post("/funcionarios", (req, res) => {
  const { nome, cargo, salario } = req.body;
  db.query(
    "INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)",
    [nome, cargo, salario],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: "Funcionário cadastrado!" });
    }
  );
});

// Read
app.get("/funcionarios", (req, res) => {
  db.query("SELECT * FROM funcionarios", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Update
app.put("/funcionarios/:id", (req, res) => {
  const { nome, cargo, salario } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE funcionarios SET nome=?, cargo=?, salario=? WHERE id=?",
    [nome, cargo, salario, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: "Funcionário atualizado!" });
    }
  );
});

// Delete
app.delete("/funcionarios/:id", (req, res) => {
  db.query(
    "DELETE FROM funcionarios WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: "Funcionário excluído!" });
    }
  );
});

// ------------------------ TAREFAS ------------------------

app.post("/tarefas", (req, res) => {
  const { titulo, descricao } = req.body;
  db.query(
    "INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)",
    [titulo, descricao],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: "Tarefa criada!" });
    }
  );
});

app.get("/tarefas", (req, res) => {
  db.query("SELECT * FROM tarefas", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.put("/tarefas/:id", (req, res) => {
  const { titulo, descricao } = req.body;
  db.query(
    "UPDATE tarefas SET titulo=?, descricao=? WHERE id=?",
    [titulo, descricao, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: "Tarefa atualizada!" });
    }
  );
});

app.delete("/tarefas/:id", (req, res) => {
  db.query(
    "DELETE FROM tarefas WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ msg: "Tarefa deletada!" });
    }
  );
});

// Start Server
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
