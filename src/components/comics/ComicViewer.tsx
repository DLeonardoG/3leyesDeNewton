// components/comics/ComicViewer.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minimize2
} from 'lucide-react';
import { useState } from 'react';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { type Comic } from '../../types/comic';

interface ComicViewerProps {
  comic: Comic;
  currentPage: number;
  isOpen: boolean;
  onClose: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageSelect: (page: number) => void;
}

export default function ComicViewer({
  comic,
  currentPage,
  isOpen,
  onClose,
  onNextPage,
  onPrevPage,
  onPageSelect,
}: ComicViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Hook para navegación por teclado
  useKeyboardNavigation(onNextPage, onPrevPage, onClose, isOpen);

  const currentPageData = comic.pages[currentPage];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`max-w-7xl p-0 gap-0 overflow-hidden bg-slate-900 border-slate-700 ${
          isFullscreen ? 'w-screen h-screen max-w-none rounded-none' : ''
        }`}
      >
        <DialogHeader className="p-4 sm:p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg sm:text-xl flex items-center gap-4">
              <span>{comic.title}</span>
              <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                Página {currentPage + 1} de {comic.pages.length}
              </Badge>
            </DialogTitle>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-slate-400 hover:text-white"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </Button>
              
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </Button> */}
            </div>
          </div>
        </DialogHeader>

        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-[60vh] sm:min-h-[70vh]">
          {/* Navigation Buttons */}
          <AnimatePresence>
            {currentPage > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={onPrevPage}
                  className="h-12 w-12 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border-slate-600"
                >
                  <ChevronLeft size={24} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {currentPage < comic.pages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={onNextPage}
                  className="h-12 w-12 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border-slate-600"
                >
                  <ChevronRight size={24} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comic Page */}
          <div className="flex items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center items-center max-w-full max-h-full"
              >
                <motion.img
                  src={currentPageData.image}
                  alt={currentPageData.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Page Indicators */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {comic.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => onPageSelect(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPage
                    ? 'bg-blue-500 scale-125'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}