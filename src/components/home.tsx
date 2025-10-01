import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardHeader,
  CardTitle,
} from "@/components/ui/card";

gsap.registerPlugin(useGSAP);

const slides = [
  {
    id: 1,
    title: "Primera Ley de Newton",
    subtitle: "Ley de Inercia",
    content:
      "Un cuerpo permanece en reposo o en movimiento rectilíneo uniforme a menos que una fuerza externa actúe sobre él.",
    bg: "bg-gradient-to-r from-amber-500/20 to-orange-600/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
    example:
      "Cuando un vehículo frena bruscamente, tu cuerpo se inclina hacia adelante por inercia.",
    image: "/sliders/primera.jpeg",
  },
  {
    id: 2,
    title: "Segunda Ley de Newton",
    subtitle: "Ley Fundamental de la Dinámica",
    content:
      "La fuerza neta aplicada sobre un cuerpo es proporcional a la aceleración que adquiere.",
    bg: "bg-gradient-to-r from-green-500/20 to-teal-600/20",
    border: "border-green-500/30",
    text: "text-green-400",
    example:
      "Empujar un carrito de supermercado: a mayor fuerza, mayor aceleración.",
    image: "/sliders/segunda.jpeg",
  },
  {
    id: 3,
    title: "Tercera Ley de Newton",
    subtitle: "Ley de Acción-Reacción",
    content: "Por cada acción hay una reacción igual y opuesta.",
    bg: "bg-gradient-to-r from-amber-500/20 to-orange-600/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
    example:
      "Al caminar, empujas el suelo hacia atrás (acción) y el suelo te empuja hacia adelante (reacción).",
    image: "/sliders/tercera.jpeg",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAutoPlay = true;
  const speed = 5000; // ms autoplay speed
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      ".newton-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.6,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const slides = containerRef.current.children;
    gsap.fromTo(
      slides[currentIndex],
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" }
    );
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, speed);
    return () => clearInterval(interval);
  }, [currentIndex]);

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
    <section className="w-full h-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-8 px-4 dark">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Bienvenidos!!!
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto"
          >
            Las tres leyes que ya usas sin darte cuenta, explicada con ejemplos
            reales.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="mb-16 rounded-xl overflow-hidden w-[16/9] shadow-2xl shadow-black/50">
          <div className="relative w-full">
            {/* Carousel */}
            <div className="overflow-hidden relative h-96 md:h-[500px] rounded-xl">
              <div
                ref={containerRef}
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="flex-shrink-0 w-full h-full relative"
                  >
                    {/* Background Image Only */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-contain"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Content Overlay */}
                    
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-5 -translate-y-1/2 size-12 bg-black/50 hover:bg-black/70 border-slate-600 text-white rounded-full shadow-lg z-20 backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-5 -translate-y-1/2 size-12 bg-black/50 hover:bg-black/70 border-slate-600 text-white rounded-full shadow-lg z-20 backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 z-20">
              <div className="flex justify-center space-x-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? "bg-white scale-125"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {slides.map((slide) => (
            <Card
              key={slide.id}
              className={`newton-card overflow-hidden border-2 ${slide.border} bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 ${slide.bg}`} />
                <div className="absolute bottom-4 left-4 text-white">
                  <CardTitle className="text-xl">{slide.title}</CardTitle>
                  <CardDescription className="text-slate-200">
                    {slide.subtitle}
                  </CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="mb-4 text-slate-300">{slide.content}</p>
                <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                  <p className="text-sm text-slate-300 italic">
                    <span className="font-semibold">Ejemplo: </span>
                    {slide.example}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;