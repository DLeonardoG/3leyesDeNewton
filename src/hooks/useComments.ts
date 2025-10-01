// hooks/useComments.ts
import { useState, useEffect } from 'react';
import { type Comment } from '@/types/comment';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar comentarios del localStorage al iniciar
  useEffect(() => {
    const savedComments = localStorage.getItem('comics-comments');
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (error) {
        console.error('Error loading comments:', error);
        setComments([]);
      }
    }
    setLoading(false);
  }, []);

  // Guardar comentarios en localStorage cuando cambien
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('comics-comments', JSON.stringify(comments));
    }
  }, [comments, loading]);

  const addComment = (name: string, comment: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: comment.trim(),
      timestamp: Date.now(),
    };

    setComments(prev => [newComment, ...prev]);
  };

  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
  };

  const clearAllComments = () => {
    setComments([]);
  };

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    clearAllComments,
  };
}