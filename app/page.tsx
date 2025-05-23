"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface text-dark font-sans">
      {/* Hero Fullscreen Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primaryLight text-white text-center px-6">
        <div className="absolute top-4 left-4 text-2xl font-bold tracking-tight">
          EmprestaAí
        </div>
        <div className="z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight">
            Organize seus empréstimos com facilidade e estilo
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Tenha controle total do que foi emprestado ou devolvido em um
            clique.
          </p>
          <a
            href="/login"
            className="inline-block bg-white text-primary px-8 py-4 font-bold rounded-full text-lg shadow-lg hover:bg-primaryLight hover:text-white transition"
          >
            Começar agora
          </a>
        </div>
        <div className="absolute bottom-8 text-base font-semibold text-white bg-primaryLight px-4 py-2 rounded-full animate-bounce shadow-lg">
          ↓ Deslize para ver mais ↓
        </div>
      </section>

      {/* Section com Destaques em Cards Animados */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {[
          {
            title: "Visibilidade Total",
            text: "Todos os seus empréstimos organizados em uma timeline intuitiva.",
          },
          {
            title: "Alertas Inteligentes",
            text: "Se aproxime da devolução? A gente te avisa.",
          },
          {
            title: "Controle Compartilhado",
            text: "Gerencie quem pegou, quando e o que foi devolvido.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-l-8 border-primary opacity-0 animate-fade-in-up"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationFillMode: "forwards",
            }}
          >
            <h3 className="text-3xl font-bold mb-4 text-primary">
              {item.title}
            </h3>
            <p className="text-muted text-base leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-primary text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Pronto para simplificar seus empréstimos?
        </h2>
        <p className="text-lg mb-8">
          Com o EmprestaAí, você nunca mais esquece quem ficou com o quê.
        </p>
        <a
          href="/login"
          className="inline-block bg-white text-primary px-6 py-3 font-semibold rounded-full text-lg shadow hover:bg-primaryLight hover:text-white transition"
        >
          Começar agora
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-6">
        <p>&copy; 2025 EmprestaAí. Todos os direitos reservados.</p>
      </footer>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
