import { useState, useEffect, useMemo } from 'react';
import LogoIcon from './LogoIcon.jsx';
import { useTranslations } from '../hooks/useTranslations.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const { lang, toggle } = useLanguage();

  const navLinks = useMemo(() => ([
    { href: '#hero', label: t.nav.hero },
    { href: '#success', label: t.nav.success },
    { href: '#survey', label: t.nav.survey },
    { href: '#ai-highlights', label: t.nav.highlights },
    { href: '#chat', label: t.nav.chat },
    { href: '#features', label: t.nav.features },
  ]), [t.nav]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleNavigate = () => setIsMenuOpen(false);

  return (
    <header className={`relative z-40 transition-all duration-300 ${isMenuOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-transparent to-white/10 opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 blur-3xl opacity-35" style={{ background: 'radial-gradient(circle at 16% 38%, rgba(140,255,245,0.26), transparent 56%)' }} aria-hidden="true" />
      <div className="relative px-4 sm:px-6 md:px-10 py-5 lg:py-7 flex items-center justify-between gap-4 border-b border-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden inline-flex flex-col justify-center gap-1.5 p-3 rounded-2xl neon-pill text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ar-accent"
            aria-label="Навигация"
          >
            <span className={`h-0.5 w-5 rounded-full bg-white transition-transform ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 w-4 rounded-full bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-5 rounded-full bg-white transition-transform ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
          <div className="p-3 rounded-2xl neon-card shadow-chat hidden xs:flex items-center justify-center">
            <LogoIcon size={40} />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold tracking-wide text-transparent bg-clip-text animated-gradient-text drop-shadow-[0_0_25px_rgba(140,255,245,0.4)]">
              AriscanAI
            </p>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/60">{t.header.brandTagline}</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-white/70 hover:text-white tracking-wide transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-gradient-to-r from-[#8cfff5] to-[#33d1ff] after:origin-left hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="px-4 py-2 rounded-full border border-white/15 bg-white/10 text-white/85 text-xs tracking-[0.3em] uppercase hover:bg-white/15 transition"
          >
            {lang === 'kk' ? 'ҚАЗ → РУС' : 'РУС → ҚАЗ'}
          </button>
          <span className="px-4 py-2 rounded-full neon-pill text-white/80 text-xs tracking-wide uppercase">
            {t.header.reliableBadge}
          </span>
          <a
            href="#chat"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#33d1ff] via-[#4f46e5] to-[#7c3aed] text-white font-semibold text-sm shadow-[0_12px_30px_-12px_rgba(79,70,229,0.9)] hover:opacity-90 transition"
          >
            {t.header.openChatCta}
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute left-4 right-4 top-full mt-3 rounded-3xl border border-white/10 bg-[#091530]/95 backdrop-blur-2xl shadow-[0_18px_55px_-25px_rgba(51,209,255,0.8)]">
          <nav className="flex flex-col divide-y divide-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className="px-5 py-4 text-sm font-medium text-white/85 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                toggle();
                handleNavigate();
              }}
              className="px-5 py-4 text-sm font-semibold text-[#8cfff5] hover:text-white"
            >
              {lang === 'kk' ? 'Қазақша → Рус' : 'Русский → Қаз'}
            </button>
            <a
              href="#chat"
              onClick={handleNavigate}
              className="px-5 py-4 text-sm font-semibold text-white bg-gradient-to-r from-[#33d1ff] via-[#4f46e5] to-[#7c3aed] rounded-b-3xl"
            >
              {t.header.openChatCta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
