// components/comics/ComicCard.tsx
import { type Comic } from './types/comic';
import { motion } from 'framer-motion';

interface ComicCardProps {
  comic: Comic;
  onClick: () => void;
}

export default function ComicCard({ comic, onClick }: ComicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-300 group-hover:border-white/40">
        <div className="relative overflow-hidden">
          <img
            src={comic.image}
            alt={comic.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          
          {/* Efecto de brillo al hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
            {comic.title}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-2">
            {comic.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
              {comic.pages.length} páginas
            </span>
            <motion.div
              whileHover={{ x: 5 }}
              className="text-blue-400 text-sm font-medium"
            >
              Ver cómic →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}