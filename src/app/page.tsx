'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const heroSlides = [
    { type: 'image', src: '/casa1.png' },
    { type: 'image', src: '/casa2.png' },
    { type: 'video', src: '/casa3.mp4' },
    { type: 'image', src: '/casa4.png' },
    { type: 'image', src: '/casa5.png' },
    { type: 'image', src: '/casa6.png' },
    { type: 'image', src: '/casa7.png' },
  ];

  const galleryImages = [
    '/galeria1.png', '/galeria2.png', '/galeria3.png', '/galeria4.png', '/galeria5.png',
    '/galeria6.png', '/galeria7.png', '/galeria8.png', '/galeria9.png', '/galeria10.png',
    '/galeria11.png', '/galeria12.png', '/galeria13.png', '/galeria14.png', '/galeria15.png',
    '/galeria16.png', '/galeria17.png', '/galeria18.png', '/galeria19.png', '/galeria20.png',
    '/galeria21.png', '/galeria22.png', '/galeria23.png'
  ];

  const nextHeroSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextGallerySlide = () => {
    setGallerySlide((prev) => Math.min(prev + 6, galleryImages.length - 6));
  };

  const prevGallerySlide = () => {
    setGallerySlide((prev) => Math.max(prev - 6, 0));
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    presupuesto: '',
    mensaje: '',
    fechaEstimada: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simular envío (sin backend por ahora)
    setTimeout(() => {
      setSubmitMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        presupuesto: '',
        mensaje: '',
        fechaEstimada: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const features = [
    { title: "510 m²", desc: "Superficie cubierta" },
    { title: "1600 m²", desc: "Terreno (2 lotes)" },
    { title: "6 Cocheras", desc: "Cubiertas" },
  ];

  const amenities = [
    "Sistema Béton Brut (hormigón crudo)",
    "Piscina 12x5 con filtrado automático",
    "Sauna privada con gimnasio",
    "Quincho integrado con cocina",
    "Ático en tercera planta",
    "Family room con biblioteca",
    "Aire acondicionado en todos los ambientes",
    "Calefacción por losa radiante",
    "Generador automático",
    "Riego automático controlado por celular",
    "Fogonero con parrilla al aire libre",
    "Master suite con balcón terraza"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo centrado en mobile */}
            <div className="flex items-center justify-center w-full lg:w-auto lg:justify-start">
              <Image
                src="/alinavbar.png"
                alt="Logo"
                width={140}
                height={50}
                className="h-10 lg:h-14 w-auto"
                priority
              />
            </div>
            
            {/* Menú hamburguesa para mobile */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2"
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Menú desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#detalles" className="text-gray-700 hover:text-gray-900 transition">Detalles</a>
              <a href="#caracteristicas" className="text-gray-700 hover:text-gray-900 transition">Características</a>
              <a href="#galeria" className="text-gray-700 hover:text-gray-900 transition">Galería</a>
              <a href="#contacto" className="text-gray-700 hover:text-gray-900 transition">Contacto</a>
              <a href="#contacto" className="bg-[#0d306c] text-white px-6 py-2 hover:bg-[#0a2451] transition">
                Agendar visita
              </a>
            </div>
          </div>
          
          {/* Menú mobile desplegable */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 text-center">
                <a 
                  href="#detalles" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition py-2"
                >
                  Detalles
                </a>
                <a 
                  href="#caracteristicas"
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-gray-700 hover:text-gray-900 transition py-2"
                >
                  Características
                </a>
                <a 
                  href="#galeria"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition py-2"
                >
                  Galería
                </a>
                <a 
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition py-2"
                >
                  Contacto
                </a>
                <a 
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#0d306c] text-white px-6 py-3 hover:bg-[#0a2451] transition mx-8"
                >
                  Agendar visita
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Mobile First */}
      <section className="relative pt-16 lg:pt-20 bg-white">
        <div className="px-4 sm:px-6 lg:pl-8 lg:pr-0 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 py-12 lg:py-20">
            {/* Text Content - 40% en desktop */}
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

            {/* Image/Placeholder - 60% en desktop */}
            <div className="w-full lg:w-3/5">
              <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group bg-gray-900">
                {/* Slide actual */}
                {heroSlides[heroSlide].type === 'image' ? (
                  <Image
                    key={`hero-${heroSlide}`}
                    src={heroSlides[heroSlide].src}
                    alt={`Vista ${heroSlide + 1} de la propiedad`}
                    fill
                    className="object-cover"
                    priority={heroSlide === 0}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                ) : (
                  <video
                    key={`hero-video-${heroSlide}`}
                    src={heroSlides[heroSlide].src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}

                {/* Flecha Izquierda */}
                <button
                  onClick={prevHeroSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition z-20"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Flecha Derecha */}
                <button
                  onClick={nextHeroSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition z-20"
                  aria-label="Imagen siguiente"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === heroSlide 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Contador de slides */}
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-20">
                  {heroSlide + 1} / {heroSlides.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Stats - Mobile First */}
      <section className="py-12 lg:py-16 bg-[#0d306c]/8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl lg:text-xl font-bold text-gray-900 mb-2 lg:mb-1">{feature.title}</div>
                <div className="text-sm lg:text-xs text-gray-600">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Property - Mobile First */}
      <section id="detalles" className="py-12 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contenedor para video + CTA */}
            <div className="order-1 md:order-2 flex flex-col md:flex-row gap-6 items-center md:items-start md:justify-self-end">
              {/* Video - Más angosto y vertical */}
              <div className="relative h-56 md:h-[500px] lg:h-[550px] w-full md:w-80 lg:w-96 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl bg-gray-900 flex-shrink-0">
                {/* Video de Cloudinary */}
                <video
                  src="https://res.cloudinary.com/dlxuigjrd/video/upload/v1768853781/alibroker_p3wr2g.mp4"
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              {/* CTA Consultanos - Al lado derecho del video */}
              <a 
                href="#contacto"
                className="flex flex-col items-center justify-center gap-2 text-center group h-56 md:h-[500px] lg:h-[550px]"
              >
                <span className="text-lg lg:text-xl font-bold text-[#0d306c] font-playfair group-hover:text-[#e74144] transition">
                  Consultanos!
                </span>
                <div className="text-[#0d306c] group-hover:text-[#e74144] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Texto segundo en mobile, primero en desktop */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 font-playfair">
                Una Residencia Única con Sistema Béton Brut
              </h2>
              <p className="text-base lg:text-lg text-gray-700 mb-4 lg:mb-6">
                Esta excepcional propiedad se desarrolla en tres plantas sobre dos lotes que suman 1600m², 
                ofreciendo intimidad absoluta y amplias vistas libres. Construida con sistema &apos;Béton Brut&apos; 
                (hormigón crudo), un estilo que resalta la nobleza del material.
              </p>
              <p className="text-base lg:text-lg text-gray-700 mb-4 lg:mb-6">
                Con 510 m² cubiertos, cuenta con ambientes amplios, la mayoría en doble altura y muy luminosos, 
                destacando la armonía e integración perfecta de los espacios. Cada detalle ha sido pensado 
                para ofrecer confort y elegancia.
              </p>
              <p className="text-base lg:text-lg text-gray-700">
                La distribución inteligente incluye espacios únicos como sauna privada con gimnasio, 
                ático para recreación, family room con biblioteca, y una master suite completamente 
                independiente con balcón terraza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Mobile First */}
      <section id="caracteristicas" className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#e74144] uppercase">Características</p>
              <h2 className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl font-playfair">Detalles de la propiedad</h2>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {amenities.map((amenity, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm lg:text-base text-neutral-800 shadow-sm hover:shadow-md transition">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e74144]/10 text-[#e74144] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {amenity}
              </span>
            ))}
          </div>
          
          {/* Detailed sections - Mobile First */}
          <div className="mt-8 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-[#0d306c]/8 p-6 lg:p-8 rounded-xl shadow-md">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center md:text-left font-playfair">Planta Baja</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-700 text-sm lg:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Living de grandes dimensiones con ventanales piso a techo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Comedor integrado con salida a amplia galería</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Cocina equipada de alta calidad con amoblamiento premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Quincho integrable con paños de vidrio plegables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Piscina 12x5 con solárium de piso atérmico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Sauna privada y gimnasio con vista al jardín</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Fogonero con parrilla al aire libre</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0d306c]/8 p-6 lg:p-8 rounded-xl shadow-md">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center md:text-left font-playfair">Planta Alta</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-700 text-sm lg:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Family room con pantalla y vistas al jardín</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Escritorio para 2+ personas con doble altura</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Biblioteca imponente integrando los espacios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>3 dormitorios con vestidores y espacio para escritorios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Baño compartimentado con ducha, bañera y doble bacha</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Master Suite independiente con vestidor amplio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Suite con pantalla 360° y balcón terraza privado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>Ático en tercera planta para múltiples usos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Mobile First */}
      <section id="galeria" className="py-12 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 lg:mb-12 font-playfair">
            Galería de Imágenes
          </h2>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Grid de 2 filas x 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {galleryImages.slice(gallerySlide, gallerySlide + 6).map((src, idx) => (
                <div 
                  key={gallerySlide + idx} 
                  onClick={() => openModal(gallerySlide + idx)}
                  className="relative h-56 md:h-64 rounded-lg lg:rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`Vista ${gallerySlide + idx + 1} de la propiedad`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {gallerySlide > 0 && (
              <button
                onClick={prevGallerySlide}
                className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 lg:p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
                aria-label="Fotos anteriores"
              >
                <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {gallerySlide + 6 < galleryImages.length && (
              <button
                onClick={nextGallerySlide}
                className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 lg:p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
                aria-label="Fotos siguientes"
              >
                <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Location - Mobile First */}
      <section className="py-12 lg:py-20 bg-[#0d306c]/8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 font-playfair">
                Altos de Campo Grande
              </h2>
              <div className="mb-8 lg:mb-10"></div>
              <ul className="space-y-3 lg:space-y-4">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-[#0d306c] text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base font-playfair">Privacidad única:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> Sin construcciones alrededor, con vistas libres</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-[#0d306c] text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base font-playfair">Espacio común:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> Los lotes dan a un área que garantiza intimidad</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-[#0d306c] text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base font-playfair">Estacionamiento:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> 6 cocheras cubiertas + espacio para 8 vehículos más</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-[#0d306c] text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base font-playfair">Entorno natural:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> Jardín amplio con riego automático</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-96 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3292.0234567890123!2d-58.8472782!3d-34.4055111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9de06d7ea891%3A0xe69bd4825dbe9f40!2sAltos%20de%20Campo%20Grande!5e0!3m2!1ses!2sar!4v1737398400000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Altos de Campo Grande"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Mobile First */}
      <section id="contacto" className="py-12 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4 font-playfair">
              Recibe Asesoría Personalizada
            </h2>
            <p className="text-base lg:text-lg text-gray-700">
              Completa el formulario y nos pondremos en contacto contigo inmediatamente
            </p>
          </div>
          
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg text-center ${submitMessage.includes('Gracias') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-6 lg:p-8 rounded-xl lg:rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                  Primer nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base"
                  placeholder="Juan"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base"
                  placeholder="juan@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base"
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                  Presupuesto <span className="text-gray-500 text-sm">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={formData.presupuesto}
                  onChange={(e) => setFormData({...formData, presupuesto: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base"
                  placeholder="$2,000,000 - $3,000,000"
                />
              </div>
            </div>

            <div className="mb-4 lg:mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                Fecha estimada de compra <span className="text-gray-500 text-sm">(opcional)</span>
              </label>
              <input
                type="text"
                value={formData.fechaEstimada}
                onChange={(e) => setFormData({...formData, fechaEstimada: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base"
                placeholder="Ej: En 3 meses, Este año, etc."
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                Mensaje <span className="text-gray-500 text-sm">(opcional)</span>
              </label>
              <textarea
                rows={4}
                value={formData.mensaje}
                onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d306c] focus:border-transparent text-base"
                placeholder="Me gustaría obtener más información sobre esta propiedad..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0d306c] text-white py-4 text-base lg:text-lg font-semibold hover:bg-[#0a2451] transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg active:scale-95"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Asesoría'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer - Mobile First */}
      <footer className="bg-white border-t border-gray-200 py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/alinavbar.png"
              alt="Logo"
              width={200}
              height={70}
              className="h-16 lg:h-20 w-auto mx-auto"
            />
          </div>
          <p className="text-gray-600 text-sm lg:text-base mb-8">
            Especialistas en propiedades exclusivas
          </p>
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-xs lg:text-sm">
              &copy; 2026 Ali Broker. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Galería */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {/* Botón Cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen */}
            <div 
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[modalImageIndex]}
                alt={`Vista ${modalImageIndex + 1} de la propiedad`}
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain w-auto h-auto"
                quality={90}
                priority
              />
            </div>

            {/* Flecha Izquierda */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevModalImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
              aria-label="Imagen anterior"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flecha Derecha */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextModalImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all hover:scale-110 z-10"
              aria-label="Imagen siguiente"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Contador */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-base">
              {modalImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
