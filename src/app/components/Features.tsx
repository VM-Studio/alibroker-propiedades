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

const plantaBaja = [
  "Living de grandes dimensiones con ventanales piso a techo",
  "Comedor integrado con salida a amplia galería",
  "Cocina equipada de alta calidad con amoblamiento premium",
  "Quincho integrable con paños de vidrio plegables",
  "Piscina 12x5 con solárium de piso atérmico",
  "Sauna privada y gimnasio con vista al jardín",
  "Fogonero con parrilla al aire libre"
];

const plantaAlta = [
  "Family room con pantalla y vistas al jardín",
  "Escritorio para 2+ personas con doble altura",
  "Biblioteca imponente integrando los espacios",
  "3 dormitorios con vestidores y espacio para escritorios",
  "Baño compartimentado con ducha, bañera y doble bacha",
  "Master Suite independiente con vestidor amplio",
  "Suite con pantalla 360° y balcón terraza privado",
  "Ático en tercera planta para múltiples usos"
];

// Icono de check memoizado
function CheckIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e74144]/10 text-[#e74144] flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

export default function Features() {
  return (
    <section id="caracteristicas" className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#e74144] uppercase">
              Características
            </p>
            <h2 className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl font-playfair">
              Detalles de la propiedad
            </h2>
          </div>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {amenities.map((amenity, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm lg:text-base text-neutral-800 shadow-sm hover:shadow-md transition"
            >
              <CheckIcon />
              {amenity}
            </span>
          ))}
        </div>
        
        {/* Detailed sections */}
        <div className="mt-8 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-[#0d306c]/8 p-6 lg:p-8 rounded-xl shadow-md">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center md:text-left font-playfair">
              Planta Baja
            </h3>
            <ul className="space-y-2 lg:space-y-3 text-gray-700 text-sm lg:text-base">
              {plantaBaja.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#0d306c]/8 p-6 lg:p-8 rounded-xl shadow-md">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center md:text-left font-playfair">
              Planta Alta
            </h3>
            <ul className="space-y-2 lg:space-y-3 text-gray-700 text-sm lg:text-base">
              {plantaAlta.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0d306c] font-bold mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
