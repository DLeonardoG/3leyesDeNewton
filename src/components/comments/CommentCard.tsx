// components/comments/CommentCard.tsx
import { type Comment } from '@/types/comment';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { User, Clock, Trash2 } from 'lucide-react';
import { useComments } from '@/hooks/useComments';

interface CommentCardProps {
  comment: Comment;
  index: number;
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

export default function CommentCard({ comment }: CommentCardProps) {
  const { deleteComment } = useComments();

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <motion.div
      className="h-full"
    >
      <Card className="h-full border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 group">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Header con nombre y tiempo */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  {comment.name}
                </h4>
                <div className="flex items-center text-slate-400 text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimeAgo(comment.timestamp)}
                </div>
              </div>
            </div>

            {/* Botón eliminar */}
            <motion.button
              onClick={() => deleteComment(comment.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-pink-400 transition-all"
              title="Eliminar comentario"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Contenido del comentario */}
          <div className="flex-1">
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {comment.comment}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}