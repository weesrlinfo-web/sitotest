import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Battery, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Floating Powerbank Element
const FloatingPowerbank = ({ 
  src, 
  size, 
  initialX, 
  initialY, 
  duration, 
  delay 
}: { 
  src: string; 
  size: number; 
  initialX: string; 
  initialY: string; 
  duration: number; 
  delay: number;
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    
    gsap.to(elRef.current, {
      y: `-=${30 + Math.random() * 40}`,
      x: `+=${-20 + Math.random() * 40}`,
      rotation: -5 + Math.random() * 10,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay,
    });
  }, [duration, delay]);

  return (
    <div
      ref={elRef}
      className="floating-powerbank absolute pointer-events-none"
      style={{
        left: initialX,
        top: initialY,
        width: size,
        height: size,
        filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
      }}
    >
      <img 
        src={src} 
        alt="" 
        className="w-full h-full object-contain opacity-30"
        style={{
          filter: 'brightness(0.8) contrast(1.1)',
        }}
      />
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Entrance animation after loading
  useEffect(() => {
    if (isLoading) return;
    
    const section = sectionRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;

    if (!section || !content || !logo || !glow) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(logo, { opacity: 0, scale: 0.8, y: 30 });
      gsap.set('.badge', { opacity: 0, y: 20 });
      gsap.set('.headline', { opacity: 0, y: 30 });
      gsap.set('.subheadline', { opacity: 0, y: 20 });
      gsap.set('.cta-group', { opacity: 0, y: 20 });
      gsap.set('.stats-row', { opacity: 0, y: 20 });
      gsap.set(glow, { opacity: 0, scale: 0.5 });

      // Entrance timeline
      const entranceTl = gsap.timeline({ delay: 0.1 });
      
      entranceTl
        // Glow fades in and scales
        .to(glow, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' })
        // Logo appears
        .to(logo, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)
        // Badge slides in
        .to('.badge', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5)
        // Headline reveals
        .to('.headline', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.6)
        // Subheadline
        .to('.subheadline', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.75)
        // CTAs
        .to('.cta-group', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.9)
        // Stats
        .to('.stats-row', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1);

      // Pulsing glow
      gsap.to(glow, {
        scale: 1.2,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
        },
      });

      // SETTLE phase (0% - 40%): content stays visible
      // EXIT phase (40% - 100%): smooth exit
      scrollTl
        // Phase 1: Subtle parallax (0-40%)
        .fromTo(logo, 
          { y: 0 }, 
          { y: -30, ease: 'none' }, 
          0
        )
        .fromTo(content, 
          { y: 0 }, 
          { y: -20, ease: 'none' }, 
          0
        )
        // Phase 2: Exit starts at 40%
        .fromTo(logo, 
          { opacity: 1, scale: 1 }, 
          { opacity: 0, scale: 0.8, ease: 'power2.in' }, 
          0.4
        )
        .fromTo('.headline', 
          { opacity: 1, y: 0 }, 
          { opacity: 0, y: -60, ease: 'power2.in' }, 
          0.42
        )
        .fromTo('.subheadline', 
          { opacity: 1, y: 0 }, 
          { opacity: 0, y: -40, ease: 'power2.in' }, 
          0.45
        )
        .fromTo('.badge', 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.4
        )
        .fromTo('.cta-group', 
          { opacity: 1, y: 0 }, 
          { opacity: 0, y: -30, ease: 'power2.in' }, 
          0.48
        )
        .fromTo('.stats-row', 
          { opacity: 1, y: 0 }, 
          { opacity: 0, y: -20, ease: 'power2.in' }, 
          0.5
        )
        // Glow expands and fades
        .fromTo(glow, 
          { opacity: 1, scale: 1 }, 
          { opacity: 0, scale: 1.8, ease: 'power1.in' }, 
          0.35
        )
        // Floating elements drift away
        .fromTo('.floating-powerbank', 
          { opacity: 0.3 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.5
        );
    }, section);

    return () => ctx.revert();
  }, [isLoading]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const floatingPowerbanks = [
    { src: '/images/powerbank frontale.png', size: 100, initialX: '5%', initialY: '20%', duration: 5, delay: 0 },
    { src: '/images/powerbank lato.png', size: 80, initialX: '88%', initialY: '25%', duration: 6, delay: 0.5 },
    { src: '/images/powerbank retro.png', size: 70, initialX: '8%', initialY: '65%', duration: 7, delay: 1 },
    { src: '/images/4.png', size: 60, initialX: '90%', initialY: '60%', duration: 5.5, delay: 0.3 },
    { src: '/images/8.png', size: 90, initialX: '80%', initialY: '75%', duration: 6.5, delay: 0.8 },
    { src: '/images/12.png', size: 75, initialX: '12%', initialY: '80%', duration: 5, delay: 1.2 },
  ];

  return (
    <>
      {/* Simple loading screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-brand-black flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt="PlugHub"
            className="w-24 h-24 object-contain animate-pulse"
          />
        </div>
      )}

      <section
        ref={sectionRef}
        className="relative min-h-screen bg-brand-black flex items-center justify-center overflow-hidden"
      >
        {/* Floating powerbanks in background */}
        {floatingPowerbanks.map((pb, i) => (
          <FloatingPowerbank key={i} {...pb} />
        ))}

        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-60 transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse 120% 100% at ${50 + mousePos.x * 10}% ${45 + mousePos.y * 10}%, rgba(46, 233, 255, 0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Central glow orb */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
          style={{
            background: 'radial-gradient(circle, rgba(46, 233, 255, 0.2) 0%, rgba(65, 163, 207, 0.1) 30%, transparent 60%)',
            filter: 'blur(50px)',
            transform: `translate(-50%, -50%) translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Energy rings */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-brand-cyan/10 rounded-full pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) rotate(${mousePos.x * 5}deg)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-brand-cyan/5 rounded-full pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) rotate(${-mousePos.x * 8}deg)`,
            transition: 'transform 0.7s ease-out',
          }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(46, 233, 255, 0.8) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(46, 233, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />

        <div className="relative w-full px-6 lg:px-12 pt-20 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              
              {/* LOGO */}
              <div 
                ref={logoRef}
                className="relative mb-6"
                style={{
                  perspective: '1000px',
                  transform: `rotateY(${mousePos.x * 3}deg) rotateX(${mousePos.y * -3}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {/* Glow behind logo */}
                <div 
                  className="absolute inset-0 -m-8 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(46, 233, 255, 0.25) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                <img
                  src="/images/logo.png"
                  alt="PlugHub"
                  className="relative z-10 w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-2xl"
                />

                {/* Status indicator */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-brand-white font-medium">Disponibile ora</span>
                </div>
              </div>

              {/* Content */}
              <div ref={contentRef} className="max-w-xl mt-4">
                {/* Badge */}
                <div className="badge inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl border border-brand-cyan/30 rounded-full mb-5">
                  <Zap className="w-3.5 h-3.5 text-brand-cyan" />
                  <span className="text-xs font-medium text-brand-cyan tracking-wide font-mono">INSTALLAZIONE GRATUITA</span>
                </div>

                {/* Headline */}
                <h1 className="headline text-3xl sm:text-4xl lg:text-5xl font-sora font-bold text-brand-white mb-3 leading-tight">
                  I tuoi clienti
                  <span className="block mt-1 text-gradient">sempre carichi</span>
                </h1>

                {/* Subheadline */}
                <p className="subheadline text-base sm:text-lg text-brand-gray mb-6 leading-relaxed">
                  Una stazione PlugHub nel tuo locale. Zero costi, zero gestione, massima soddisfazione.
                </p>

                {/* CTAs */}
                <div className="cta-group flex flex-col sm:flex-row gap-3 mb-8 justify-center">
                  <button
                    onClick={scrollToContact}
                    className="group relative px-6 py-3 bg-brand-cyan text-brand-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(46,233,255,0.4)] hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Richiedi installazione
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                  <button
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 border border-white/20 text-brand-white font-medium rounded-full hover:border-brand-cyan/50 hover:text-brand-cyan transition-all duration-300 backdrop-blur-sm bg-white/5"
                  >
                    Scopri come funziona
                  </button>
                </div>

                {/* Stats */}
                <div className="stats-row flex gap-4 justify-center">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                    <div className="w-8 h-8 bg-brand-cyan/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-brand-white font-mono">0€</div>
                      <div className="text-[10px] text-brand-gray">Installazione</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                    <div className="w-8 h-8 bg-brand-cyan/10 rounded-lg flex items-center justify-center">
                      <Battery className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-brand-white font-mono">6000<span className="text-xs">mAh</span></div>
                      <div className="text-[10px] text-brand-gray">Capacità</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-brand-cyan/60" />
        </div>
      </section>
    </>
  );
};

export default Hero;
