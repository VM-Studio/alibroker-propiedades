'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const slides = [
    { type: 'image', src: '/casa1.png' },
    { type: 'image', src: '/casa2.png' },
    { type: 'video', src: '/casa3.mp4' },
    { type: 'image', src: '/casa4.png' },
    { type: 'image', src: '/casa5.png' },
    { type: 'image', src: '/casa6.png' },
    { type: 'image', src: '/casa7.png' },
  ];

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

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
    { title: "4 Dormitorios", desc: "Con vestidores" },
    { title: "3 Baños", desc: "+ 1 Toilette" },
    { title: "6 Cocheras", desc: "Cubiertas" },
    { title: "Piscina 12x5", desc: "Con solárium" },
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
              <a href="#contacto" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
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
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mx-8"
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
        {/* Mobile: Video arriba, texto abajo centrado */}
        <div className="lg:hidden w-full">
          {/* Video Mobile */}
          <div className="relative w-full h-[60vh]">
            <video 
              controls 
              className="w-full h-full object-cover"
              preload="metadata"
            >
              <source src="https://res.cloudinary.com/dlxuigjrd/video/upload/v1768853781/alibroker_p3wr2g.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
          
          {/* Texto Mobile - Todo centrado */}
          <div className="px-6 py-8 text-center bg-gradient-to-b from-gray-50 to-white">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              Exclusiva Casa en<br/>Altos de Campo Grande
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
              Construida sobre dos lotes de 1600m² con sistema Béton Brut. 510m² cubiertos de pura elegancia y diseño arquitectónico.
            </p>
            <a 
              href="#contacto" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Solicitar Asesoría
            </a>
          </div>
        </div>

        {/* Desktop: Layout lado a lado */}
        <div className="hidden lg:block w-full">
          <div className="grid grid-cols-12 gap-0 items-stretch">
            {/* Left Column - Text Content (35%) */}
            <div className="col-span-4 space-y-4 px-8 py-8 bg-gray-50/50">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Exclusiva Casa en<br/>Altos de Campo Grande
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Construida sobre dos lotes de 1600m² con sistema Béton Brut. 510m² cubiertos de pura elegancia y diseño arquitectónico.
              </p>
              <div className="pt-2">
                <a 
                  href="#contacto" 
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  Solicitar Asesoría
                </a>
              </div>
            </div>

            {/* Right Column - Video (65%) */}
            <div className="col-span-8 relative w-full h-[550px]">
              <video 
                controls 
                className="w-full h-full object-cover"
                preload="metadata"
              >
                <source src="https://res.cloudinary.com/dlxuigjrd/video/upload/v1768853781/alibroker_p3wr2g.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats - Mobile First */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
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
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Carrusel primero en mobile, segundo en desktop */}
            <div className="relative h-64 md:h-96 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl bg-gray-900 order-1 md:order-2">
              {/* Carrusel de imágenes y video */}
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ zIndex: idx === currentSlide ? 10 : 0 }}
                >
                  {slide.type === 'image' ? (
                    <img
                      src={slide.src}
                      alt={`Vista ${idx + 1} de la propiedad`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={slide.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                </div>
              ))}
              
              {/* Indicadores */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2" style={{ zIndex: 20 }}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlide 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Ir a imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Texto segundo en mobile, primero en desktop */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
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
      <section id="caracteristicas" className="py-12 lg:py-20 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 lg:mb-12">
            Características Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="bg-white p-5 lg:p-6 rounded-xl shadow-md hover:shadow-lg transition text-center md:text-left">
                <div className="text-blue-600 text-2xl mb-2">✓</div>
                <div className="text-gray-900 font-semibold text-sm lg:text-base">{amenity}</div>
              </div>
            ))}
          </div>
          
          {/* Detailed sections - Mobile First */}
          <div className="mt-8 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-md">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">Planta Baja</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-700 text-sm lg:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Living de grandes dimensiones con ventanales piso a techo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Comedor integrado con salida a amplia galería</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Cocina equipada de alta calidad con amoblamiento premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Quincho integrable con paños de vidrio plegables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Piscina 12x5 con solárium de piso atérmico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Sauna privada y gimnasio con vista al jardín</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Fogonero con parrilla al aire libre</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-md">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">Planta Alta</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-700 text-sm lg:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Family room con pantalla y vistas al jardín</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Escritorio para 2+ personas con doble altura</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Biblioteca imponente integrando los espacios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>3 dormitorios con vestidores y espacio para escritorios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Baño compartimentado con ducha, bañera y doble bacha</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Master Suite independiente con vestidor amplio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Suite con pantalla 360° y balcón terraza privado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 lg:mb-12">
            Galería de Imágenes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              "/galeria1.png",
              "/galeria2.png",
              "/galeria3.png",
              "/galeria4.png",
              "/galeria5.png",
              "/galeria6.png"
            ].map((src, idx) => (
              <div key={idx} className="relative h-56 md:h-64 rounded-lg lg:rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={src}
                  alt={`Vista ${idx + 1} de la propiedad`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location - Mobile First */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                Altos de Campo Grande
              </h2>
              <p className="text-base lg:text-lg text-gray-700 mb-4 lg:mb-6">
                Ubicada en una de las zonas más exclusivas, esta propiedad ofrece:
              </p>
              <ul className="space-y-3 lg:space-y-4">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-blue-600 text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base">Privacidad única:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> Sin construcciones alrededor, con vistas libres</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-blue-600 text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base">Espacio común:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> Los lotes dan a un área que garantiza intimidad</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-blue-600 text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base">Estacionamiento:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> 6 cocheras cubiertas + espacio para 8 vehículos más</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-blue-600 text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base">Entorno natural:</strong>
                    <span className="text-gray-700 text-sm lg:text-base"> Jardín amplio con riego automático</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-96 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800"
                alt="Mapa de ubicación"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Mobile First */}
      <section id="contacto" className="py-12 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  placeholder="Juan"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                placeholder="Me gustaría obtener más información sobre esta propiedad..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-base lg:text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg active:scale-95"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Asesoría'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer - Mobile First */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-4">
                <Image
                  src="/alinavbar2.png"
                  alt="Logo"
                  width={180}
                  height={60}
                  className="h-12 lg:h-16 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm lg:text-base">
                Especialistas en propiedades exclusivas de lujo
              </p>
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-400 text-sm lg:text-base">
                <p>Tel: +34 900 000 000</p>
                <p>Email: info@inmobiliariapremium.com</p>
                <p>Dir: Calle Principal 123, Madrid</p>
              </div>
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Síguenos</h3>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm lg:text-base">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm lg:text-base">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm lg:text-base">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm lg:text-base">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 lg:pt-8 text-center text-gray-400 text-sm lg:text-base">
            <p>&copy; 2026 Inmobiliaria Premium. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
