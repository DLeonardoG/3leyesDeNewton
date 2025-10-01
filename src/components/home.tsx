import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
    bg: "bg-gradient-to-r from-amber-100/70 to-orange-200/70",
    example:
      "Cuando un vehículo frena bruscamente, tu cuerpo se inclina hacia adelante por inercia.",
    image:
      "/sliders/primera.jpeg",
  },
  {
    id: 2,
    title: "Segunda Ley de Newton",
    subtitle: "Ley Fundamental de la Dinámica",
    content:
      "La fuerza neta aplicada sobre un cuerpo es proporcional a la aceleración que adquiere.",
    bg: "bg-gradient-to-r from-green-500/70 to-teal-600/70",
    example:
      "Empujar un carrito de supermercado: a mayor fuerza, mayor aceleración.",
    image:
      "/sliders/segunda.jpeg",
  },
  {
    id: 3,
    title: "Tercera Ley de Newton",
    subtitle: "Ley de Acción-Reacción",
    content: "Por cada acción hay una reacción igual y opuesta.",
    bg: "bg-gradient-to-r from-amber-500/70 to-orange-600/70",
    example:
      "Al caminar, empujas el suelo hacia atrás (acción) y el suelo te empuja hacia adelante (reacción).",
    image:
      "/sliders/tercera.jpeg",
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
    <section className="w-full h-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
          >
            Bienvenidos!!!
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto"
          >
            Las tres leyes que ya usas sin darte cuenta, explicada con ejemplos
            reales.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="mb-16 rounded-xl overflow-hidden w-[16/9]  shadow-xl">
          <div className="relative w-full">
            {/* Carousel */}
            <div className="overflow-hidden relative h-96 md:h-[500px] rounded-xl">
              <div
                ref={containerRef}
                className="flex transition-transform duration-700  ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="flex-shrink-0 w-full  h-full relative"
                  >
                    {/* Background Image Only */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-contain"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-black opacity-20`}
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-5 -translate-y-1/2 size-12 bg-white/80 hover:bg-white rounded-full shadow-lg z-20"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-5 -translate-y-1/2 size-12 bg-white/80 hover:bg-white rounded-full shadow-lg z-20"
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
                        : "bg-white/50"
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
              className="newton-car overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 ${slide.bg} opacity-80`} />
                <div className="absolute bottom-4 left-4 text-white">
                  <CardTitle className="text-xl">{slide.title}</CardTitle>
                  <CardDescription className="text-white/90">
                    {slide.subtitle}
                  </CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="mb-4 text-slate-700">{slide.content}</p>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <p className="text-sm text-slate-700 italic">
                    Ejemplo: {slide.example}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="text-center bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Quieres aprender más?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Explora nuestro contenido interactivo para entender cómo las Leyes de Newton gobiernan cada aspecto de tu vida diaria.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Comenzar Tutorial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Ver Ejemplos
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Home;
