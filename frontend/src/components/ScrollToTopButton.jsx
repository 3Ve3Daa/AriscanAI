import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolledRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(window.scrollY > 280 || scrolledRatio > 0.25);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed right-5 bottom-6 md:right-8 md:bottom-8 z-40 group"
      aria-label="Жоғары оралу"
    >
      <span className="relative inline-flex items-center justify-center p-4 rounded-full bg-white/15 border border-white/20 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-6 w-6 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V6m0 0-5 5m5-5 5 5" />
        </svg>
      </span>
      <span className="mt-2 block text-center text-[10px] uppercase tracking-[0.4em] text-white/60">
        ЖОҒАРЫ
      </span>
    </button>
  );
};

export default ScrollToTopButton;
