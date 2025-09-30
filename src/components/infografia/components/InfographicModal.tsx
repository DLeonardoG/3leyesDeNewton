// components/infographics/InfographicModal.tsx
import { type Infographic } from '@/types/infographic';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  X, 
  Download, 
//   Maximize2,
//   Minimize2,
  ExternalLink
} from 'lucide-react';
import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface InfographicModalProps {
  infographic: Infographic;
  isOpen: boolean;
  onClose: () => void;
}

export default function InfographicModal({
  infographic,
  isOpen,
  onClose,
}: InfographicModalProps) {
//   const [isFullscreen, setIsFullscreen] = useState(true); // Siempre fullscreen por defecto en PC
  const isMobile = useMediaQuery('(max-width: 768px)');

  // En móvil, no deberíamos mostrar el modal, pero por si acaso
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
      window.open(infographic.pdfUrl, '_blank');
    }
  }, [isMobile, isOpen, infographic.pdfUrl, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = infographic.pdfUrl;
    link.download = `${infographic.title}.pdf`;
    link.click();
  };

  const handleOpenInNewTab = () => {
    window.open(infographic.pdfUrl, '_blank');
  };

  // Si es móvil, no renderizar el modal
  if (isMobile) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-screen h-screen max-w-none rounded-none p-0 gap-0 overflow-hidden bg-slate-900 border-0"
      >
        <DialogHeader className="p-4 sm:p-6 border-b border-slate-700 bg-slate-800/90 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg sm:text-xl truncate max-w-2xl">
              {infographic.title}
            </DialogTitle>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenInNewTab}
                className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-600/20"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Nueva pestaña
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-600/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Contenedor del PDF a pantalla completa */}
        <div className="flex-1 bg-slate-800 h-[calc(100vh-80px)]">
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={infographic.pdfUrl}
            className="w-full h-full border-0"
            title={infographic.title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}