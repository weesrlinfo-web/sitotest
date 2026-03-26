import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Vantaggi', id: 'why-install' },
    { label: 'Casi d\'uso', id: 'use-cases' },
    { label: 'Come funziona', id: 'how-it-works' },
    { label: 'Prodotti', id: 'products' },
    { label: 'Contatti', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="PlugHub"
                  className="h-8 w-auto transition-transform group-hover:scale-105"
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-brand-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm text-brand-gray hover:text-brand-white transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-cyan group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(46,233,255,0.8)]" />
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="group flex items-center gap-2 px-6 py-3 bg-brand-cyan text-brand-black font-semibold rounded-full hover:shadow-[0_0_25px_rgba(46,233,255,0.5)] transition-all duration-300 overflow-hidden relative"
              >
                <Zap className="w-4 h-4" />
                <span className="relative z-10">Richiedi installazione</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-brand-white hover:text-brand-cyan transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Floating particles in menu */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-brand-cyan/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <nav className="relative flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl font-sora font-semibold text-brand-white hover:text-brand-cyan transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-2 px-8 py-4 bg-brand-cyan text-brand-black font-semibold rounded-full mt-6 hover:shadow-[0_0_30px_rgba(46,233,255,0.5)] transition-all"
          >
            <Zap className="w-5 h-5" />
            Richiedi installazione
            <ArrowRight className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
