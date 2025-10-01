

import { useState } from 'react';
import CommentsGrid from './CommentsGrid';
import CommentForm from './CommentForm';
import { useComments } from '@/hooks/useComments';
import { Button } from '@/components/ui/button';
import { Trash2, MessageCircle } from 'lucide-react';

export default function CommentsSection() {
  const { comments, loading, addComment, clearAllComments } = useComments();
  const [showForm, setShowForm] = useState(true);

  const handleSubmitComment = (name: string, comment: string) => {
    addComment(name, comment);
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-pink-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-slate-300 mt-4">Cargando comentarios...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 to-pink-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Comentarios
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Comparte tus pensamientos y opiniones sobre los cómics
          </p>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
          </Button>

          {comments.length > 0 && (
            <Button
              onClick={clearAllComments}
              variant="outline"
              className="border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpiar Todos
            </Button>
          )}
        </div>

        {/* Formulario de comentarios */}
        {showForm && (
          <div className="mb-12">
            <CommentForm onSubmit={handleSubmitComment} />
          </div>
        )}

        {/* Grid de comentarios */}
        {comments.length > 0 ? (
          <CommentsGrid comments={comments} />
        ) : (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-300 mb-2">
              No hay comentarios aún
            </h3>
            <p className="text-slate-400">
              Sé el primero en compartir tu opinión
            </p>
          </div>
        )}

        {/* Estadísticas */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-6 bg-slate-800/50 rounded-2xl px-6 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {comments.length}
              </div>
              <div className="text-sm text-slate-400">Comentarios</div>
            </div>
            <div className="h-8 w-px bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">
                {new Set(comments.map(c => c.name)).size}
              </div>
              <div className="text-sm text-slate-400">Personas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}