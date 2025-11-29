import type { Artist } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  isActive: boolean;
  onClick: () => void;
  onNavigate: (id: number) => void;
  position: 'prev' | 'active' | 'next' | 'hidden';
}

export default function ArtistCard({ artist, isActive, onClick, onNavigate, position }: ArtistCardProps) {
  
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http') || imagePath.startsWith('/') || imagePath.startsWith('artists')) {
      return imagePath;
    }
    return `/artists/${imagePath}`;
  };

  // EFEITO DE BLUR ADICIONADO AQUI
  const positionClasses = {
    // Active: Foco total (blur-0), sem escala, opacidade 100%
    active: '-translate-x-1/2 scale-100 z-20 opacity-100 blur-0 grayscale-0 shadow-[0_0_30px_rgba(217,119,6,0.3)]',
    
    // Next: Deslocado, menor, com BLUR SUAVE (blur-[2px]) para dar noção de profundidade/movimento
    next: 'translate-x-[20%] sm:translate-x-[30%] scale-75 z-10 opacity-60 blur-[2px] grayscale-[0.8] hover:opacity-80 hover:blur-0 hover:grayscale-0 cursor-pointer',
    
    // Prev: Igual ao Next, mas para a esquerda
    prev: '-translate-x-[120%] sm:-translate-x-[130%] scale-75 z-10 opacity-60 blur-[2px] grayscale-[0.8] hover:opacity-80 hover:blur-0 hover:grayscale-0 cursor-pointer',
    
    // Hidden: Desfoque pesado (blur-xl) para desaparecer suavemente no fundo
    hidden: '-translate-x-1/2 scale-50 z-0 opacity-0 blur-xl pointer-events-none',
  };

  const handleCardClick = () => {
    if (isActive) {
      onNavigate(artist.id);
    } else {
      onClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        absolute 
        left-1/2 top-1/2 
        -translate-y-1/2 
        
        w-64 sm:w-80 md:w-96 lg:w-[400px] 
        h-80 sm:h-96 md:h-[500px] lg:h-[600px]
        
        rounded-xl overflow-hidden 
        
        /* Aumentei a duração para 800ms para o efeito de "passar devagar" ser mais notável */
        transition-all duration-800 cubic-bezier(0.25, 0.8, 0.25, 1)
        
        bg-black border border-gray-800 
        ${isActive ? 'border-amber-600' : 'border-gray-800'}
        
        ${positionClasses[position]}
      `}
    >
      <div className="relative w-full h-full group">
        <img
          src={getImageUrl(artist.image)}
          alt={artist.name}
          className={`
            w-full h-full object-cover transition-all duration-800
            ${isActive ? 'brightness-100' : 'brightness-50 group-hover:brightness-75'}
          `}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x600/1a1a1a/FFF?text=Foto+Indisponível';
          }}
        />

        {/* Gradiente */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent ${isActive ? 'opacity-90' : 'opacity-100'}`}></div>

        {/* Conteúdo do Card */}
        <div className={`absolute bottom-0 left-0 p-6 sm:p-8 w-full text-left transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block px-2 py-1 mb-2 text-[10px] sm:text-xs font-bold bg-amber-600 text-black rounded-sm uppercase tracking-wider">
            {artist.genre}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase drop-shadow-lg tracking-tighter mb-4 leading-none">
            {artist.name}
          </h3>

          {isActive && (
            <button className="group inline-flex items-center gap-2 text-white text-xs sm:text-sm font-bold uppercase tracking-widest hover:text-amber-400 transition-colors">
              Ver Perfil
              <div className="bg-white/20 p-1 rounded-full group-hover:bg-amber-600 group-hover:text-black transition-all">
                <ChevronRight size={14} />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}