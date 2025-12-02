const HeroSection = () => (
  <section id="hero" className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute top-0 right-10 h-96 w-96 rounded-full bg-violet-600/25 blur-[110px]" />
      <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 h-96 w-[580px] bg-[#1d3460] opacity-60 blur-[140px]" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.55rem] text-white/60">
            <span className="w-2 h-2 rounded-full bg-[#8cfff5] shadow-[0_0_12px_rgba(140,255,245,0.75)]" />
            AriscanAI 2025
          </span>
          <h1 className="mt-5 text-3xl md:text-5xl xl:text-6xl font-semibold leading-tight text-transparent bg-clip-text animated-gradient-text">
            Климаттық деректерді AI арқылы талдап, суды үнемдеу стратегиясын қалыптастырамыз
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
            AriscanAI — құрғақшылық тәуекелдерін, су тапшылығын және экожүйе динамикасын жылдам сараптайтын цифрлық
            ассистент. Біздің модель далалық есептерден бастап мемлекеттік стратегияларға дейінгі деректерді біріктіріп,
            нақты әрі түсінікті шешімдер ұсынады.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#chat"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#33d1ff] via-[#4f46e5] to-[#7c3aed] text-white font-semibold text-sm md:text-base shadow-[0_20px_40px_-20px_rgba(79,70,229,0.9)] hover:opacity-90 transition"
            >
              Чатты бастау
            </a>
            <div className="px-5 py-3 rounded-full neon-pill text-xs md:text-sm uppercase tracking-[0.35em] text-white/85">
              24/7 • Multilingual
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-xl">
            <div className="neon-card rounded-3xl p-5">
              <p className="text-sm text-white/70 uppercase tracking-[0.35em]">Ауыл шаруашылығы</p>
              <p className="mt-2 text-lg font-semibold text-white">AI негізіндегі суару кестесі және топырақ диагностикасы</p>
            </div>
            <div className="neon-card rounded-3xl p-5">
              <p className="text-sm text-white/70 uppercase tracking-[0.35em]">Қалалық жоспарлау</p>
              <p className="mt-2 text-lg font-semibold text-white">Су инфрақұрылымын цифрлық модельдеу және мониторинг</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#33d1ff]/30 via-[#4f46e5]/30 to-transparent blur-3xl" />
            <div className="relative neon-card rounded-[32px] p-6 sm:p-8 text-white shadow-[0_30px_80px_-40px_rgba(51,209,255,0.85)]">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.35em] text-white/60">Live metrics</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70">v4.2</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-transparent bg-clip-text animated-gradient-text">
                Drought Impact Radar
              </h2>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                12 өңірдегі 18 дереккөз үздіксіз жаңартылып, су қоймалары, булану индексі және жауын-шашын болжамы бойынша
                деректерді біріктіреді.
              </p>
              <div className="mt-6 space-y-4">
                {[{
                  label: 'Қойма деңгейі', value: '78%', status: 'Тұрақты'
                }, {
                  label: 'Булану индексі', value: '1.3', status: 'Орташа'
                }, {
                  label: 'Су үнемдеу жоспары', value: 'Жаңартылды', status: '24 сағ ішінде'
                }].map((item) => (
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

export default HeroSection;
