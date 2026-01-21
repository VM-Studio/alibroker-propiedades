const locationFeatures = [
  {
    title: "Privacidad única:",
    desc: "Sin construcciones alrededor, con vistas libres"
  },
  {
    title: "Espacio común:",
    desc: "Los lotes dan a un área que garantiza intimidad"
  },
  {
    title: "Estacionamiento:",
    desc: "6 cocheras cubiertas + espacio para 8 vehículos más"
  },
  {
    title: "Entorno natural:",
    desc: "Jardín amplio con riego automático"
  }
];

export default function Location() {
  return (
    <section className="py-12 lg:py-20 bg-[#0d306c]/8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 font-playfair">
              Altos de Campo Grande
            </h2>
            <div className="mb-8 lg:mb-10"></div>
            <ul className="space-y-3 lg:space-y-4">
              {locationFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-[#0d306c] text-xl font-bold">•</span>
                  <div className="text-left">
                    <strong className="text-gray-900 text-sm lg:text-base font-playfair">
                      {feature.title}
                    </strong>
                    <span className="text-gray-700 text-sm lg:text-base">
                      {" "}{feature.desc}
                    </span>
                  </div>
                </li>
              ))}
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
            />
          </div>
        </div>
      </div>
    </section>
  );
}
