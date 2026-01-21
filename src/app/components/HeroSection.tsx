'use client';

import Image from "next/image";
import { useState, useCallback, useEffect, memo } from "react";

const heroSlides = [
  { type: 'image' as const, src: '/casa1.png' },
  { type: 'image' as const, src: '/casa2.png' },
  { type: 'video' as const, src: '/casa3.mp4' },
  { type: 'image' as const, src: '/casa4.png' },
  { type: 'image' as const, src: '/casa5.png' },
  { type: 'image' as const, src: '/casa6.png' },
  { type: 'image' as const, src: '/casa7.png' },
];

// Componente memoizado para los indicadores
const SlideIndicators = memo(function SlideIndicators({ 
  total, 
  current, 
  onSelect 
}: { 
  total: number; 
  current: number; 
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`w-2 h-2 rounded-full transition-all ${
            idx === current 
              ? 'bg-white w-8' 
              : 'bg-white/50 hover:bg-white/75'
          }`}
          aria-label={`Ir a imagen ${idx + 1}`}
        />
      ))}
    </div>
  );
});

// Iconos de flecha memoizados
const ArrowLeft = memo(function ArrowLeft() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
});

const ArrowRight = memo(function ArrowRight() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
});

export default function HeroSection() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextHeroSlide = useCallback(() => {
    setHeroSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevHeroSlide = useCallback(() => {
    setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const selectSlide = useCallback((idx: number) => {
    setHeroSlide(idx);
  }, []);

  const currentSlide = heroSlides[heroSlide];

  return (
    <section className="relative pt-16 lg:pt-20 bg-white">
      <div className="px-4 sm:px-6 lg:pl-8 lg:pr-0 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 py-12 lg:py-20">
          {/* Text Content */}
          <div className="w-full lg:w-2/5 text-center lg:text-left lg:pr-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
              Exclusiva Casa<br/>en Altos de<br/>Campo Grande
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
              Construida sobre dos lotes de 1600m² con sistema Béton Brut. 510m² cubiertos de pura elegancia y diseño arquitectónico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#contacto" 
                className="inline-block bg-[#0d306c] text-white px-8 py-4 text-base font-semibold hover:bg-[#0a2451] transition shadow-lg hover:shadow-xl"
              >
                Solicitar Asesoría
              </a>
              <a 
                href="#galeria" 
                className="inline-block border-2 border-[#0d306c] text-[#0d306c] px-8 py-4 text-base font-semibold hover:bg-[#0d306c]/10 transition"
              >
                Ver Galería
              </a>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="w-full lg:w-3/5">
            <div className={`relative h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group bg-gray-900 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {currentSlide.type === 'image' ? (
                <Image
                  key={`hero-${heroSlide}`}
                  src={currentSlide.src}
                  alt={`Vista ${heroSlide + 1} de la propiedad`}
                  fill
                  className="object-cover"
                  priority={heroSlide === 0}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFESESMUFRBhNx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAABAAL/2gAMAwEAAhEDEEA/AMf0bU7Gm6hHdqyGKaM7qw/RwR3BHII5B7Zp0n5LqNnWdQuXJhPYnYySybAbsf4B/AB5wYwYss//2Q=="
                />
              ) : (
                <video
                  key={`hero-video-${heroSlide}`}
                  src={currentSlide.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevHeroSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition z-20"
                aria-label="Imagen anterior"
              >
                <ArrowLeft />
              </button>

              <button
                onClick={nextHeroSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition z-20"
                aria-label="Imagen siguiente"
              >
                <ArrowRight />
              </button>

              {/* Indicators */}
              <SlideIndicators 
                total={heroSlides.length} 
                current={heroSlide} 
                onSelect={selectSlide} 
              />

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-20">
                {heroSlide + 1} / {heroSlides.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
