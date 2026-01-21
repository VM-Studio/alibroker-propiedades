const features = [
  { title: "510 m²", desc: "Superficie cubierta" },
  { title: "1600 m²", desc: "Terreno (2 lotes)" },
  { title: "6 Cocheras", desc: "Cubiertas" },
];

export default function QuickStats() {
  return (
    <section className="py-12 lg:py-16 bg-[#0d306c]/8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl lg:text-xl font-bold text-gray-900 mb-2 lg:mb-1">
                {feature.title}
              </div>
              <div className="text-sm lg:text-xs text-gray-600">
                {feature.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
