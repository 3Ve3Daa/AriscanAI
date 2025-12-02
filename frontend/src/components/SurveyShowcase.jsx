import { useState, useEffect } from 'react';
import survey1 from '../assets/2.jpg';
import survey2 from '../assets/3.jpg';
import survey3 from '../assets/4.jpg';
import survey4 from '../assets/5.jpg';
import survey5 from '../assets/6.jpg';
import survey6 from '../assets/7.jpg';
import survey7 from '../assets/8.jpg';
import qrSurvey from '../assets/1.jpg';

const surveyItems = [
  { src: survey1, alt: 'Жас айырмашылығы бойынша жауаптар' },
  { src: survey2, alt: 'Сыныптар үлесі' },
  { src: survey3, alt: 'Құрғашылық туралы білім деңгейі' },
  { src: survey4, alt: 'Құрғашылық себептері' },
  { src: survey5, alt: 'Суды үнемдеу әдістері' },
  { src: survey6, alt: 'Құрғашылық туралы білім беру қажеттілігі' },
  { src: survey7, alt: 'Суды үнемдеу шараларының өтуі' },
];

const SurveyShowcase = () => {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  const closeModal = () => setActiveImage(null);

  return (
    <>
      <section id="survey" className="relative py-16 md:py-20 px-4 md:px-12">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1f42]/70 via-transparent to-transparent" />
          <div className="absolute top-10 left-16 h-72 w-72 rounded-full bg-[#33d1ff]/25 blur-[130px]" />
          <div className="absolute bottom-[-100px] right-20 h-72 w-72 rounded-full bg-[#4f46e5]/25 blur-[150px]" />
        </div>
        <div className="relative max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/65">
              <span className="w-2 h-2 rounded-full bg-[#8cfff5] shadow-[0_0_12px_rgba(140,255,245,0.75)]" />
              Ғылыми сауалнама
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-transparent bg-clip-text animated-gradient-text">
              Оқушылардан алынған сауалнама нәтижелері — AriscanAI талдауымен
            </h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed">
              Біздің AI ассистенті мектептегі ғылыми жоба барысында сауалнаманы өңдеп, суды үнемдеу тақырыбындағы білім
              деңгейін талдауға көмектесті. Ассистент диаграммалардағы үрдістерді түсіндіріп, сынып жетекшілеріне нақты
              ұсынымдар дайындады.
            </p>
            <ul className="space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#8cfff5]">▹</span>
                62,5% қатысушылар құрғақшылық себептерін табиғи климаттық факторлармен байланыстырады.
              </li>
              <li className="flex gap-3">
                <span className="text-[#8cfff5]">▹</span>
                65,6% оқушы мектеп бағдарламасына су тапшылығы бойынша қосымша сабақтар енгізуді қолдайды.
              </li>
              <li className="flex gap-3">
                <span className="text-[#8cfff5]">▹</span>
                Ассистент сауалнама нәтижелерін визуализациялап, су үнемдеу мәдениетін қалыптастыруға арналған ұсыныстар әзірледі.
              </li>
            </ul>
            <div className="mt-6 neon-card rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="sm:w-1/2">
                  <h3 className="text-xl font-semibold text-white mb-2">Өзіңіз де қатысқыңыз келе ме?</h3>
                  <p className="text-white/70 text-sm md:text-base">
                    QR-кодты сканерлеп, сауалнамаға қосылыңыз. Сіздің жауаптарыңыз AriscanAI ассистентінің ұсыныстарын
                    жетілдіруге көмектеседі.
                  </p>
                </div>
                <div className="sm:w-1/2 flex justify-center">
                  <div className="relative p-4 rounded-2xl neon-card">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#33d1ff]/30 to-transparent blur-2xl" aria-hidden="true" />
                    <img src={qrSurvey} alt="Сауалнамаға қосылу QR-коды" className="relative w-36 h-36 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {surveyItems.map((item) => (
                <button
                  type="button"
                  key={item.alt}
                  onClick={() => setActiveImage(item)}
                  className="group relative block overflow-hidden rounded-2xl neon-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33d1ff]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[10px] uppercase tracking-[0.4ем] text-white/80">
                    Ашу
                  </span>
                </button>
              ))}
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              Диаграммалар AriscanAI көмегімен дайындалған цифрлық сауалнамадан алынды. Әрбір нәтиже су үнемдеу туралы
              білім деңгейі мен оқушылардың пікіріндегі трендтерді айқын көрсетеді.
            </p>
          </div>
        </div>
      </section>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute -top-12 right-0 text-[11px] uppercase tracking-[0.4em] text-white/70 hover:text-white"
            >
              Жабу
            </button>
            <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <img src={activeImage.src} alt={activeImage.alt} className="w-full h-auto" />
            </div>
            <p className="mt-4 text-center text-white/70 text-sm leading-relaxed">{activeImage.alt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SurveyShowcase;
