import React, { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Send, Check, Sparkles, Map, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactSection() {
  const [inquirySent, setInquirySent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setName("");
      setEmail("");
      setSubject("general");
      setMessage("");
    }, 4500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-neon-emerald">
          ESTABLISH CONNECTION
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display mt-4">
          Contact Our Sanctuary Grounds
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400 font-sans">
          Have questions about the meet-and-greets, clinical wildlife rehab questions, or corporate sponsorships? Our Homosassa, Florida staff is ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Coordinates & Simulated Interactive Map */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/5 space-y-6">
            <h3 className="text-xl font-bold font-display text-white">Direct Coordinates</h3>
            
            <div className="space-y-4 font-sans text-xs">
              {/* Phone */}
              <a
                href="tel:3529425438"
                className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform shadow-neon-emerald">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">TELEPHONE REGISTRY</span>
                  <span className="text-sm font-semibold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                    (352) 942-5438
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:gaylakilbrider@gmail.com"
                className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform shadow-neon-emerald">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">ELECTRONIC MAIL</span>
                  <span className="text-xs sm:text-xs font-semibold text-white tracking-wide block truncate group-hover:text-emerald-300 transition-colors">
                    gaylakilbrider@gmail.com
                  </span>
                </div>
              </a>

              {/* Schedule */}
              <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-neon-emerald">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">HOURS OF OPERATION</span>
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Wednesday &mdash; Sunday: 10AM &mdash; 4PM
                  </span>
                  <span className="block text-[9px] text-slate-500 font-mono italic mt-0.5">
                    Mondays & Tuesdays: Closed for Clinical Deep Sanitizing
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Futuristic High-Performance Simulated Map Card */}
          <div className="glassmorphism rounded-3xl p-6 border border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            {/* Background elements to represent vector grids */}
            <div className="absolute inset-0 opacity-15 pointer-events-none font-mono text-[9px] text-emerald-500 select-none">
              <div className="absolute top-2 left-4">GRID SEC: CITRUS_CTY_28.18</div>
              <div className="absolute bottom-2 right-4">HOMOSASSA LAT: 28.786°N LON: 82.607°W</div>
              {/* Simulating coordinate circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-emerald-500/40 animate-spin [animation-duration:20s]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-dashed border-emerald-500/20" />
            </div>

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-slate-500 font-mono block">TACTICAL LOCATIONAL CONSOLE</span>
              <h4 className="text-sm font-bold font-display text-white flex items-center gap-1.5">
                <Map className="w-4 h-4 text-emerald-400" />
                Homosassa Springs Wildlife Belt
              </h4>
            </div>

            {/* Glowing Map pin center overlay */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute w-8 h-8 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="relative w-12 h-12 rounded-2xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-neon-emerald">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider text-slate-400">
              <div className="flex items-center gap-1">
                <Navigation className="w-3 h-3 text-emerald-400" />
                <span>CITRUS COUNTY, FLORIDA</span>
              </div>
              <a 
                href="https://maps.google.com/?q=Homosassa,+Florida" 
                target="_blank" 
                rel="referrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors uppercase font-bold"
              >
                OPEN REAL MAP &raquo;
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/5 h-full flex flex-col justify-center">
            {inquirySent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-neon-emerald animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-emerald-300">Signal Logged Successfully</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-sm mx-auto">
                  Hello, <strong>{name}</strong>! Your correspondence on <strong>{subject.toUpperCase()}</strong> has been routed to our Homosassa operations terminal with ID code <strong>#SR-{Math.floor(1000 + Math.random() * 9000)}</strong>. A support clinician will contact you within 24 hours. Keep protecting native ecosystems!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Secure Correspondence Terminal
                  </h3>
                  <p className="text-xs text-slate-400">
                    Draft a safe signal down to our physical rehabilitative staff. Essential fields are marked.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. Alexis Carter"
                      className="w-full bg-slate-950 border border-white/11 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-700 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono uppercase block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. alexis@domain.com"
                      className="w-full bg-slate-950 border border-white/11 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Primary Topic focus</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-white/11 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none cursor-pointer"
                  >
                    <option value="general" className="text-slate-300">General Sanctuary Inquiry & Feedback</option>
                    <option value="adopt" className="text-slate-300">Animal Adoption & Placement Meetup</option>
                    <option value="volunteer" className="text-slate-300">Volunteer Opportunities & Fosters</option>
                    <option value="donate" className="text-slate-300">Corporate Stewardship, Foundation Donations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Draft Your Narrative *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Draft your detailed questions, ideas, or feedback regarding our Homosassa initiatives here..."
                    className="w-full bg-slate-950 border border-white/11 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-700 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3 text-xs font-semibold tracking-wider uppercase transition-colors shadow-neon-emerald cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Broadcast Signal Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
