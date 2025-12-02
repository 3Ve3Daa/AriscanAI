const features = [
  {
    title: 'Жедел талдау',
    description:
      'Қазіргі метеодеректер мен тарихи трендтерді салыстыра отырып, құрғақшылық қаупін алдын ала болжайды.',
    icon: '📊',
  },
  {
    title: 'Суды үнемдеу стратегиялары',
    description:
      'Тамшылатып суару, жаңбыр суын жинау және цифрлық мониторинг сияқты нақты тәсілдер ұсынады.',
    icon: '💧',
  },
  {
    title: 'Агрономдарға көмек',
    description:
      'Топырақ типі мен дақыл ерекшелігі бойынша бейімделген ұсыныстар жасайды.',
    icon: '🌾',
  },
  {
    title: 'Көптілді ассистент',
    description:
      'Қазақ, орыс және ағылшын тілдерінде ғылыми дәлелденген кеңес береді.',
    icon: '🌍',
  },
];

const FeatureGrid = () => (
  <section id="features" className="relative py-16 md:py-20 px-4 md:px-12">
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1d3f]/60 via-transparent to-transparent" />
      <div className="absolute top-8 right-24 h-64 w-64 rounded-full bg-[#33d1ff]/20 blur-[120px]" />
      <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-[#4f46e5]/25 blur-[130px]" />
    </div>
    <div className="relative max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-white/60">
            <span className="w-2 h-2 rounded-full bg-[#8cfff5] animate-pulse" />
            Мүмкіндіктер
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-transparent bg-clip-text animated-gradient-text">
            AI ассистентінің негізгі артықшылықтары
          </h2>
        </div>
        <div className="px-5 py-2 rounded-full neon-pill text-xs md:text-sm text-white/80 uppercase tracking-[0.3em]">
          Деректер • Аналитика • Экология
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group neon-card rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#33d1ff] to-[#4f46e5] text-white text-2xl shadow-[0_0_25px_rgba(51,209,255,0.55)]">
              {feature.icon}
            </div>
            <h3 className="mt-5 text-xl md:text-2xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">{feature.description}</p>
            <div className="mt-6 h-[2px] w-14 neon-divider group-hover:scale-x-125 origin-left transition-transform" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
