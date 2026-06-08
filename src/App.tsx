import { useState, useEffect } from "react";
import { 
  ArrowUp, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  GraduationCap, 
  Menu, 
  X, 
  Eye, 
  Settings, 
  Wifi, 
  Clock,
  ExternalLink 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Sub-components
import ThreeBackground from "./components/ThreeBackground";
import ChatbotWidget from "./components/ChatbotWidget";
import AdoptSection from "./components/AdoptSection";
import DonateSection from "./components/DonateSection";
import VolunteerSection from "./components/VolunteerSection";
import SuccessSection from "./components/SuccessSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [utcTime, setUtcTime] = useState("");
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState("nest");

  // Fetch current UTC formatted clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().substring(11, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Support Adopt", id: "adopt" },
    { name: "Donations", id: "donate" },
    { name: "Volunteer", id: "volunteer" },
    { name: "Success Stories", id: "success" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Three.js Interactive 3D Particle & Torus Background Canvas */}
      <ThreeBackground />

      {/* Floating Chatbot Widget (bottom-right) */}
      <ChatbotWidget />

      {/* Transparent Glassmorphism Header */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-slate-950/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            id="brand-logo-trigger"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center border border-emerald-400/20 group-hover:scale-105 transition-all shadow-neon-emerald">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-wider text-white font-display uppercase block">
                Pace Village Cats
              </span>
              <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase block -mt-1.5 font-bold">
                Sanctuary &bull; Rehab
              </span>
            </div>
          </button>

          {/* Nav Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-emerald-400 transition-all cursor-pointer rounded-lg hover:bg-white/5"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Header Panel: System Status indicators */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono">
            {/* UTC Clock */}
            <div className="bg-slate-950/80 px-3.5 py-1.5 rounded-lg border border-white/5 flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{utcTime || "19:41:32 UTC"}</span>
            </div>
            
            {/* Active Status */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-emerald-400 shadow-neon-emerald">
              <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">SECURE LIVE</span>
            </div>
          </div>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Adaptive Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full z-45 bg-[#020617]/95 backdrop-blur-xl border-b border-white/5 flex flex-col p-6 space-y-3 font-sans block lg:hidden"
            id="mobile-navigation-drawer"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 text-sm font-semibold tracking-wide text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 px-4">
              <span>{utcTime}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sections Body Container */}
      <main className="flex-1 space-y-12">
        
        {/* HERO SECTION */}
        <section 
          id="hero" 
          className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Hero left content copy */}
          <div className="max-w-2xl lg:max-w-xl space-y-8 text-center lg:text-left">
            <span className="text-emerald-300 font-mono text-xs tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-neon-emerald inline-block">
              ⚡ IMMERSIVE 3D WEB SYSTEM
            </span>
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
                Nurture. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-teal-300 filter drop-shadow-sm">
                  Rehabilitate.
                </span> <br />
                Protect Ecosystems.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                Welcome to the <strong>Pace Village Cats Sanctuary and Rescue</strong>, located in the lush springs region of <strong>Homosassa, Florida</strong>. We operate at the forefront of digital ecology, offering native wildlife clinical support alongside loving domestic adoptions.
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection("adopt")}
                className="w-full sm:w-auto bg-gradient-to-tr from-emerald-600 to-teal-500 hover:scale-103 text-white rounded-xl px-7 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-neon-emerald-lg border border-emerald-400/20 cursor-pointer"
              >
                Discover Adoptables
              </button>
              <button
                onClick={() => scrollToSection("donate")}
                className="w-full sm:w-auto bg-slate-950/80 hover:bg-slate-900 border border-white/5 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 rounded-xl px-7 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Send Stewardship Gift
              </button>
            </div>
          </div>

          {/* Hero Right visual telemetry panel */}
          <div className="w-full max-w-md bg-slate-900/60 glassmorphism rounded-3xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-[10px] text-slate-500 font-mono">SYS_CONSOLE_V0.1</div>
            
            <div className="space-y-4 font-sans text-xs">
              <h3 className="text-base font-bold font-display text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4.5 h-4.5 text-emerald-400" />
                Rescue Registry Telemetry
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 uppercase font-mono tracking-wider text-[9px]">CLINICAL INTAKES (2026)</span>
                  <span className="text-white font-bold font-mono">314 Receives</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 uppercase font-mono tracking-wider text-[9px]">WILDLIFE RELEASE RATE</span>
                  <span className="text-emerald-400 font-bold font-mono text-xs">84.2%</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 uppercase font-mono tracking-wider text-[9px]">DOMESTIC PLACED HAPPY TAILS</span>
                  <span className="text-white font-bold font-mono">118 Placements</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-slate-400">
                <span>📍 HOMOSASSA BELT &bull; CITRUS COUNTY</span>
                <span className="text-emerald-300 animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  REHAB CLINIC ACTIVE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES / BENEFITS INITIATIVES SECTION */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-neon-emerald">
              OUR SERVICE PILLARS
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white font-display mt-4">
              Advanced Veterinary & Ecological Initiatives
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed">
              We employ structured, scientific animal health models together with loving, foster-to-adopt social pathways to secure long-term outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rescue & Rehome */}
            <div className="glassmorphism rounded-2xl p-6 border border-white/5 hover:border-emerald-500/25 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-neon-emerald-lg">
                <Heart className="w-5 h-5 fill-emerald-400/10" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Rescue & Rehome</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Rescuing abandoned pets from highways and forest lines in Citrus County, Florida. Providing safety, clinical spay/neuter, vaccinations, and match-making them with loving families.
              </p>
            </div>

            {/* Wildlife Rehab */}
            <div className="glassmorphism rounded-2xl p-6 border border-white/5 hover:border-emerald-500/25 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-neon-emerald-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Clinical Wildlife Rehab</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Operating under strict state sub-permitting to nurture orphaned raccoons, rehabilitate turtle fractures from road strikes, and mend eagles/hawks. <strong>Focusing on safe wildlife release.</strong>
              </p>
            </div>

            {/* Ecological Literacy */}
            <div className="glassmorphism rounded-2xl p-6 border border-white/5 hover:border-emerald-500/25 transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-neon-emerald-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Ecological Stewardship</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Educating Florida kids and visiting retirees on sandhill crane preservation, living harmoniously alongside gopher tortoises, and avoiding infant wildlife displacements.
              </p>
            </div>
          </div>
        </section>

        {/* ANIMATED INTERACTIVE 3D SYSTEM INTEGRATION SECTION */}
        <section id="interactive-console" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-emerald-500/20 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Interactive controls */}
            <div className="w-full lg:max-w-md space-y-6">
              <div>
                <span className="text-emerald-400 font-mono text-[9px] tracking-widest uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  REAL-TIME SIMULATION MODULATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-3">
                  Modulate Background Space 3D
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                  Interact directly with the spatial background engine. Adjust the rotation rate speed, navigate simulated coordinates, or check state alerts.
                </p>
              </div>

              {/* Slider modulation */}
              <div className="space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-white/5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[9px]">Background Speed Factor</span>
                  <span className="text-emerald-400 font-bold">{simulationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={simulationSpeed}
                  onChange={(e) => {
                    const speed = parseFloat(e.target.value);
                    setSimulationSpeed(speed);
                    // Find container or post to window to let three background consume if needed
                    const stage = document.getElementById("three-3d-stage");
                    if (stage) {
                      // Adjust opacity or scale dynamically on slider interaction as an alternate fun 3D action!
                      stage.style.opacity = (0.2 + (speed / 5) * 0.8).toString();
                    }
                  }}
                  className="w-full accent-emerald-500 bg-slate-900 border-white/5 rounded-lg cursor-pointer"
                  id="3d-rotation-slider"
                />
                <div className="flex justify-between text-[8px] text-slate-500">
                  <span>STEADY Orbit</span>
                  <span>HYPER CLOUDS</span>
                </div>
              </div>

              {/* Console Tabs */}
              <div className="flex gap-2">
                {["nest", "beacons", "migration"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTelemetryTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                      activeTelemetryTab === tab
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                        : "bg-slate-950 hover:bg-slate-900 text-slate-400 border border-white/5"
                    }`}
                  >
                    {tab === "nest" ? "Solar Safe Nest" : tab === "beacons" ? "Gopher Beacons" : "Cranes Flight"}
                  </button>
                ))}
              </div>
            </div>

            {/* Console Details Output mockup */}
            <div className="w-full flex-1 max-w-xl bg-slate-950 rounded-2xl p-6 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-400 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-emerald-400 animate-spin [animation-duration:5s]" />
                  SYS TELEMETRY CONSOLE
                </span>
                <span className="text-emerald-400 text-[10px]">SPEED_OK</span>
              </div>

              {activeTelemetryTab === "nest" && (
                <div className="space-y-2">
                  <div className="text-slate-200 font-semibold">[SOLAR SCANNER ACTIVE - HOMOSASSA SPRING 4]</div>
                  <p className="text-xs">
                    Solar powered safe incubators are reporting standard climate indicators. Artificial owl egg incubation temperature: 37.4 &deg;C. Relative humidity: 55.4%.
                  </p>
                  <div className="text-[10px] text-emerald-500">SYSTEM COORD STATUS: ALL NESTS ONLINE</div>
                </div>
              )}

              {activeTelemetryTab === "beacons" && (
                <div className="space-y-2">
                  <div className="text-slate-200 font-semibold">[GOPHER TORTOISE HABITAT SENSORS - CITRUS BELT]</div>
                  <p className="text-xs">
                    Continuous monitoring of protected burrow tunnels. Active gopher beacons mapped: 14 channels. Gopher Tortoise resident Copper reported at home coordinate segment #Burrow-08.
                  </p>
                  <div className="text-[10px] text-teal-400">SURROUNDING VEHICULAR THREAT INDEX: MINIMAL (10:00PM - 4:00AM)</div>
                </div>
              )}

              {activeTelemetryTab === "migration" && (
                <div className="space-y-2">
                  <div className="text-slate-200 font-semibold">[SANDHILL CRANES TRAVEL FLIGHT PATHS]</div>
                  <p className="text-xs">
                    Coordinating Doppler migration alerts for local Sandhill crane parent pairs flying over Route 19. Average cruising altitude: 240 meters. Alert signals broadcasted to local highway telemetry.
                  </p>
                  <div className="text-[10px] text-purple-400">CITRIC ECOSYSTEM COMPLIANCE: 100% HEALTHY MIGRATION STATUS</div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* SEARCHABLE ADOPTIONS GRID */}
        <AdoptSection id="adopt-section-bind" />

        {/* DONATE CONFIGURATOR SECTION */}
        <DonateSection id="donate-section-bind" />

        {/* VOLUNTEER DISCIPLINE ENROLLMENT */}
        <VolunteerSection id="volunteer-section-bind" />

        {/* SUCCESS STORIES SCROLLER AND PHOTO LIGHTBOX */}
        <SuccessSection id="success-section-bind" />

        {/* DIRECT CORRESPONDENCE AND MAP CONSOLE */}
        <ContactSection id="contact-section-bind" />

      </main>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToSection("hero")}
            className="fixed bottom-6 left-6 z-55 w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-white border border-white/10 hover:border-emerald-500/30 flex items-center justify-center hover:shadow-neon-emerald cursor-pointer transition-all"
            id="scroll-to-top-floating"
            title="Scroll To Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-20 py-12 border-t border-white/5 bg-slate-950/80 backdrop-blur-md relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-sm font-extrabold tracking-widest text-white uppercase font-display">
              Pace Village Cats Sanctuary
            </span>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              A futuristic, heart-centered animal rescue and sanctuary located in Homosassa, Citrus County, Florida. Fully committed to domestic animal placements & native wildlife rehabilitation.
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Hours: Wednesday &mdash; Sunday, 10:00 AM &mdash; 4:00 PM &bull; Call: <a href="tel:3529425438" className="hover:text-emerald-400 transition-colors">(352) 942-5438</a>
            </p>
          </div>

          {/* Core copyright text, as explicitly required in instructions */}
          <div className="text-center pt-4 border-t border-white/5 w-full">
            <p className="text-xs text-slate-600">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors inline-flex items-center gap-0.5">Pace Village Cats <ExternalLink className="w-3 h-3 inline shrink-0" /></a> &middot; All Rights Reserved &copy; 2026.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
