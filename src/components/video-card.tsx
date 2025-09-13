import React, { useState } from 'react';

interface VideoCardProps {
  youtubeId: string;
  thumbnailSrc: string;
  title: string;
  description: string;
  duration: string;
  category?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  youtubeId,
  thumbnailSrc,
  title,
  description,
  duration,
  category
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Card */}
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
        onClick={openModal}
      >
        <div className="relative">
          <img 
            src={thumbnailSrc} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {duration}
          </div>
          {category && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
              {category}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* YouTube Video */}
              <div className="lg:col-span-2">
                <div className="relative pb-[56.25%] h-0"> {/* 16:9 aspect ratio */}
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              </div>
              
              {/* Descripción */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg h-full">
                  <h3 className="font-semibold text-lg mb-3">Descripción</h3>
                  <p className="text-gray-700 mb-4">{description}</p>
                  
                  <div className="space-y-2">
                    {category && (
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Categoría:</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{category}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <span className="text-gray-500 w-24">Duración:</span>
                      <span className="font-medium">{duration}</span>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Ver más detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
