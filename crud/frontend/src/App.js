import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [tarefas, setTarefas] = useState([]);

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  // Carregar dados do backend
  useEffect(() => {
    axios.get("http://localhost:3001/funcionarios").then(res => setFuncionarios(res.data));
    axios.get("http://localhost:3001/tarefas").then(res => setTarefas(res.data));
  }, []);

  const cadastrarFuncionario = () => {
    axios.post("http://localhost:3001/funcionarios", {
      nome, cargo, salario,
    }).then(() => window.location.reload());
  };

  const cadastrarTarefa = () => {
    axios.post("http://localhost:3001/tarefas", {
      titulo, descricao
    }).then(() => window.location.reload());
  };

  const excluirFuncionario = (id) => {
    axios.delete(`http://localhost:3001/funcionarios/${id}`)
    .then(() => window.location.reload());
  };

  const excluirTarefa = (id) => {
    axios.delete(`http://localhost:3001/tarefas/${id}`)
    .then(() => window.location.reload());
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>CRUD de Funcionários</h1>

      <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Cargo" onChange={(e) => setCargo(e.target.value)} />
      <input placeholder="Salário" onChange={(e) => setSalario(e.target.value)} />
      <button onClick={cadastrarFuncionario}>Cadastrar</button>

      <h2>Lista</h2>
      {funcionarios.map(f => (
        <div key={f.id}>
          {f.nome} — {f.cargo} — R$ {f.salario}
          <button onClick={() => excluirFuncionario(f.id)}>Excluir</button>
        </div>
      ))}

      <hr />

      <h1>CRUD de Tarefas</h1>

      <input placeholder="Título" onChange={(e) => setTitulo(e.target.value)} />
      <input placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)} />
      <button onClick={cadastrarTarefa}>Cadastrar</button>

      <h2>Lista de Tarefas</h2>
      {tarefas.map(t => (
        <div key={t.id}>
          <b>{t.titulo}</b> — {t.descricao}
          <button onClick={() => excluirTarefa(t.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default App;
