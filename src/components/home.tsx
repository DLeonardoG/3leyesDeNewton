import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    content: "First slide",
    bg: "bg-base-200/60",
  },
  {
    id: 2,
    content: "Second slide",
    bg: "bg-base-200/80",
  },
  {
    id: 3,
    content: "Third slide",
    bg: "bg-base-200",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAutoPlay = true;
  const speed = 3000; // ms autoplay speed

  // autoplay effect
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, speed);
    return () => clearInterval(interval);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="w-full h-full">
      <div className="relative w-full">
        {/* Carousel */}
        <div className="overflow-hidden relative h-80">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`flex-shrink-0 w-full h-full ${slide.bg} flex justify-center items-center`}
              >
                <span className="text-2xl sm:text-4xl">{slide.content}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={prevSlide}
            type="button"
            className="absolute top-1/2 left-5 -translate-y-1/2 size-10 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm hover:bg-base-200"
          >
            <span className="icon-[tabler--chevron-left] size-5 cursor-pointer"></span>
            <span className="sr-only">Previous</span>
          </button>

          <button
            onClick={nextSlide}
            type="button"
            className="absolute top-1/2 right-5 -translate-y-1/2 size-10 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm hover:bg-base-200"
          >
            <span className="icon-[tabler--chevron-right] size-5"></span>
            <span className="sr-only">Next</span>
          </button>
        </div>

        {/* Optional indicators */}
        <div className="flex justify-center mt-3 space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 w-3 rounded-full ${
                currentIndex === idx ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <h1 className="text-xl font-bold">Las 3 Leyes de Newton</h1>
        <p className="text-gray-600">Explicación</p>
      </div>
    </section>
  );
};

export default Home;
