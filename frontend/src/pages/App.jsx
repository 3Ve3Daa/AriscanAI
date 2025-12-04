// src/App.jsx
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ChatWindow from '../components/ChatWindow';
import SuccessShowcase from '../components/SuccessShowcase';
import SurveyShowcase from '../components/SurveyShowcase';
import AIHighlights from '../components/AIHighlights';
import FeatureGrid from '../components/FeatureGrid';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useTranslations } from '../hooks/useTranslations.js';

const App = () => {
  const t = useTranslations();

  return (
    <div className="bg-app-gradient text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative overflow-hidden custom-scroll">
        <div className="absolute inset-0 -z-20 bg-app-gradient" aria-hidden="true" />
        <div
          className="animated-gradient-layer pointer-events-none"
          aria-hidden="true"
          style={{ zIndex: -15 }}
        />
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-60 -left-48 h-[520px] w-[520px] rounded-full bg-white/14 blur-[220px]" />
          <div className="absolute top-[260px] left-1/2 -translate-x-1/2 h-[620px] w-[620px] rounded-full bg-[#60a5fa]/18 blur-[260px]" />
          <div className="absolute -bottom-64 right-[-140px] h-[560px] w-[560px] rounded-full bg-[#0ea5e9]/18 blur-[230px]" />
        </div>
        <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 space-y-20 pb-28">
          <HeroSection />
          <SuccessShowcase />
          <AIHighlights />
          <SurveyShowcase />
          <section id="chat" className="relative py-20">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <div className="absolute inset-0 rounded-[36px] border border-white/10 bg-gradient-to-br from-white/8 via-white/2 to-transparent backdrop-blur-3xl" />
              <div className="absolute -top-24 -left-28 h-72 w-72 rounded-full bg-[#33d1ff]/25 blur-[160px]" />
              <div className="absolute bottom-[-90px] right-[-40px] h-80 w-80 rounded-full bg-[#6366f1]/20 blur-[150px]" />
            </div>
            <div className="relative max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold">{t.chatSection.title}</h2>
                  <p className="mt-3 text-white/75 max-w-2xl">
                    {t.chatSection.description}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <ChatWindow />
              </div>
            </div>
          </section>
          <FeatureGrid />
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-white/40 tracking-wide select-none">
        {t.footer}
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default App;
