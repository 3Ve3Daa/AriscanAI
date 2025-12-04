import { useTranslations } from '../hooks/useTranslations.js';

const HeroSection = () => {
  const t = useTranslations();

  return (
    <section id="hero" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-24 left-[-10%] h-[520px] w-[520px] rounded-full bg-white/55 blur-[190px]" />
        <div className="absolute top-1/3 right-[-8%] h-[560px] w-[560px] rounded-full bg-[#bae6fd]/40 blur-[210px]" />
        <div className="absolute bottom-[-220px] left-1/2 -translate-x-1/2 h-[540px] w-[540px] rounded-full bg-[#38bdf8]/35 blur-[220px]" />
      </div>
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.55rem] text-white/60">
              <span className="w-2 h-2 rounded-full bg-[#8cfff5] shadow-[0_0_12px_rgba(140,255,245,0.75)]" />
              {t.hero.badge}
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl xl:text-6xl font-semibold leading-tight text-transparent bg-clip-text animated-gradient-text">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#chat"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-white via-[#38bdf8] to-[#2563eb] text-slate-900 font-semibold text-sm md:text-base shadow-[0_24px_48px_-18px_rgba(54,165,255,0.85)] hover:opacity-95 transition"
              >
                {t.hero.primaryCta}
              </a>
              <div className="px-5 py-3 rounded-full neon-pill text-xs md:text-sm uppercase tracking-[0.35em] text-white/85">
                {t.hero.secondaryBadge}
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-xl">
              {t.hero.cards.map((card) => (
                <div key={card.heading} className="neon-card rounded-3xl p-5">
                  <p className="text-sm text-white/70 uppercase tracking-[0.35em]">{card.heading}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#33d1ff]/30 via-[#4f46e5]/30 to-transparent blur-3xl" />
              <div className="relative neon-card rounded-[32px] p-6 sm:p-8 text-white shadow-[0_30px_80px_-40px_rgba(51,209,255,0.85)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.35em] text-white/60">{t.hero.dashboard.title}</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70">v4.2</span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-transparent bg-clip-text animated-gradient-text">
                  {t.hero.dashboard.title}
                </h2>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {t.hero.dashboard.intro}
                </p>
                <div className="mt-6 space-y-4">
                  {t.hero.dashboard.rows.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">{item.label}</p>
                        <p className="text-lg font-semibold text-white">{item.value}</p>
                      </div>
                      <span className="text-xs text-white/65">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
