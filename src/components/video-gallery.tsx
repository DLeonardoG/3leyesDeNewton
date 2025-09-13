import React from 'react';
import VideoCard from './video-card';

const VideoGallery: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Galería de Videos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VideoCard
          youtubeId="Ke90Tje7VS0"
          thumbnailSrc="https://img.youtube.com/vi/Ke90Tje7VS0/hqdefault.jpg"
          title="React JS - Curso Completo desde Cero"
          description="Aprende React.js desde cero en este curso completo de Fazt en español."
          duration="2:00:00"
          category="Tutorial"
        />

        <VideoCard
          youtubeId="dFgzHOX84xQ"
          thumbnailSrc="https://img.youtube.com/vi/dFgzHOX84xQ/hqdefault.jpg"
          title="Tailwind CSS Crash Course"
          description="Curso rápido de Tailwind CSS para aprender a diseñar con utilidades."
          duration="1:05:13"
          category="Diseño"
        />

        <VideoCard
          youtubeId="zQnBQ4tB3ZA"
          thumbnailSrc="https://img.youtube.com/vi/zQnBQ4tB3ZA/hqdefault.jpg"
          title="React + TypeScript - Guía completa"
          description="Curso completo sobre cómo usar TypeScript con React."
          duration="3:12:45"
          category="Desarrollo"
        />
      </div>
    </div>
  );
};

export default VideoGallery;
