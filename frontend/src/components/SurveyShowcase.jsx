import { useState, useEffect, useMemo } from 'react';
import survey1 from '../assets/2.jpg';
import survey2 from '../assets/3.jpg';
import survey3 from '../assets/4.jpg';
import survey4 from '../assets/5.jpg';
import survey5 from '../assets/6.jpg';
import survey6 from '../assets/7.jpg';
import survey7 from '../assets/8.jpg';
import qrSurvey from '../assets/1.jpg';
import { useTranslations } from '../hooks/useTranslations.js';

const SurveyShowcase = () => {
  const [activeImage, setActiveImage] = useState(null);
  const t = useTranslations();

  const surveyItems = useMemo(
    () => [
      { src: survey1, caption: t.survey.galleryItems[0] },
      { src: survey2, caption: t.survey.galleryItems[1] },
      { src: survey3, caption: t.survey.galleryItems[2] },
      { src: survey4, caption: t.survey.galleryItems[3] },
      { src: survey5, caption: t.survey.galleryItems[4] },
      { src: survey6, caption: t.survey.galleryItems[5] },
      { src: survey7, caption: t.survey.galleryItems[6] },
    ].map((item) => ({ ...item, alt: item.caption })),
    [t.survey.galleryItems],
  );

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

  useEffect(() => {
    if (activeImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    return undefined;
  }, [activeImage]);

  const closeModal = () => setActiveImage(null);

  return (
    <>
      <section id="survey" className="relative py-24 px-4 md:px-12">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1f42]/70 via-transparent to-transparent" />
          <div className="absolute top-10 left-16 h-72 w-72 rounded-full bg-[#33d1ff]/25 blur-[130px]" />
          <div className="absolute bottom-[-100px] right-20 h-72 w-72 rounded-full bg-[#4f46e5]/25 blur-[150px]" />
        </div>
        <div className="relative max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/65">
              <span className="w-2 h-2 rounded-full bg-[#8cfff5] shadow-[0_0_12px_rgба(140,255,245,0.75)]" />
              {t.survey.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-transparent bg-clip-text animated-gradient-text">
              {t.survey.title}
            </h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed">
              {t.survey.body}
            </p>
            <ul className="space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              {t.survey.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#8cfff5]">▹</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 neon-card rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="sm:w-1/2">
                  <h3 className="text-xl font-semibold text-white mb-2">{t.survey.ctaTitle}</h3>
                  <p className="text-white/70 text-sm md:text-base">{t.survey.ctaBody}</p>
                </div>
                <div className="sm:w-1/2 flex justify-center">
                  <div className="relative p-4 rounded-2xl neon-card">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#33d1ff]/30 to-transparent blur-2xl" aria-hidden="true" />
                    <img src={qrSurvey} alt={t.survey.qrAlt} className="relative w-36 h-36 object-contain" />
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
                  <span className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-4 text-center text-[10px] uppercase tracking-[0.35em] text-white/85">
                    {item.caption}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              {t.survey.galleryNote}
            </p>
          </div>
        </div>
      </section>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-[11px] uppercase tracking-[0.35em] text-white/70 hover:text-white"
            >
              {t.survey.modalClose}
            </button>
            <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <img src={activeImage.src} alt={activeImage.alt} className="w-full h-auto" />
            </div>
            <p className="mt-4 text-center text-white/75 text-sm leading-relaxed">{activeImage.caption}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SurveyShowcase;
