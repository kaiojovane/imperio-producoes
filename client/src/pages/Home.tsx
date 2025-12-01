import { useLocation } from 'wouter';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArtistsCarousel from '@/components/ArtistsCarousel';
import { useArtists } from '@/hooks/useArtists';

export default function Home() {
  const [, setLocation] = useLocation();
  const { artists } = useArtists();

  const handleNavigateToArtist = (id: number) => {
    setLocation(`/artist/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center animate-zoom"
            style={{
              // CORREÇÃO: Usando a imagem de fundo enviada
              backgroundImage: "url('/artists/fundo01.jpg')",
            }}
          ></div>
        </div>
        {/* Overlay escuro para melhorar leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          {/* Logo */}
          <div className="mb-8 sm:mb-12 animate-fade-in flex flex-col items-center">
            {/* CORREÇÃO: Usando a imagem do Leão (brasão) como Logo */}
            <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 mb-6 sm:mb-8 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(217,119,6,0.3)] border-4 border-amber-600/30 overflow-hidden bg-black">
               <img 
                 src="/artists/leão.jpg" 
                 alt="Logo Império" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-full"></div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight drop-shadow-xl tracking-tight uppercase">
            Excelência em <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 bg-clip-text text-transparent">
              Grandes Eventos
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Levando os maiores talentos do Brasil para o seu palco. A excelência que seu evento merece com elenco exclusivo e gestão artística profissional.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => {
              const element = document.getElementById('artistas');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-sm hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transition duration-300 transform hover:-translate-y-1 tracking-widest text-xs sm:text-sm drop-shadow-lg cursor-pointer border border-amber-400/20"
          >
            VER ARTISTAS
            <ChevronDown size={18} className="sm:w-5 sm:h-5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artistas" className="py-16 sm:py-24 bg-black relative overflow-hidden border-t border-amber-600/20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-widest text-white mb-4 uppercase">
              Artistas <span className="text-amber-600">Exclusivos</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
          </div>

          {/* Carousel */}
          <ArtistsCarousel artists={artists} onNavigateToArtist={handleNavigateToArtist} />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden border-t border-amber-600/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
            {/* Image (CORREÇÃO: Usando leão4.jpg) */}
            <div className="relative group">
  {/* Brilho externo (mantido do original) */}
  <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 to-amber-400 blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 rounded-lg"></div>
  
  <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800/50 aspect-square sm:aspect-video md:aspect-auto md:h-[500px] flex items-center justify-center">
    
    {/* NOVA LUZ DE FUNDO: Cria um brilho dourado atrás da imagem */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700/30 via-black to-black opacity-100"></div>

    <img 
      src="/artists/leão4.jpg" 
      alt="Império Produções" 
      className="
        w-full h-full 
        object-contain 
        transition duration-500 
        scale-115  /* Aumenta um pouco a imagem */
        mix-blend-screen /* O TRUQUE: Faz o preto da imagem sumir, fundindo o dourado */
        opacity-100 hover:opacity-100 brightness-125
        /* Máscara para suavizar as bordas e evitar cortes retos */
        [mask-image:radial-gradient(closest-side,white,transparent)]
      "
    />
  </div>
</div>

            {/* Content */}
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 text-white tracking-tight uppercase">
                O LEGADO <span className="text-amber-600">IMPÉRIO</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mb-6 sm:mb-8 rounded-full"></div>

              <p className="text-gray-300 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg font-light tracking-wide text-justify">
                A Império Produções não apenas realiza eventos; nós forjamos experiências inesquecíveis. Com uma curadoria artística rigorosa e expertise técnica de ponta, somos a ponte entre artistas visionários e palcos monumentais. Nossa missão é transformar cada show em um marco histórico.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🎵', title: 'PRODUÇÃO 360º' },
                  { icon: '🌍', title: 'GESTÃO GLOBAL' },
                  { icon: '⭐', title: 'BOOKING PREMIUM' },
                  { icon: '📅', title: 'LOGÍSTICA TURNÊ' },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-center gap-4 p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-amber-600 transition duration-300 hover:-translate-y-1 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition">{feature.icon}</span>
                    <span className="font-bold text-white tracking-widest text-xs sm:text-sm">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 sm:py-24 bg-black relative overflow-hidden border-t border-amber-600/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 text-white tracking-tight uppercase">FALE CONOSCO</h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                {
                  icon: '📞',
                  title: 'ATENDIMENTO',
                  items: [
                    { label: '+55 (34) 99630-9945 "GIL"', href: 'https://wa.me/+5534996309945' },
                    { label: '+55 (62) 99611-8200 "Robson"', href: 'https://wa.me/+5562996118200' },
                    { label: '+55 (62) 99830-9952 "JLX"', href: 'https://wa.me/+5562998309952' },
                  ],
                },
                {
                  icon: '✉️',
                  title: 'EMAIL COMERCIAL',
                  items: [{ label: 'sacimperioproducoes@gmail.com', href: 'mailto:ollivarafael@gmail.com' }],
                },
                {
                  icon: '📍',
                  title: 'ESCRITÓRIO',
                  items: [{ label: 'Brasília - DF', href: '#' }],
                },
              ].map((contact) => (
                <div key={contact.title} className="flex items-start gap-6 group">
                  <div className="bg-gray-900 p-4 rounded-full text-amber-600 shrink-0 border border-gray-800 group-hover:border-amber-600 transition duration-300 shadow-lg">
                    <span className="text-2xl">{contact.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg tracking-widest mb-2">{contact.title}</h4>
                    {contact.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-gray-400 hover:text-amber-400 transition font-light block text-base mb-1"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <form className="bg-gray-900/30 p-8 sm:p-10 rounded-xl border border-gray-800 shadow-2xl space-y-6">
              <div>
                <label className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-2 block">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 transition duration-300 font-light"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 transition duration-300 font-light"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-2 block">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 transition duration-300 font-light resize-none"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold py-4 rounded-md hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition duration-300 transform hover:-translate-y-1 tracking-widest text-sm uppercase"
              >
                ENVIAR MENSAGEM
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/+5562998309952"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-600 hover:bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] transition duration-300 transform hover:scale-110 animate-bounce"
        aria-label="Contato via WhatsApp"
      >
        <span className="text-3xl">💬</span>
      </a>

      <Footer />
    </div>
  );
}