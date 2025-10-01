import React from "react";
import VideoCard from "./video-card";

const VideoGallery: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Experimentos en Casa de cada Ley</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VideoCard
          youtubeId="4ocrp8O8naE"
          thumbnailSrc="https://img.youtube.com/vi/4ocrp8O8naE/hqdefault.jpg"
          title="Las LEYES de NEWTON (Explicación con Ejemplos)"
          description="Explicación clara de las tres leyes de Newton con ejemplos prácticos y demostraciones."
          duration="0:11:42"
          category="Física"
        />
        <VideoCard
          youtubeId="xO8X3RxJS3k"
          thumbnailSrc="https://img.youtube.com/vi/xO8X3RxJS3k/hqdefault.jpg"
          title="Las 3 LEYES de NEWTON (Dinámica)"
          description="Análisis detallado de las leyes de Newton que rigen el movimiento de los cuerpos."
          duration="0:19:53"
          category="Física"
        />

        <VideoCard
          youtubeId="A7Ii4x_uaTg"
          thumbnailSrc="https://img.youtube.com/vi/A7Ii4x_uaTg/hqdefault.jpg"
          title="LEYES DE NEWTON - Física para principiantes"
          description="Introducción a las leyes del movimiento de Newton de manera sencilla y accesible."
          duration="0:09:15"
          category="Física"
        />
      </div>
    </div>
  );
};

export default VideoGallery;