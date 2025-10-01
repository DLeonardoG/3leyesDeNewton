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
    description: 'Newton viaja al futuro y descubre cómo su ley de la inercia explica el uso del cinturón de seguridad para protegernos cuando un auto frena de golpe.',
    author: '',
    publishedDate: '2024',
    category: 'Ciencia',
pages: [
      { id: '1-1', image: '/comics/primera_ley-001.png', title: 'Página 1' },
      { id: '1-2', image: '/comics/primera_ley-002.png', title: 'Página 2' },
      { id: '1-3', image: '/comics/primera_ley-003.png', title: 'Página 3' },
      { id: '1-3', image: '/comics/primera_ley-004.png', title: 'Página 4' },
      { id: '1-3', image: '/comics/primera_ley-005.png', title: 'Página 5' },
      { id: '1-3', image: '/comics/primera_ley-006.png', title: 'Página 6' },
    ]
  },
  {
    id: '2',
    title: 'Segunda Ley de newton',
    image: '/comics/segunda_ley/segunda_ley-001.png',
    description: 'En otro viaje al futuro, Newton aprende que para una buena aceleración en un vehículo no basta con un motor grande: hay que considerar también su masa según su segunda ley.',
    author: '',
    publishedDate: '2024',
    category: 'Ciencia',
pages: [
      { id: '1-1', image: '/comics/segunda_ley/segunda_ley-001.png', title: 'Página 1' },
      { id: '1-2', image: '/comics/segunda_ley/segunda_ley-002.png', title: 'Página 2' },
      { id: '1-3', image: '/comics/segunda_ley/segunda_ley-003.png', title: 'Página 3' },
      { id: '1-3', image: '/comics/segunda_ley/segunda_ley-004.png', title: 'Página 4' },
      { id: '1-3', image: '/comics/segunda_ley/segunda_ley-005.png', title: 'Página 5' },
      { id: '1-3', image: '/comics/segunda_ley/segunda_ley-006.png', title: 'Página 6' },
    ]
  },
  {
    id: '3',
    title: 'Tercera Ley de newton',
    image: '/comics/tercera_ley/tercera_ley_de_newton_-001.png',
    description: 'Newton es invitado a volar en un cohete espacial y comprende cómo su tercera ley —acción y reacción— hace posible que estas enormes máquinas se eleven.',
    author: '',
    publishedDate: '2024',
    category: 'Ciencia',
pages: [
      { id: '1-1', image: '/comics/tercera_ley/tercera_ley_de_newton_-001.png', title: 'Página 1' },
      { id: '1-2', image: '/comics/tercera_ley/tercera_ley_de_newton_-002.png', title: 'Página 2' },
      { id: '1-3', image: '/comics/tercera_ley/tercera_ley_de_newton_-003.png', title: 'Página 3' },
      { id: '1-3', image: '/comics/tercera_ley/tercera_ley_de_newton_-004.png', title: 'Página 4' },
      { id: '1-3', image: '/comics/tercera_ley/tercera_ley_de_newton_-005.png', title: 'Página 5' },
      { id: '1-3', image: '/comics/tercera_ley/tercera_ley_de_newton_-006.png', title: 'Página 6' },
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
            Tres historietas que convierten las Leyes de Newton en aventuras fáciles de entender y recordar.
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