import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Artist } from '@/lib/types';
import ArtistCard from './ArtistCard';

interface ArtistsCarouselProps {
  artists: Artist[];
  onNavigateToArtist: (id: number) => void;
}

export default function ArtistsCarousel({ artists, onNavigateToArtist }: ArtistsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || artists.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artists.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay, artists.length]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % artists.length);
  };

  const handleDotClick = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  const getPosition = (index: number): 'prev' | 'active' | 'next' | 'hidden' => {
    if (index === currentIndex) return 'active';
    if (index === (currentIndex + 1) % artists.length) return 'next';
    if (index === (currentIndex - 1 + artists.length) % artists.length) return 'prev';
    return 'hidden';
  };

  if (artists.length === 0) {
    return (
      <div className="h-64 sm:h-96 md:h-[600px] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Carregando artistas...</p>
      </div>
    );
  }

  return (
    // AJUSTE: Reduzi o gap de 8 para 2 e removi o padding-bottom extra
    <div className="flex flex-col gap-2 relative z-10"> 
      
      {/* Área do Carrossel */}
      <div className="relative h-[450px] sm:h-[500px] md:h-[600px] w-full flex items-center justify-center perspective-1000">
        {artists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            isActive={index === currentIndex}
            position={getPosition(index)}
            onClick={() => {
              setCurrentIndex(index);
              setAutoPlay(false);
            }}
            onNavigate={onNavigateToArtist}
          />
        ))}
      </div>

      {/* Controles Unificados (Desktop e Mobile) */}
      {/* AJUSTE: Reduzi o gap interno de 6 para 4 e adicionei margin-top negativo leve no mobile se precisar 'colar' mais */}
      <div className="flex flex-col items-center gap-4 relative z-30 -mt-4 sm:mt-0"> 
        
        {/* Setas de Navegação */}
        <div className="flex gap-8 sm:gap-12">
           <button 
             onClick={handlePrev} 
             className="group bg-black/50 hover:bg-amber-600 hover:text-black text-amber-600 p-3 sm:p-4 rounded-full transition border border-amber-600 hover:scale-110 duration-300 backdrop-blur-sm cursor-pointer shadow-lg active:scale-95"
             aria-label="Anterior"
           >
             <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
           </button>
           
           <button 
             onClick={handleNext} 
             className="group bg-black/50 hover:bg-amber-600 hover:text-black text-amber-600 p-3 sm:p-4 rounded-full transition border border-amber-600 hover:scale-110 duration-300 backdrop-blur-sm cursor-pointer shadow-lg active:scale-95"
             aria-label="Próximo"
           >
             <ChevronRight size={24} className="sm:w-8 sm:h-8" />
           </button>
        </div>

        {/* Dots Indicadores */}
        <div className="flex justify-center gap-2 flex-wrap px-4">
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                index === currentIndex
                  ? 'bg-amber-600 w-8 h-2 shadow-[0_0_10px_rgba(217,119,6,0.5)]'
                  : 'bg-gray-800 hover:bg-amber-900 w-2 h-2'
              }`}
              aria-label={`Ir para artista ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}