// components/comics/ComicModal.tsx
import { useState } from 'react';
import { type Comic } from './types/comic';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ComicModalProps {
  comic: Comic;
  isOpen: boolean;
  onClose: () => void;
}

export default function ComicModal({ comic, isOpen, onClose }: ComicModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < comic.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevPage();
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Botón cerrar */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </motion.button>

          {/* Contenedor principal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-4xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
              <h2 className="text-2xl font-bold text-white text-center">
                {comic.title}
              </h2>
              <p className="text-gray-300 text-center mt-2">
                Página {currentPage + 1} de {comic.pages.length}
              </p>
            </div>

            {/* Navegación */}
            <div className="absolute inset-y-0 left-0 flex items-center z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`ml-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ${
                  currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft size={32} />
              </motion.button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextPage}
                disabled={currentPage === comic.pages.length - 1}
                className={`mr-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ${
                  currentPage === comic.pages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronRight size={32} />
              </motion.button>
            </div>

            {/* Contenido de la página */}
            <div className="flex items-center justify-center h-full pt-20 pb-8 px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center items-center h-full"
                >
                  <img
                    src={comic.pages[currentPage].image}
                    alt={comic.pages[currentPage].title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicadores de página */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex justify-center space-x-2">
                {comic.pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentPage 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}