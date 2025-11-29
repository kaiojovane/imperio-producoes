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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar mudanças de tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play do carrossel
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
        <p className="text-gray-400">Carregando artistas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Carousel Container */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[600px] w-full">
        {artists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            isActive={index === currentIndex}
            position={getPosition(index)}
            onClick={() => setCurrentIndex(index)}
            onNavigate={onNavigateToArtist}
          />
        ))}
      </div>

      {/* Navigation Controls - Desktop */}
      <div className="hidden sm:flex justify-center gap-4 md:gap-6">
        <button
          onClick={handlePrev}
          className="bg-transparent hover:bg-amber-600 hover:text-black text-amber-600 p-2 md:p-3 rounded-full transition border border-amber-600 hover:scale-110 duration-300"
          aria-label="Artista anterior"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>
        <button
          onClick={handleNext}
          className="bg-transparent hover:bg-amber-600 hover:text-black text-amber-600 p-2 md:p-3 rounded-full transition border border-amber-600 hover:scale-110 duration-300"
          aria-label="Próximo artista"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 flex-wrap">
        {artists.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-amber-600 w-3 h-3 md:w-4 md:h-4'
                : 'bg-gray-600 hover:bg-amber-400 w-2 h-2 md:w-3 md:h-3'
            }`}
            aria-label={`Ir para artista ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Controls - Mobile */}
      <div className="sm:hidden flex justify-center gap-3">
        <button
          onClick={handlePrev}
          className="bg-transparent hover:bg-amber-600 hover:text-black text-amber-600 p-2 rounded-full transition border border-amber-600 hover:scale-110 duration-300"
          aria-label="Artista anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={handleNext}
          className="bg-transparent hover:bg-amber-600 hover:text-black text-amber-600 p-2 rounded-full transition border border-amber-600 hover:scale-110 duration-300"
          aria-label="Próximo artista"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Artist Info Display */}
      {artists[currentIndex] && (
        <div className="text-center max-w-3xl mx-auto px-4 py-6 border-t border-gray-800">
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
            {artists[currentIndex].description}
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 mt-6 text-xs uppercase tracking-widest font-semibold flex-wrap">
            <div>
              <p className="text-amber-400 text-sm md:text-base">{artists[currentIndex].stats.shows}</p>
              <p className="text-gray-500 text-xs">Shows/Ano</p>
            </div>
            <div>
              <p className="text-amber-400 text-sm md:text-base">{artists[currentIndex].stats.streams}</p>
              <p className="text-gray-500 text-xs">Streams</p>
            </div>
            <div>
              <p className="text-amber-400 text-sm md:text-base">{artists[currentIndex].stats.followers}</p>
              <p className="text-gray-500 text-xs">Seguidores</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
