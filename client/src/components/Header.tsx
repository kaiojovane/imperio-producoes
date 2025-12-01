import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'INÍCIO', href: '#inicio' },
    { label: 'ARTISTAS', href: '#artistas' },
    { label: 'A AGÊNCIA', href: '#sobre' },
    { label: 'CONTATO', href: '#contato' },
  ];

  return (
    <header className="fixed w-full z-50 bg-gradient-to-b from-black via-black/95 to-black/90 border-b border-amber-600/10 shadow-lg backdrop-blur-md transition-all duration-300">
      
      {/* Definições de Estilo e Gradientes para o ÍCONE */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" /> {/* Amber 400 */}
            <stop offset="50%" stopColor="#d97706" /> {/* Amber 600 */}
            <stop offset="100%" stopColor="#fffbeb" /> {/* Amber 50 */}
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 5px rgba(217,119,6,0.3)); }
          50% { transform: translateY(-2px); filter: drop-shadow(0 0 12px rgba(217,119,6,0.6)); }
        }
        .animate-symbol {
          animation: subtle-float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-12 py-3 flex justify-between items-center">
        
        {/* Lado Esquerdo: Ícone + Texto (Agora visível no mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer select-none">
          
          {/* Símbolo Vetorial */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center animate-symbol flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full drop-shadow-md"
            >
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" fill="rgba(217, 119, 6, 0.15)" />
              <circle cx="12" cy="3" r="1.5" fill="url(#gold-gradient)" stroke="none" />
            </svg>
          </div>
          
          {/* Texto (CORRIGIDO: Removido 'hidden', ajustado tamanho para mobile) */}
          <div className="block">
            <h1 className="text-sm sm:text-lg md:text-xl font-black tracking-widest text-white drop-shadow-md leading-none">
              IMPÉRIO <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 bg-clip-text text-transparent block sm:inline">PRODUÇÕES</span>
            </h1>
          </div>
        </div>

        {/* Lado Direito: Navegação */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-gray-400 text-[11px] font-bold tracking-[0.2em] py-1 hover:text-white transition-colors duration-300 group/link"
            >
              {link.label}
              <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-300 group-hover/link:w-full group-hover/link:left-0"></span>
            </a>
          ))}
        </nav>

        {/* Menu Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-amber-500 hover:text-amber-300 transition p-1 hover:bg-white/5 rounded-md"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-xl border-t border-amber-600/10 absolute w-full h-screen animate-fade-in z-40 top-[100%] left-0">
          <nav className="flex flex-col p-8 space-y-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-lg font-bold tracking-[0.2em] hover:text-amber-400 transition duration-300 w-full text-center py-3 border-b border-gray-900/50"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}