import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !form || !info) return;

    const ctx = gsap.context(() => {
      // Info reveal
      gsap.fromTo(
        info.querySelectorAll('.reveal-item'),
        { x: -50, opacity: 0, filter: 'blur(10px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form reveal
      gsap.fromTo(
        form,
        { x: 50, opacity: 0, filter: 'blur(10px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating particles
      const particles = section.querySelectorAll('.float-particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -30 + Math.random() * 60,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.business) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          city: '',
          message: '',
        });
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-brand-charcoal py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="float-particle absolute w-1 h-1 bg-brand-cyan/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 6px rgba(46, 233, 255, 0.6)',
            }}
          />
        ))}
      </div>

      <div className="relative w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Info */}
            <div ref={infoRef}>
              <span className="reveal-item inline-block text-caption mb-6 font-mono tracking-widest">CONTATTACI</span>
              <h2 className="reveal-item text-4xl sm:text-5xl font-sora font-bold text-brand-white mb-6">
                Richiedi <span className="text-gradient">installazione gratuita</span>
              </h2>
              <p className="reveal-item text-lg text-brand-gray mb-12 leading-relaxed">
                Compila il modulo e ti ricontattiamo entro 24 ore per fissare un sopralluogo gratuito.
              </p>

              <div className="space-y-6">
                <div className="reveal-item flex items-start gap-4 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-brand-cyan/30 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
                    <Mail className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-white mb-1">Email</h4>
                    <a href="mailto:info@plughub.it" className="text-brand-gray hover:text-brand-cyan transition-colors">
                      info@plughub.it
                    </a>
                  </div>
                </div>

                <div className="reveal-item flex items-start gap-4 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-brand-cyan/30 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
                    <Phone className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-white mb-1">Telefono</h4>
                    <a href="tel:+390123456789" className="text-brand-gray hover:text-brand-cyan transition-colors">
                      +39 012 345 6789
                    </a>
                  </div>
                </div>

                <div className="reveal-item flex items-start gap-4 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-brand-cyan/30 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
                    <MapPin className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-white mb-1">Dove operiamo</h4>
                    <p className="text-brand-gray">
                      Milano, Roma, Torino, Firenze<br />
                      <span className="text-brand-cyan">Espansione in tutta Italia</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div ref={formRef} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-20 h-20 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Check className="w-10 h-10 text-brand-cyan" />
                  </div>
                  <h3 className="text-2xl font-sora font-bold text-brand-white mb-3">
                    Richiesta inviata!
                  </h3>
                  <p className="text-brand-gray">
                    Ti contatteremo entro 24 ore per fissare un appuntamento.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm text-brand-gray mb-2">Nome e cognome *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-brand-white placeholder:text-brand-gray/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'name' 
                            ? 'border-brand-cyan shadow-[0_0_20px_rgba(46,233,255,0.15)] bg-white/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="Mario Rossi"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm text-brand-gray mb-2">Nome attività *</label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('business')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-brand-white placeholder:text-brand-gray/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'business' 
                            ? 'border-brand-cyan shadow-[0_0_20px_rgba(46,233,255,0.15)] bg-white/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="Bar Centrale"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="block text-sm text-brand-gray mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-brand-white placeholder:text-brand-gray/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'email' 
                            ? 'border-brand-cyan shadow-[0_0_20px_rgba(46,233,255,0.15)] bg-white/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="mario@esempio.it"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm text-brand-gray mb-2">Telefono</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-brand-white placeholder:text-brand-gray/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'phone' 
                            ? 'border-brand-cyan shadow-[0_0_20px_rgba(46,233,255,0.15)] bg-white/10' 
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="+39 333 123 4567"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm text-brand-gray mb-2">Città</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border rounded-xl text-brand-white placeholder:text-brand-gray/50 focus:outline-none transition-all duration-300 ${
                        focusedField === 'city' 
                          ? 'border-brand-cyan shadow-[0_0_20px_rgba(46,233,255,0.15)] bg-white/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      placeholder="Milano"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm text-brand-gray mb-2">Messaggio (opzionale)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={3}
                      className={`w-full px-4 py-3 bg-brand-charcoal border rounded-xl text-brand-white placeholder:text-brand-gray/50 focus:outline-none transition-all duration-300 resize-none ${
                        focusedField === 'message' 
                          ? 'border-brand-cyan shadow-[0_0_20px_rgba(46,233,255,0.15)]' 
                          : 'border-white/10'
                      }`}
                      placeholder="Dicci qualcosa del tuo locale..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-brand-cyan text-brand-black font-semibold rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(46,233,255,0.4)] transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    Invia richiesta
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-brand-gray/60 text-center">
                    * Campi obbligatori
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
