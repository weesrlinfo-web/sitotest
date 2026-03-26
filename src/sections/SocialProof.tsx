import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, MapPin, Users, Battery } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'I clienti lo usano costantemente. È diventato un servizio che ci distingue dalla concorrenza.',
    author: 'Marco R.',
    role: 'Proprietario, Bar Centrale',
    rating: 5,
  },
  {
    quote: 'Zero lavoro per noi, grande valore aggiunto per gli ospiti. Installazione rapidissima.',
    author: 'Laura B.',
    role: 'Direttrice, Hotel Milano',
    rating: 5,
  },
  {
    quote: 'I nostri clienti apprezzano molto. Non dobbiamo più prestare caricabatterie.',
    author: 'Giuseppe T.',
    role: 'Manager, Fitness Club',
    rating: 5,
  },
];

const stats = [
  { value: 50, label: 'Locali partner', icon: MapPin, suffix: '+' },
  { value: 10, label: 'Noleggi/mese', icon: Battery, suffix: 'K+' },
  { value: 98, label: 'Soddisfazione', icon: Users, suffix: '%' },
];

const SocialProof = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const statsEl = statsRef.current;
    const testimonialsEl = testimonialsRef.current;

    if (!section || !title || !statsEl || !testimonialsEl) return;

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        title.querySelectorAll('.reveal-item'),
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats reveal with scale
      const statItems = statsEl.querySelectorAll('.stat-item');
      statItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animated counters
      counterRefs.current.forEach((counter, i) => {
        if (!counter) return;
        const target = stats[i].value;
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 2.5,
            delay: 0.5 + i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              counter.textContent = Math.floor(this.targets()[0].val).toString();
            },
          }
        );
      });

      // Testimonials reveal
      const testimonialCards = testimonialsEl.querySelectorAll('.testimonial-card');
      testimonialCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: 0.3 + i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="relative bg-brand-charcoal py-32 lg:py-40 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
      
      {/* Energy particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-cyan/40 rounded-full animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              boxShadow: '0 0 6px rgba(46, 233, 255, 0.6)',
            }}
          />
        ))}
      </div>

      <div className="relative w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="reveal-item inline-block text-caption mb-6 font-mono tracking-widest">CHI CI HA GIÀ SCELTO</span>
            <h2 className="reveal-item text-4xl sm:text-5xl lg:text-6xl font-sora font-bold text-brand-white mb-6">
              Numeri che <span className="text-gradient">parlano</span>
            </h2>
            <p className="reveal-item text-lg text-brand-gray max-w-2xl mx-auto">
              Locali soddisfatti che hanno migliorato la loro offerta con PlugHub.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 lg:gap-8 mb-20 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 text-center group hover:border-brand-cyan/40 hover:bg-white/10 transition-all duration-500"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-brand-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <stat.icon className="relative w-8 h-8 text-brand-cyan mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="relative text-4xl lg:text-5xl font-sora font-bold text-brand-white mb-1">
                  <span ref={el => { counterRefs.current[index] = el; }}>0</span>
                  <span className="text-brand-cyan">{stat.suffix}</span>
                </div>
                <div className="relative text-sm text-brand-gray">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div 
            ref={testimonialsRef} 
            className="grid md:grid-cols-3 gap-6"
            style={{ perspective: '1000px' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-brand-cyan/30 hover:bg-white/10 transition-all duration-500 group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-cyan/10 group-hover:text-brand-cyan/20 transition-colors" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
                  ))}
                </div>

                <p className="text-brand-white leading-relaxed mb-8 text-lg">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-brand-cyan font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-white">
                      {testimonial.author}
                    </div>
                    <div className="text-brand-gray text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/0 to-transparent group-hover:via-brand-cyan/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
