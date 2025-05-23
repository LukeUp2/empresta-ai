"use client";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary to-primaryLight flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center transition-all duration-800 ease-in-out">
        <div className="mb-6 flex justify-center">
          <Image
            src="/emprestaai-logo.png"
            alt="Logo EmprestaAí"
            width={60}
            height={60}
          />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2 transition-all duration-800">
          {isRegister ? "Crie sua conta" : "Bem-vindo de volta"}
        </h1>
        <p className="text-muted mb-6 transition-opacity duration-500 ease-in-out">
          {isRegister
            ? "Cadastre-se para começar a organizar seus empréstimos."
            : "Faça login na sua conta"}
        </p>

        <form className="flex flex-col gap-4 text-left transition-all duration-500">
          <div
            className={`transition-all duration-500 ${
              isRegister
                ? "opacity-100 max-h-40"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <label className="block mb-1 text-sm font-medium text-dark">
              Nome
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-muted rounded-xl"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-dark">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-muted rounded-xl"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-dark">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-muted rounded-xl"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white font-semibold py-2 rounded-xl hover:bg-primaryLight transition"
          >
            {isRegister ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted">
          {isRegister ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-primary hover:underline"
          >
            {isRegister ? "Faça login" : "Cadastre-se"}
          </button>
        </p>
      </div>
    </main>
  );
}
