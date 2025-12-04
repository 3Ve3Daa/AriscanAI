import resultsShowcase from '../assets/results-showcase.jpg';
import { useTranslations } from '../hooks/useTranslations.js';

const SuccessShowcase = () => {
  const t = useTranslations();

  return (
    <section id="success" className="relative py-24 px-4 md:px-12">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent" />
        <div className="absolute -top-32 left-16 h-72 w-72 rounded-full bg-[#33d1ff]/25 blur-[160px]" />
        <div className="absolute bottom-[-140px] right-24 h-80 w-80 rounded-full bg-[#6366f1]/22 blur-[170px]" />
      </div>
      <div className="relative max-w-6xl mx-auto grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-[0.4em] text-white/65">
            <span className="h-2 w-2 rounded-full bg-[#8cfff5] shadow-[0_0_18px_rgba(140,255,245,0.9)]" />
            {t.success.badge}
          </span>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-[40px] font-semibold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#8cfff5]">
              {t.success.title}
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl">
              {t.success.body}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.success.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/12 bg-gradient-to-br from-white/15 via-white/5 to-transparent p-6 shadow-[0_25px_70px_-45px_rgba(51,209,255,0.8)]"
              >
                <p className="text-lg font-semibold text-white">{item.label}</p>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/10 backdrop-blur-lg p-6 md:p-7 space-y-5 shadow-[0_30px_80px_-50px_rgba(15,68,140,0.6)]">
            <h3 className="text-sm uppercase tracking-[0.4em] text-white/60">{t.success.insightsTitle}</h3>
            <ul className="space-y-4 text-sm md:text-base text-white/75">
              {t.success.insights.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#8cfff5] shadow-[0_0_10px_rgba(140,255,245,0.9)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-[#33d1ff]/30 via-[#4f46e5]/20 to-transparent blur-[140px]" />
          <div className="relative overflow-hidden rounded-[40px] border border-white/12 bg-white/5 shadow-[0_50px_120px_-55px_rgba(51,209,255,0.8)]">
            <img src={resultsShowcase} alt={t.success.galleryAlt} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessShowcase;
