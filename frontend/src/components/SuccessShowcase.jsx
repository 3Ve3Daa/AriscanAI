import resultsShowcase from '../assets/results-showcase.jpg';

const SuccessShowcase = () => (
  <section id="success" className="relative py-16 md:py-20 px-4 md:px-12">
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a162b]/70 via-transparent to-transparent" />
      <div className="absolute -top-24 right-12 h-72 w-72 rounded-full bg-[#4da9ff]/18 blur-[140px]" />
      <div className="absolute bottom-[-120px] left-20 h-72 w-72 rounded-full bg-[#7f8cff]/18 blur-[150px]" />
    </div>
    <div className="relative max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.08fr_0.92fr] items-center">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.42em] text-white/60">
          <span className="w-2 h-2 rounded-full bg-[#9fd7ff]" />
          Зерттеу нәтижелері
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug text-white">
          AriscanAI далалық тәжірибелерге негізделген шешімдерді ұсынады
        </h2>
        <p className="text-white/75 text-base md:text-lg leading-relaxed">
          Ассистенттің аналитикасы және ұсыныстары арқасында біз су тапшылығына ұшыраған алқаптарды сандық мониторингпен
          қамтып, топырақты қалпына келтіру экспериментін жүзеге асырдық. Нәтижесінде суару нормалары оңтайланып, ылғалды
          сақтау көрсеткіші артты.
        </p>
        <ul className="space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
          {[
            '1 га сынақ алаңында элементарлы күкірт мөлшері мен ылғал теңгерімі өлшенді.',
            'Жергілікті фермерлермен бірге тамшылатып суару кестесі жасалып, өнімділік болжамдалды.',
            'Спутниктік суреттер мен далалық фотоларды біріктіріп, топырақ құрылымының өзгерісі талданды.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-[#8cfff5]">▹</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-5 shadow-[0_18px_45px_-35px_rgba(30,60,110,0.7)]">
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">12 аймақ</p>
            <p className="mt-2 text-lg font-semibold text-white">Далалық мониторингке қосылды</p>
          </div>
          <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-5 shadow-[0_18px_45px_-35px_rgba(30,60,110,0.7)]">
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">+27%</p>
            <p className="mt-2 text-lg font-semibold text-white">Су үнемдеу көрсеткіші</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#33d1ff]/35 via-transparent to-[#4f46e5]/25 blur-3xl" />
        <div className="relative overflow-hidden rounded-[32px] neon-border border border-white/10 shadow-[0_40px_90px_-50px_rgba(51,209,255,0.9)]">
          <img src={resultsShowcase} alt="Зерттеу нәтижелері" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);

export default SuccessShowcase;
