// components/comments/CommentForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, MessageSquare } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (name: string, comment: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      alert('Por favor completa ambos campos');
      return;
    }

    if (comment.trim().length < 5) {
      alert('El comentario debe tener al menos 5 caracteres');
      return;
    }

    setIsSubmitting(true);
    
    // Simular un pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(name, comment);
    setName('');
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <Card className="border-purple-700 bg-slate-800/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
          Agregar Comentario
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Tu Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="¿Cómo te llamas?"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              maxLength={50}
              required
            />
          </div>

          {/* Campo Comentario */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-slate-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Tu Comentario
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tus pensamientos sobre los cómics..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-vertical"
              maxLength={500}
              required
            />
            <div className="text-right text-xs text-slate-400 mt-1">
              {comment.length}/500 caracteres
            </div>
          </div>

          {/* Botón de enviar */}
          <Button
            type="submit"
            disabled={isSubmitting || !name.trim() || !comment.trim() || comment.length < 5}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Publicar Comentario
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}