// components/comics/ComicsSection.tsx

import { useState } from 'react';
import {type Comic } from './types/comic';
import ComicCard from './ComicCard';
import ComicModal from './ComicModal';

// Datos de ejemplo - reemplaza con tu data real
const mockComics: Comic[] = [
  {
    id: '1',
    title: 'The Amazing Adventure',
    image: '/comics/comic1.jpg',
    description: 'Una emocionante aventura épica',
    pages: [
      { id: '1-1', image: '/comics/primera_ley-001.png', title: 'Página 1' },
      { id: '1-2', image: '/comics/primera_ley-002.png', title: 'Página 2' },
      { id: '1-3', image: '/comics/primera_ley-003.png', title: 'Página 3' },
    ]
  },
  {
    id: '2',
    title: 'Mystery in Space',
    image: '/comics/comic2.jpg',
    description: 'Un misterio interestelar',
    pages: [
      { id: '2-1', image: '/comics/page4.jpg', title: 'Página 1' },
      { id: '2-2', image: '/comics/page5.jpg', title: 'Página 2' },
    ]
  },
  // Agrega más comics aquí...
];

export default function ComicsSection() {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openComic = (comic: Comic) => {
    setSelectedComic(comic);
    setIsModalOpen(true);
  };

  const closeComic = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedComic(null), 300); // Espera a que termine la animación
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Biblioteca de Cómics
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explora nuestra colección de cómics y sumérgete en historias épicas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockComics.map((comic) => (
            <ComicCard
              key={comic.id}
              comic={comic}
              onClick={() => openComic(comic)}
            />
          ))}
        </div>

        {selectedComic && (
          <ComicModal
            comic={selectedComic}
            isOpen={isModalOpen}
            onClose={closeComic}
          />
        )}
      </div>
    </section>
  );
}