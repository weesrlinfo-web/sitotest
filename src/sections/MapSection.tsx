import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation, Clock, CreditCard, Battery, X, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Sample stations data
const stations = [
  { id: 1, name: 'Bar Centrale', address: 'Via Roma 123, Milano', available: 3, total: 4, distance: '120m', hours: '07:00 - 23:00', lat: 45.4642, lng: 9.19 },
  { id: 2, name: 'Caffè della Piazza', address: 'Piazza Duomo 45, Milano', available: 1, total: 4, distance: '350m', hours: '08:00 - 22:00', lat: 45.4642, lng: 9.1895 },
  { id: 3, name: 'Hotel Grand', address: 'Via Manzoni 8, Milano', available: 4, total: 8, distance: '580m', hours: '24/7', lat: 45.468, lng: 9.194 },
  { id: 4, name: 'Ristorante Luna', address: 'Corso Como 15, Milano', available: 2, total: 4, distance: '720m', hours: '12:00 - 00:00', lat: 45.481, lng: 9.186 },
  { id: 5, name: 'Shopping Center', address: 'Via Torino 100, Milano', available: 6, total: 12, distance: '950m', hours: '09:00 - 22:00', lat: 45.456, lng: 9.182 },
];

const MapSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [selectedStation, setSelectedStation] = useState<typeof stations[0] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    const list = listRef.current;
    const line = lineRef.current;

    if (!section || !map || !list || !line) return;

    const ctx = gsap.context(() => {
      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        map,
        { opacity: 0, x: '-60vw' },
        { opacity: 1, x: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        list,
        { opacity: 0, x: '50vw' },
        { opacity: 1, x: 0, ease: 'none' },
        0.06
      );

      // Line draw
      const lineLength = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      });
      scrollTl.to(
        line,
        { strokeDashoffset: 0, ease: 'none' },
        0.1
      );

      // Pins animation
      const pins = map.querySelectorAll('.station-pin');
      pins.forEach((pin, i) => {
        scrollTl.fromTo(
          pin,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
          0.18 + i * 0.03
        );
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        map,
        { opacity: 1 },
        { opacity: 0, x: '-16vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        list,
        { opacity: 1 },
        { opacity: 0, x: '12vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        line,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openDirections = (station: typeof stations[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="map"
      className="section-pinned bg-brand-black flex items-center justify-center"
    >
      {/* Neon line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M 46 50 L 54 50"
          fill="none"
          stroke="#2EE9FF"
          strokeWidth="0.1"
          className="neon-line"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative w-full px-6 lg:px-12 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 h-[70vh]">
            {/* Map */}
            <div
              ref={mapRef}
              className="card-glass card-shadow overflow-hidden relative"
            >
              {/* Stylized dark map */}
              <div className="absolute inset-0 bg-[#1a1a24]">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute w-full h-px bg-brand-cyan/30"
                      style={{ top: `${i * 5}%` }}
                    />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full w-px bg-brand-cyan/30"
                      style={{ left: `${i * 5}%` }}
                    />
                  ))}
                </div>

                {/* Streets */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 30 Q 30 30, 50 50 Q 70 70, 100 70" fill="none" stroke="#2a2a35" strokeWidth="2" />
                  <path d="M 20 0 Q 20 40, 50 50 Q 80 60, 80 100" fill="none" stroke="#2a2a35" strokeWidth="1.5" />
                  <path d="M 0 60 Q 40 60, 50 50 Q 60 40, 100 40" fill="none" stroke="#2a2a35" strokeWidth="1" />
                </svg>

                {/* Station pins */}
                {stations.map((station, i) => (
                  <button
                    key={station.id}
                    onClick={() => setSelectedStation(station)}
                    className={`station-pin absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedStation?.id === station.id ? 'scale-125 z-10' : 'hover:scale-110'
                    }`}
                    style={{
                      left: `${20 + (i % 3) * 25 + (i * 7) % 10}%`,
                      top: `${25 + Math.floor(i / 3) * 30 + (i * 5) % 10}%`,
                    }}
                  >
                    <div className={`relative ${station.available > 0 ? 'pulse-pin' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        station.available > 0 ? 'bg-brand-cyan' : 'bg-brand-gray'
                      }`}>
                        <Battery className="w-5 h-5 text-brand-black" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-black rounded-full flex items-center justify-center border border-brand-cyan">
                        <span className="text-xs font-bold text-brand-cyan">{station.available}</span>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Current location */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />
                  </div>
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-brand-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-brand-white hover:bg-brand-cyan hover:text-brand-black transition-colors">
                  <span className="text-xl font-bold">+</span>
                </button>
                <button className="w-10 h-10 bg-brand-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-brand-white hover:bg-brand-cyan hover:text-brand-black transition-colors">
                  <span className="text-xl font-bold">−</span>
                </button>
              </div>
            </div>

            {/* Station List */}
            <div
              ref={listRef}
              className="card-glass card-shadow overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/5">
                <h3 className="text-xl font-sora font-bold text-brand-white mb-1">
                  Stazioni vicine
                </h3>
                <p className="text-sm text-brand-gray">
                  {stations.reduce((acc, s) => acc + s.available, 0)} powerbank disponibili nelle vicinanze
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {stations.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => setSelectedStation(station)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedStation?.id === station.id
                        ? 'bg-brand-cyan/10 border border-brand-cyan/30'
                        : 'bg-brand-charcoal/50 border border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-brand-white">{station.name}</h4>
                      <span className="text-xs text-brand-gray">{station.distance}</span>
                    </div>
                    <p className="text-sm text-brand-gray mb-3">{station.address}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`flex items-center gap-1 ${station.available > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <Battery className="w-3 h-3" />
                        {station.available}/{station.total} disponibili
                      </span>
                      <span className="flex items-center gap-1 text-brand-gray">
                        <Clock className="w-3 h-3" />
                        {station.hours}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Station Detail Modal */}
      {selectedStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedStation(null)}
          />
          <div className="relative bg-brand-charcoal rounded-3xl overflow-hidden max-w-md w-full shadow-2xl">
            <button
              onClick={() => setSelectedStation(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-brand-black/50 rounded-full flex items-center justify-center text-brand-white hover:bg-brand-black transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-44 bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 flex items-center justify-center">
              <img
                src="/images/4.png"
                alt="Station"
                className="max-h-32 w-auto"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-sora font-bold text-brand-white mb-2">
                {selectedStation.name}
              </h3>
              <div className="space-y-2 text-sm text-brand-gray mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>{selectedStation.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  <span>{selectedStation.distance} da te</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedStation.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Carta, App</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-brand-black/50 rounded-xl mb-4">
                <span className="text-sm text-brand-gray">Disponibilità</span>
                <span className={`font-semibold ${selectedStation.available > 0 ? 'text-brand-cyan' : 'text-red-400'}`}>
                  <Battery className="w-4 h-4 inline mr-1" />
                  {selectedStation.available} powerbank disponibili
                </span>
              </div>

              <button
                onClick={() => openDirections(selectedStation)}
                className="btn-filled w-full flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Indicazioni
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MapSection;
