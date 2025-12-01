import { useLocation } from 'wouter';
import { ChevronLeft, Music, Calendar, Star, CheckCircle2, MessageCircle, Instagram, Youtube } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useArtistById } from '@/hooks/useArtists';

export default function ArtistDetail() {
  const [location] = useLocation();
  const artistId = location.split('/').pop() || null;
  const { artist, loading } = useArtistById(artistId);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http') || imagePath.startsWith('/') || imagePath.startsWith('artists')) {
      return imagePath;
    }
    return `/artists/${imagePath}`;
  };

  if (loading || !artist) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-gray-500 font-heading tracking-widest">CARREGANDO...</div>;
  }

  // Lógica do número do WhatsApp (Específico do artista ou Padrão)
  const whatsappNumber = artist.whatsapp ? artist.whatsapp.replace(/\D/g, '') : "5562996118200";

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <Header />

      {/* Botão Voltar */}
      <a href="/" className="fixed top-24 left-4 sm:left-6 z-50 group">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 group-hover:border-amber-600 transition-all shadow-lg">
          <ChevronLeft size={20} className="text-white group-hover:text-amber-400" />
          <span className="font-heading font-bold tracking-widest text-xs sm:text-sm text-white group-hover:text-amber-400 hidden sm:inline">VOLTAR</span>
        </div>
      </a>

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(artist.image)} 
            alt={artist.name} 
            className="w-full h-full object-cover object-top brightness-[0.8]" 
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-24 z-10">
          <div className="container mx-auto">
            <span className="bg-amber-600 text-black text-xs font-bold px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] mb-4 inline-block shadow-[0_0_20px_rgba(217,119,6,0.6)]">
              {artist.genre}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl leading-none">
              {artist.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-200 font-light tracking-wide text-base sm:text-lg border-l-2 border-amber-500 pl-4">
              <span>📍 {artist.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Info */}
      <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12 relative z-20 bg-black">
        {/* Coluna da Esquerda (Conteúdo) */}
        <div className="flex-1 space-y-16">
          
          {/* Bio */}
          <div>
            <h2 className="font-heading text-3xl text-white mb-8 border-b border-gray-800 pb-4 inline-block">
              BIOGRAFIA
            </h2>
            <p className="text-gray-300 text-lg leading-loose font-light text-justify first-letter:text-5xl first-letter:font-heading first-letter:text-amber-600 first-letter:float-left first-letter:mr-3">
              {artist.description}
            </p>
          </div>

          {/* Stats Grid (AGORA SÓ COM 2 ITENS: STREAMS E SEGUIDORES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-900/30 border border-gray-800 p-8 text-center rounded-sm hover:border-amber-600/50 transition duration-500 group">
              <Music className="mx-auto text-amber-600 mb-4 group-hover:scale-110 transition" size={28} />
              <h3 className="font-heading text-4xl font-black text-white mb-2">{artist.stats.streams}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-500">Streams</p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 p-8 text-center rounded-sm hover:border-amber-600/50 transition duration-500 group">
              <Star className="mx-auto text-amber-600 mb-4 group-hover:scale-110 transition" size={28} />
              <h3 className="font-heading text-4xl font-black text-white mb-2">{artist.stats.followers}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-500">Seguidores</p>
            </div>
          </div>

          {/* Discography */}
          {artist.albums && artist.albums.length > 0 && (
            <div>
              <h2 className="font-heading text-3xl text-white mb-8 border-b border-gray-800 pb-4 inline-block">DISCOGRAFIA</h2>
              <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
                {artist.albums.map((album) => (
                  <div key={album.title} className="min-w-[200px] group cursor-pointer">
                    <div className="w-full aspect-square overflow-hidden shadow-xl mb-4 relative bg-gray-900 border border-gray-800">
                      <div className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition z-10 mix-blend-overlay"></div>
                      <img 
                        src={getImageUrl(album.cover)} 
                        alt={album.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/400x400/1a1a1a/FFF?text=Capa';
                        }}
                      />
                    </div>
                    <p className="text-amber-500 text-xs font-bold mb-1">{album.year}</p>
                    <p className="text-white font-heading font-bold text-lg leading-tight uppercase group-hover:text-amber-400 transition">{album.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Direita) */}
        <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0">
          <div className="sticky top-28 space-y-6">
            
            {/* Card de Contratação */}
            <div className="relative group rounded-xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              
              <div className="relative bg-black/90 backdrop-blur-xl border border-amber-500/30 p-8 rounded-xl shadow-2xl">
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-lg">
                    <Calendar className="text-black w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white leading-none">CONTRATAR</h3>
                    <p className="text-amber-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Agenda 2025 Aberta</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm font-light mb-6 leading-relaxed">
                  Garanta a presença de <strong className="text-white font-bold">{artist.name}</strong> no seu evento.
                </p>

                <div className="space-y-3 mb-8">
                  {["Atendimento 24h", "Suporte Total", "Produção Técnica"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* BOTÃO PRINCIPAL (SEM NÚMEROS AVULSOS EM CIMA) */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de um orçamento para ${artist.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center justify-center gap-3 w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-400 text-black font-heading font-black py-4 rounded-lg text-sm tracking-[0.15em] transition-all duration-300 shadow-[0_5px_20px_rgba(217,119,6,0.3)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.5)] transform hover:-translate-y-1"
                >
                  <MessageCircle size={20} className="group-hover/btn:scale-110 transition" />
                  ORÇAMENTO WHATSAPP
                </a>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="grid grid-cols-2 gap-4">
              {artist.instagram && (
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 py-3 rounded-lg text-white hover:border-amber-600 hover:text-amber-500 hover:bg-gray-800 transition duration-300 group shadow-lg"
                >
                  <Instagram size={20} className="group-hover:scale-110 transition" />
                  <span className="text-xs font-heading font-bold tracking-widest">INSTAGRAM</span>
                </a>
              )}
              
              {(artist.youtube && artist.youtube !== '#' && artist.youtube !== '') ? (
                <a
                  href={artist.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 py-3 rounded-lg text-white hover:border-red-600 hover:text-red-500 hover:bg-gray-800 transition duration-300 group shadow-lg"
                >
                  <Youtube size={20} className="group-hover:scale-110 transition" />
                  <span className="text-xs font-heading font-bold tracking-widest">YOUTUBE</span>
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 bg-gray-900/50 border border-gray-800/50 py-3 rounded-lg text-gray-600 cursor-not-allowed">
                  <Youtube size={20} />
                  <span className="text-xs font-heading font-bold tracking-widest">YOUTUBE</span>
                </div>
              )}
            </div>

            {/* Spotify Player */}
            {artist.spotifyID && (
              <div className="relative group pt-4">
                <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-40 transition duration-700"></div>
                <div className="relative border-t border-gray-800 pt-6">
                  <h4 className="text-white font-heading text-sm mb-4 tracking-widest flex items-center gap-2">
                    <Music size={16} className="text-green-500" /> TOP HITS
                  </h4>
                  <iframe
                    src={`https://open.spotify.com/embed/artist/${artist.spotifyID}?utm_source=generator&theme=0`}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl shadow-2xl opacity-100 hover:shadow-green-900/20 transition duration-500"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}