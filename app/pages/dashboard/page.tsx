"use client";

import Image from "next/image";
import { useState } from "react";

interface Item {
  nome: string;
  pessoa: string;
  data: string;
  devolucao: string | null;
}

type Filtro = "todos" | "no-prazo" | "atrasado" | "sem-data";

export default function Dashboard() {
  const [filter, setFilter] = useState<Filtro>("todos");
  const [showModal, setShowModal] = useState(false);
  const [novoEmprestimo, setNovoEmprestimo] = useState({
    nome: "",
    email: "",
    dataEmprestimo: new Date().toISOString().split("T")[0],
    dataDevolucao: "",
  });

  const emprestimos: Item[] = [
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
  ];

  const recebidos: Item[] = [
    {
      nome: "Guarda-chuva grande",
      pessoa: "Carlos",
      data: "2025-05-03",
      devolucao: "2025-05-20",
    },
    {
      nome: "Projetor Epson",
      pessoa: "Julia",
      data: "2025-04-28",
      devolucao: "2025-05-10",
    },
  ];

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
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Novo Empréstimo
            </h3>
            <form className="flex flex-col gap-4">
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
              <input
                type="date"
                value={novoEmprestimo.dataEmprestimo}
                onChange={(e) =>
                  setNovoEmprestimo({
                    ...novoEmprestimo,
                    dataEmprestimo: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-muted rounded-xl"
              />
              <input
                type="date"
                value={novoEmprestimo.dataDevolucao}
                onChange={(e) =>
                  setNovoEmprestimo({
                    ...novoEmprestimo,
                    dataDevolucao: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-muted rounded-xl"
              />
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
