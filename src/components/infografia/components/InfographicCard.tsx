// components/infographics/InfographicCard.tsx
import { type Infographic } from '@/types/infographic';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, 
  // ExternalLink, 
  Download } from 'lucide-react';

interface InfographicCardProps {
  infographic: Infographic;
  index: number;
  onSelect: (infographic: Infographic) => void;
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.1
    }
  }
};

export default function InfographicCard({ 
  infographic, 
  onSelect 
}: InfographicCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = infographic.pdfUrl;
    link.download = `${infographic.title}.pdf`;
    link.click();
  };

  return (
    <motion.div
      variants={cardVariants}
      className="h-full"
    >
      <Card 
        className="group relative h-full overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500 hover:bg-slate-700/50 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer"
        onClick={() => onSelect(infographic)}
      >
        {/* Icono de PDF */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-center"
          >
            <FileText className="w-16 h-16 text-emerald-400 mb-4" />
            <p className="text-emerald-300 font-medium">PDF Document</p>
          </motion.div>
          
          {/* Botones de acción */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
              title="Descargar PDF"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 leading-tight">
            {infographic.title}
          </h3>
          
          <p className="text-slate-300 leading-relaxed line-clamp-3">
            {infographic.description}
          </p>

          {/* Indicador de acción */}
          <motion.div
            whileHover={{ x: 5 }}
            className="text-cyan-400 text-sm font-medium flex items-center mt-4"
          >
            Abrir infografía
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              →
            </motion.span>
          </motion.div>

          {/* Badge informativo */}
          <div className="mt-2">
            <span className="text-xs bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded-full">
              Se abrirá en nueva pestaña
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}