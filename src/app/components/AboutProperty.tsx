export default function AboutProperty() {
  return (
    <section id="detalles" className="py-12 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Video container */}
          <div className="order-1 md:order-2 flex flex-col md:flex-row gap-6 items-center md:items-start md:justify-self-end">
            <div className="relative h-56 md:h-[500px] lg:h-[550px] w-full md:w-80 lg:w-96 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl bg-gray-900 flex-shrink-0">
              <video
                src="https://res.cloudinary.com/dlxuigjrd/video/upload/v1768853781/alibroker_p3wr2g.mp4"
                className="w-full h-full object-cover"
                controls
                muted
                loop
                playsInline
                preload="metadata"
                poster="/casa1.png"
              />
            </div>
          </div>

          {/* Text content */}
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
  );
}
