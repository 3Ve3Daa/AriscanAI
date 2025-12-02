// src/App.jsx
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ChatWindow from '../components/ChatWindow';
import SuccessShowcase from '../components/SuccessShowcase';
import SurveyShowcase from '../components/SurveyShowcase';
import FeatureGrid from '../components/FeatureGrid';
import ScrollToTopButton from '../components/ScrollToTopButton';

const App = () => (
  <div className="bg-app-gradient text-white min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 overflow-y-auto custom-scroll">
      <HeroSection />
      <SuccessShowcase />
      <SurveyShowcase />
      <section id="chat" className="relative py-16 md:py-20 px-4 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-50" />
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">AriscanAI чат орталығы</h2>
              <p className="mt-3 text-white/75 max-w-2xl">
                Сұрақтарыңызды енгізіңіз — ассистент су үнемдеу, құрғақшылық және экожүйе тұрақтылығы туралы
                нақты, түсінікті жауап береді. Қажет болса, дайын офлайн анықтама да ұсынады.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <ChatWindow />
          </div>
        </div>
      </section>
      <FeatureGrid />
    </main>
    <footer className="py-6 text-center text-xs text-white/40 tracking-wide select-none">
      AriscanAI 2025 — Суды үнемдеу AI жүйесі
    </footer>
    <ScrollToTopButton />
  </div>
);

export default App;