// components/comments/CommentsGrid.tsx
import { type Comment } from '@/types/comment';
import CommentCard from './CommentCard';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface CommentsGridProps {
  comments: Comment[];
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

export default function CommentsGrid({ comments }: CommentsGridProps) {
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
      className={`grid ${getGridCols()} gap-6`}
    >
      {comments.map((comment, index) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          index={index}
        />
      ))}
    </motion.div>
  );
}