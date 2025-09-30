import { useComicNavigation } from '../../hooks/useComicNavigation';
import { type Comic } from '../../types/comic';
import ComicGrid from './ComicGrid';
import ComicViewer from './ComicViewer';
import { ComicsProvider } from './contexts/ComicsContext';

// Datos de ejemplo mejorados
const mockComics: Comic[] = [
  {
    id: '1',
    title: 'Primera Ley de newton',
    image: '/comics/primera_ley-001.png',
    description: 'Primera Ley',
    author: '',
    publishedDate: '2024',
    category: 'Aventura',
pages: [
      { id: '1-1', image: '/comics/primera_ley-001.png', title: 'Página 1' },
      { id: '1-2', image: '/comics/primera_ley-002.png', title: 'Página 2' },
      { id: '1-3', image: '/comics/primera_ley-003.png', title: 'Página 3' },
      { id: '1-3', image: '/comics/primera_ley-004.png', title: 'Página 4' },
      { id: '1-3', image: '/comics/primera_ley-005.png', title: 'Página 5' },
      { id: '1-3', image: '/comics/primera_ley-006.png', title: 'Página 6' },
    ]
  },

];

function ComicsSectionContent() {
  const {
    selectedComic,
    currentPage,
    isModalOpen,
    openComic,
    closeComic,
    nextPage,
    prevPage,
    goToPage,
  } = useComicNavigation();

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Biblioteca de Cómics
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Comics ilustrativos 
          </p>
        </div>

        {/* Grid de cómics */}
        <ComicGrid 
          comics={mockComics} 
          onComicSelect={openComic}
        />

        {/* Modal del cómic */}
        {selectedComic && (
          <ComicViewer
            comic={selectedComic}
            currentPage={currentPage}
            isOpen={isModalOpen}
            onClose={closeComic}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            onPageSelect={goToPage}
          />
        )}
      </div>
    </section>
  );
}

export default function ComicsSection() {
  return (
    <ComicsProvider>
      <ComicsSectionContent />
    </ComicsProvider>
  );
}