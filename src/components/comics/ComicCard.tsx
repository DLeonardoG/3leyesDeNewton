// components/comics/ComicCard.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { type Comic } from '../../types/comic';

interface ComicCardProps {
  comic: Comic;
  index: number;
  onSelect: (comic: Comic) => void;
}

// const cardVariants = {
//   hidden: { 
//     opacity: 0, 
//     y: 20,
//     scale: 0.9
//   },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 15
//     }
//   }
// };

export default function ComicCard({ comic, 
  // index,
   onSelect }: ComicCardProps) {
  return (
    <motion.div
      className="h-full"
    >
      <Card 
        className="group relative h-full overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:bg-slate-700/50 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
        onClick={() => onSelect(comic)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <motion.img
            src={comic.image}
            alt={comic.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Eye className="w-4 h-4 mr-2" />
              Ver Cómic
            </Button>
          </motion.div>

          {/* Category Badge */}
          {comic.category && (
            <Badge className="absolute top-3 left-3 bg-slate-900/80 text-slate-100 border-slate-600">
              {comic.category}
            </Badge>
          )}
        </div>

        <CardContent className="p-4 sm:p-6">
          {/* <h3 className="font-bold text-lg sm:text-xl text-white mb-2 line-clamp-2 leading-tight">
            {comic.title}
          </h3> */}
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4">
            {comic.description}
          </p>

          {/* Metadata */}
          {/* <div className="space-y-2">
            {comic.author && (
              <div className="flex items-center text-slate-400 text-sm">
                <User className="w-4 h-4 mr-2" />
                <span className="line-clamp-1">{comic.author}</span>
              </div>
            )}
            
            {comic.publishedDate && (
              <div className="flex items-center text-slate-400 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{comic.publishedDate}</span>
              </div>
            )}
          </div> */}
        </CardContent>

        <CardFooter className="p-4 sm:p-6 pt-0 flex justify-between items-center">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            {comic.pages.length} páginas
          </Badge>
          
          <motion.div
            whileHover={{ x: 5 }}
            className="text-blue-400 text-sm font-medium flex items-center"
          >
            Leer ahora
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              →
            </motion.span>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}