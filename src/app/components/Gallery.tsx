'use client';

import Image from "next/image";
import { useState, useCallback, memo, useEffect } from "react";

const galleryImages = [
  '/galeria1.png', '/galeria2.png', '/galeria3.png', '/galeria4.png', '/galeria5.png',
  '/galeria6.png', '/galeria7.png', '/galeria8.png', '/galeria9.png', '/galeria10.png',
  '/galeria11.png', '/galeria12.png', '/galeria13.png', '/galeria14.png', '/galeria15.png',
  '/galeria16.png', '/galeria17.png', '/galeria18.png', '/galeria19.png', '/galeria20.png',
  '/galeria21.png', '/galeria22.png', '/galeria23.png'
];

// Componente de imagen de galería memoizado
const GalleryImage = memo(function GalleryImage({ 
  src, 
  index, 
  onClick 
}: { 
  src: string; 
  index: number; 
  onClick: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className="relative h-56 md:h-64 rounded-lg lg:rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      <Image
        src={src}
        alt={`Vista ${index + 1} de la propiedad`}
        fill
        className="object-cover"
        loading="lazy"
        quality={75}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
});

// Iconos memoizados
const ArrowLeftLarge = memo(function ArrowLeftLarge() {
  return (
    <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
    </svg>
  );
});

const ArrowRightLarge = memo(function ArrowRightLarge() {
  return (
    <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  );
});

const CloseIcon = memo(function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
});

// Modal Component
const GalleryModal = memo(function GalleryModal({
  isOpen,
  imageIndex,
  onClose,
  onPrev,
  onNext
}: {
  isOpen: boolean;
  imageIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Manejar teclas de navegación
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>

        {/* Image */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={galleryImages[imageIndex]}
            alt={`Vista ${imageIndex + 1} de la propiedad`}
            width={1920}
            height={1080}
            className="max-w-full max-h-full object-contain w-auto h-auto"
            quality={90}
            priority
          />
        </div>

        {/* Navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
          aria-label="Imagen anterior"
        >
          <ArrowLeftLarge />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
          aria-label="Imagen siguiente"
        >
          <ArrowRightLarge />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-base">
          {imageIndex + 1} / {galleryImages.length}
        </div>
      </div>
    </div>
  );
});

export default function Gallery() {
  const [gallerySlide, setGallerySlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const nextGallerySlide = useCallback(() => {
    setGallerySlide((prev) => Math.min(prev + 6, galleryImages.length - 6));
  }, []);

  const prevGallerySlide = useCallback(() => {
    setGallerySlide((prev) => Math.max(prev - 6, 0));
  }, []);

  const openModal = useCallback((index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const nextModalImage = useCallback(() => {
    setModalImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevModalImage = useCallback(() => {
    setModalImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const visibleImages = galleryImages.slice(gallerySlide, gallerySlide + 6);

  return (
    <>
      <section id="galeria" className="py-12 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 lg:mb-12 font-playfair">
            Galería de Imágenes
          </h2>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Grid de 2 filas x 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {visibleImages.map((src, idx) => (
                <GalleryImage
                  key={gallerySlide + idx}
                  src={src}
                  index={gallerySlide + idx}
                  onClick={() => openModal(gallerySlide + idx)}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            {gallerySlide > 0 && (
              <button
                onClick={prevGallerySlide}
                className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 lg:p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
                aria-label="Fotos anteriores"
              >
                <ArrowLeftLarge />
              </button>
            )}
            {gallerySlide + 6 < galleryImages.length && (
              <button
                onClick={nextGallerySlide}
                className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 lg:p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
                aria-label="Fotos siguientes"
              >
                <ArrowRightLarge />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <GalleryModal
        isOpen={modalOpen}
        imageIndex={modalImageIndex}
        onClose={closeModal}
        onPrev={prevModalImage}
        onNext={nextModalImage}
      />
    </>
  );
}
