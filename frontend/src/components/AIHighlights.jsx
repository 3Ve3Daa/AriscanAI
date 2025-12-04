import { useTranslations } from '../hooks/useTranslations.js';

const AIHighlights = () => {
  const t = useTranslations();

  return (
    <section id="ai-highlights" className="relative py-20">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-white/7 via-transparent to-transparent" />
        <div className="absolute top-10 left-16 h-64 w-64 rounded-full bg-[#33d1ff]/18 blur-[130px]" />
        <div className="absolute bottom-[-110px] right-20 h-80 w-80 rounded-full bg-[#7c3aed]/20 blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.45em] text-white/60">
              <span className="w-2 h-2 rounded-full bg-[#8cfff5]" />
              {t.highlights.badge}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-transparent bg-clip-text animated-gradient-text">
              {t.highlights.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm md:text-base text-white/70 leading-relaxed">
            {t.highlights.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {t.highlights.cards.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] p-6 shadow-[0_26px_70px_-48px_rgba(24,75,140,0.6)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#33d1ff]/30 via-transparent to-[#7c3aed]/25 blur-xl" />
              </div>
              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#33d1ff] to-[#4f46e5] text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white">{item.title}</h3>
              </div>
              <p className="relative mt-4 text-sm md:text-base text-white/75 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIHighlights;
