// components/comics/ComicGrid.tsx
import { motion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { type Comic } from '../../types/comic';
import ComicCard from './ComicCard';

interface ComicGridProps {
  comics: Comic[];
  onComicSelect: (comic: Comic) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ComicGrid({ comics, onComicSelect }: ComicGridProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid ${getGridCols()} gap-4 sm:gap-6 lg:gap-8`}
    >
      {comics.map((comic, index) => (
        <ComicCard
          key={comic.id}
          comic={comic}
          index={index}
          onSelect={onComicSelect}
        />
      ))}
    </motion.div>
  );
}