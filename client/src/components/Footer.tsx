import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-amber-600/20">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-black text-white mb-4 tracking-widest">
              IMPÉRIO <span className="text-amber-400">PRODUÇÕES</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Levando os maiores talentos do Brasil para o seu palco. A excelência que seu evento merece com elenco exclusivo e gestão artística profissional.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">Contato</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition">
                <Phone size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <a href="tel:+5562996118200" className="text-xs sm:text-sm break-all">+55 (62) 99830-9952</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition">
                <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <a href="mailto:ollivarafael@gmail.com" className="text-xs sm:text-sm break-all">sacimperioproducoes@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Brasília - DF</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">Redes Sociais</h4>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-gray-800 transition duration-300 border border-gray-800 hover:border-amber-400"
              >
                <Instagram size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-gray-800 transition duration-300 border border-gray-800 hover:border-amber-400"
              >
                <Facebook size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:bg-gray-800 transition duration-300 border border-gray-800 hover:border-amber-400"
              >
                <Youtube size={16} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-xs uppercase tracking-widest">
            © {currentYear} Império Produções. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
