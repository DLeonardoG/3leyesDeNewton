// components/infographics/InfographicsGrid.tsx
import { type Infographic } from '@/types/infographic';
import InfographicCard from './InfographicCard';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface InfographicsGridProps {
  infographics: Infographic[];
  onInfographicSelect: (infographic: Infographic) => void;
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

export default function InfographicsGrid({ 
  infographics, 
  onInfographicSelect 
}: InfographicsGridProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid ${getGridCols()} gap-6 lg:gap-8`}
    >
      {infographics.map((infographic, index) => (
        <InfographicCard
          key={infographic.id}
          infographic={infographic}
          index={index}
          onSelect={onInfographicSelect}
        />
      ))}
    </motion.div>
  );
}