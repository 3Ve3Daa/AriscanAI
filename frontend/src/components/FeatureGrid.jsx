import { useTranslations } from '../hooks/useTranslations.js';

const FeatureGrid = () => {
  const t = useTranslations();

  return (
    <section id="features" className="relative py-24 px-4 md:px-12">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-white/6 via-transparent to-transparent" />
        <div className="absolute top-16 right-24 h-72 w-72 rounded-full bg-[#33d1ff]/20 blur-[150px]" />
        <div className="absolute bottom-[-120px] left-1/4 h-80 w-80 rounded-full bg-[#4f46e5]/22 blur-[170px]" />
      </div>
      <div className="relative max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-[0.4em] text-white/65">
              <span className="h-2 w-2 rounded-full bg-[#8cfff5] animate-pulse shadow-[0_0_18px_rgба(140,255,245,0.9)]" />
              {t.featureGrid.badge}
            </span>
            <h2 className="text-3xl md:text-[38px] font-semibold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#7dd3fc]">
              {t.featureGrid.title}
            </h2>
            <p className="text-white/75 text-base md:text-lg max-w-2xl">
              {t.featureGrid.description}
            </p>
          </div>
          <div className="self-start rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs md:text-sm uppercase tracking-[0.35em] text-white/75">
            {t.featureGrid.chips}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {t.featureGrid.features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 backdrop-blur-[26px] p-7 md:p-8 shadow-[0_30px_90px_-55px_rgба(37,99,235,0.7)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-20 -right-12 h-52 w-52 rounded-full bg-[#33d1ff]/20 blur-[120px]" />
              </div>
              <div className="relative flex items-center gap-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-[#33d1ff] to-[#4f46e5] text-2xl shadow-[0_0_25px_rgба(51,209,255,0.6)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="relative mt-4 text-sm md:text-base text-white/70 leading-relaxed">
                {feature.description}
              </p>
              <div className="relative mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="relative mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#8cfff5]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8cfff5]" />
                AI guided insight
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {t.featureGrid.footnotes.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-lg p-5 text-white/75 shadow-[0_18px_60px_-45px_rgба(15,68,140,0.5)]">
              <p className="text-sm uppercase tracking-[0.35em] text-white/55">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
