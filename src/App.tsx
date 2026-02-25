import { useState, useMemo } from 'react';
import { Search, Music, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Song {
  id: number;
  title: string;
  key: string;
  artist?: string;
  category?: string;
  timeSignature?: string;
}

const INITIAL_SONGS: Song[] = [
  { id: 1, title: "A Casa é Sua", key: "A", artist: "Casa Worship", timeSignature: "4/4" },
  { id: 2, title: "A Ele a Glória", key: "Am", artist: "Gabriel Guedes", timeSignature: "4/4" },
  { id: 3, title: "Águas Profundas", key: "G", artist: "David Quinlan", timeSignature: "4/4" },
  { id: 5, title: "Bondade de Deus", key: "G", artist: "Isaías Saad", timeSignature: "4/4" },
  { id: 6, title: "Caminho no Deserto", key: "C", artist: "Soraya Moraes", timeSignature: "4/4" },
  { id: 7, title: "É Tudo Sobre Você", key: "G", artist: "Morada", timeSignature: "4/4" },
  { id: 8, title: "Eu Te Vejo Em Tudo", key: "G", artist: "Casa Worship", timeSignature: "4/4" },
  { id: 9, title: "Hosana", key: "E", artist: "Gabriela Rocha", timeSignature: "4/4" },
  { id: 10, title: "Jeová Jireh", key: "C", artist: "Aline Barros", timeSignature: "4/4" },
  { id: 11, title: "Lindo És", key: "A", artist: "Juliano Son", timeSignature: "4/4" },
  { id: 12, title: "Lugar Secreto", key: "C#m", artist: "Gabriela Rocha", timeSignature: "4/4" },
  { id: 13, title: "Me Atraiu", key: "E", artist: "Gabriela Rocha", timeSignature: "4/4" },
  { id: 14, title: "Ousado Amor", key: "Gb", artist: "Isaias Saad", timeSignature: "6/8" },
  { id: 15, title: "Preciso de Ti", key: "C", artist: "Diante do Trono", timeSignature: "4/4" },
  { id: 16, title: "Quão Lindo Esse Nome É", key: "D", artist: "Aline Barros", timeSignature: "4/4" },
  { id: 17, title: "Ressuscita-me", key: "G", artist: "Aline Barros", timeSignature: "4/4" },
  { id: 18, title: "Santo Espírito", key: "D", artist: "Laura Souguellis", timeSignature: "4/4" },
  { id: 19, title: "Só Tu És Santo", key: "A", artist: "Morada", timeSignature: "4/4" },
  { id: 20, title: "Todavia Me Alegrarei", key: "C", artist: "Samuel Messias", timeSignature: "4/4" },
  { id: 21, title: "Vitorioso És", key: "D", artist: "Gabriel Guedes", timeSignature: "4/4" },
];

const normalizeString = (str: string) => 
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = useMemo(() => {
    const normalizedQuery = normalizeString(searchQuery);
    return INITIAL_SONGS.filter(song => {
      const normalizedTitle = normalizeString(song.title);
      const normalizedArtist = normalizeString(song.artist || "");
      const normalizedKey = normalizeString(song.key);
      
      return normalizedTitle.includes(normalizedQuery) ||
        normalizedArtist.includes(normalizedQuery) ||
        normalizedKey.includes(normalizedQuery);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <header className="pt-12 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="serif text-5xl font-medium text-[#5A5A40] mb-2">Vivos com Cristo</h1>
          <p className="text-sm uppercase tracking-widest text-[#8a8a70] font-medium">REPERTORIO</p>
        </motion.div>
      </header>

      {/* Search */}
      <div className="sticky top-0 z-10 px-6 mb-8">
        <div className="max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#8a8a70]" />
          </div>
          <input
            type="text"
            placeholder="Buscar música ou artista..."
            className="w-full bg-white/90 backdrop-blur-md border border-[#5A5A40]/5 rounded-full py-4 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-[#5A5A40]/20 focus:outline-none transition-all placeholder:text-[#8a8a70]/50 text-[#1a1a1a]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Song List */}
      <main className="px-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-end mb-4 px-2">
          <h2 className="serif text-2xl text-[#5A5A40]">Músicas</h2>
          <span className="text-xs font-medium text-[#8a8a70] uppercase tracking-tighter">
            {filteredSongs.length} {filteredSongs.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredSongs.map((song, index) => (
              <motion.div
                key={song.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#5A5A40]/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                    <Music className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] leading-tight">{song.title}</h3>
                    <p className="text-xs text-[#8a8a70] mt-0.5 font-medium italic">{song.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Hash className="h-3 w-3 text-[#8a8a70]" />
                      <span className="text-lg font-bold text-[#5A5A40] leading-none">{song.key}</span>
                    </div>
                    {song.timeSignature && (
                      <span className="text-[10px] uppercase tracking-widest text-[#8a8a70] font-bold opacity-60">
                        {song.timeSignature}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredSongs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-sm">
                <Search className="h-8 w-8 text-[#d1d1c1]" />
              </div>
              <p className="text-[#8a8a70] serif text-xl">Nenhuma música encontrada</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#5A5A40] text-sm font-semibold underline underline-offset-4"
              >
                Limpar busca
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer / Info */}
      <footer className="mt-20 px-6 text-center">
        <div className="w-12 h-px bg-[#d1d1c1] mx-auto mb-6" />
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a70] font-bold">
          Ministério de Louvor &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
