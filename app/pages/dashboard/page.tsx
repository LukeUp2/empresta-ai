"use client";
import Image from "next/image";
import { useState } from "react";

interface Item {
  nome: string;
  pessoa: string;
  data: string;
  devolucao: string | null;
  status?: "pendente" | "aceito" | "recusado";
}

type Filtro = "todos" | "no-prazo" | "atrasado" | "sem-data";

export default function Dashboard() {
  const [filter, setFilter] = useState<Filtro>("todos");
  const [showModal, setShowModal] = useState(false);
  const [emprestimos, setEmprestimos] = useState<Item[]>([
    {
      nome: "Livro: Código Limpo",
      pessoa: "Ana",
      data: "2025-05-05",
      devolucao: "2025-06-01",
    },
    {
      nome: "Furadeira Bosch",
      pessoa: "João",
      data: "2025-05-12",
      devolucao: null,
    },
  ]);

  const [novoEmprestimo, setNovoEmprestimo] = useState({
    nome: "",
    email: "",
    dataEmprestimo: new Date().toISOString().split("T")[0],
    dataDevolucao: "",
  });

  const [recebidos, setRecebidos] = useState<Item[]>([
    {
      nome: "Guarda-chuva grande",
      pessoa: "Carlos",
      data: "2025-05-03",
      devolucao: "2025-05-20",
      status: "pendente",
    },
    {
      nome: "Projetor Epson",
      pessoa: "Julia",
      data: "2025-04-28",
      devolucao: "2025-05-10",
      status: "aceito",
    },
  ]);

  const hoje = new Date();

  function filtrar(lista: Item[]): Item[] {
    return lista.filter((item) => {
      if (filter === "todos") return true;
      if (!item.devolucao) return filter === "sem-data";
      const dataDevolucao = new Date(item.devolucao);
      if (filter === "atrasado") return dataDevolucao < hoje;
      if (filter === "no-prazo") return dataDevolucao >= hoje;
      return true;
    });
  }

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (
      !novoEmprestimo.nome ||
      !novoEmprestimo.email ||
      !novoEmprestimo.dataEmprestimo
    ) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const novoItem: Item = {
      nome: novoEmprestimo.nome,
      pessoa: novoEmprestimo.email,
      data: novoEmprestimo.dataEmprestimo,
      devolucao: novoEmprestimo.dataDevolucao || null,
      status: "pendente",
    };

    setEmprestimos((prev) => [...prev, novoItem]);
    setShowModal(false);
    setNovoEmprestimo({
      nome: "",
      email: "",
      dataEmprestimo: new Date().toISOString().split("T")[0],
      dataDevolucao: "",
    });
  }

  function confirmarRecebimento(
    item: Item,
    status: "pendente" | "aceito" | "recusado"
  ) {
    const atualizados = recebidos.map((i) =>
      i === item ? { ...i, status } : i
    );
    setRecebidos(atualizados);
  }

  return (
    <main className="min-h-screen bg-[#f3f7f8] text-dark font-sans p-6 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image src="/emprestaai-logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold text-primary">EmprestaAí</h1>
        </div>
        <button className="text-sm text-primary hover:underline">Sair</button>
      </header>

      {/* Filtros */}
      <div className="mb-8 flex gap-4 flex-wrap">
        {["todos", "no-prazo", "atrasado", "sem-data"].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setFilter(tipo as Filtro)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === tipo
                ? "bg-primary text-white"
                : "bg-white text-primary border border-primary"
            }`}
          >
            {tipo === "todos"
              ? "Todos"
              : tipo === "no-prazo"
              ? "Dentro do prazo"
              : tipo === "atrasado"
              ? "Atrasados"
              : "Sem data de devolução"}
          </button>
        ))}
      </div>

      {/* Itens */}
      <section className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Itens que você emprestou
          </h2>
          <div className="space-y-4">
            {filtrar(emprestimos).map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-md border border-[#e0e0e0]"
              >
                <h3 className="font-semibold text-lg">{item.nome}</h3>
                <p className="text-sm text-muted">Para {item.pessoa}</p>
                <p className="text-sm text-muted">Emprestado em: {item.data}</p>
                <p className="text-sm text-muted">
                  Devolver até: {item.devolucao || "---"}
                </p>
                <p className="text-sm text-muted">
                  Status: {item.status || "pendente"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Itens que você pegou emprestado
          </h2>
          <div className="space-y-4">
            {filtrar(recebidos).map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-md border border-[#e0e0e0]"
              >
                <h3 className="font-semibold text-lg">{item.nome}</h3>
                <p className="text-sm text-muted">De {item.pessoa}</p>
                <p className="text-sm text-muted">Pegou em: {item.data}</p>
                <p className="text-sm text-muted">
                  Devolver até: {item.devolucao || "---"}
                </p>
                {item.status === "pendente" ? (
                  <div className="flex gap-2 mt-2 items-center justify-center">
                    <button
                      onClick={() => confirmarRecebimento(item, "aceito")}
                      className="bg-green-600 hover:bg-green-700 duration-200 text-white px-4 py-1 rounded"
                    >
                      Aceitar
                    </button>
                    <button
                      onClick={() => confirmarRecebimento(item, "recusado")}
                      className="bg-red-600 hover:bg-red-700 duration-200 text-white px-4 py-1 rounded"
                    >
                      Recusar
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-sm text-muted">
                      Status: {item.status}
                    </span>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => confirmarRecebimento(item, "pendente")}
                        className="text-md text-white hover:bg-primary duration-200 bg-primaryLight w-48 h-10 px-2 rounded-md"
                      >
                        Reverter para pendente
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botão flutuante */}
      <button
        className="fixed bottom-6 right-6 bg-primary hover:bg-primaryLight text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition"
        title="Adicionar item"
        onClick={() => setShowModal(true)}
      >
        + Novo item
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 mx-3 rounded-2xl shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Novo Empréstimo
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleSalvar}>
              <input
                type="text"
                placeholder="Nome do item"
                value={novoEmprestimo.nome}
                onChange={(e) =>
                  setNovoEmprestimo({ ...novoEmprestimo, nome: e.target.value })
                }
                className="w-full px-4 py-2 border border-muted rounded-xl"
              />
              <input
                type="email"
                placeholder="Email de quem vai receber"
                value={novoEmprestimo.email}
                onChange={(e) =>
                  setNovoEmprestimo({
                    ...novoEmprestimo,
                    email: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-muted rounded-xl"
              />
              <div>
                <h2>Início do empréstimo</h2>
                <input
                  type="date"
                  value={novoEmprestimo.dataEmprestimo}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setNovoEmprestimo({
                      ...novoEmprestimo,
                      dataEmprestimo: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-muted rounded-xl"
                />
              </div>
              <div>
                <h2>Data de devolução</h2>
                <input
                  type="date"
                  value={novoEmprestimo.dataDevolucao}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setNovoEmprestimo({
                      ...novoEmprestimo,
                      dataDevolucao: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-muted rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-muted text-dark"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primaryLight"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
