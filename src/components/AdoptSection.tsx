import React, { useState } from "react";
import { Search, Heart, Info, Check, AlertCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ANIMALS_DATA } from "../data";
import { Animal, AdoptionStatus } from "../types";

export default function AdoptSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  
  // Form coordinates
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const categories = ["All", "Dog", "Cat", "Wildlife", "Farm Sanctuary"];

  const filteredAnimals = ANIMALS_DATA.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          animal.traits.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || animal.species === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone || !agreeTerms) return;

    setInquirySubmitted(true);
    // Reset values after a delay
    setTimeout(() => {
      setInquirySubmitted(false);
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormMessage("");
      setAgreeTerms(false);
      setSelectedAnimal(null);
    }, 4500);
  };

  return (
    <section id="adopt" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-neon-emerald">
          FIND YOUR SOULMATE
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display mt-4">
          Rescues Awaiting Forever Homes
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400 font-sans">
          Whether you want to open your home to a furry friend or sponsor a rehabilitated wild ambassador, discover our extraordinary residents in Homosassa, FL.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glassmorphism rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/5">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, trait, breed..."
            className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            id="animal-search-input"
          />
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-neon-emerald"
                  : "bg-slate-950 text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-200"
              }`}
            >
              {cat === "Wildlife" ? "Wildlife Rehabilitating" : cat === "Farm Sanctuary" ? "Farms Rescues" : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="adoptable-listings">
        <AnimatePresence mode="popLayout">
          {filteredAnimals.map((animal) => (
            <motion.div
              layout
              key={animal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group glassmorphism rounded-2xl overflow-hidden glassmorphism-hover border border-white/5 hover:-y-1 flex flex-col"
            >
              {/* Photo Area */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <img
                  src={animal.image}
                  alt={animal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Status indicator tag */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold tracking-wider uppercase ${
                    animal.status === AdoptionStatus.AVAILABLE
                      ? "bg-emerald-500/95 text-white shadow-neon-emerald"
                      : animal.status === AdoptionStatus.REHABILITATION
                      ? "bg-amber-500/95 text-slate-950"
                      : "bg-violet-600/95 text-white"
                  }`}>
                    {animal.status}
                  </span>
                </div>
                
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="p-2 rounded-full bg-slate-900/80 text-emerald-400 backdrop-blur-md">
                    <Heart className="w-4 h-4 fill-emerald-400/20" />
                  </span>
                </div>
              </div>

              {/* Data Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-display leading-tight">{animal.name}</h3>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">{animal.gender}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{animal.breed}</p>
                  
                  {/* Traits */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {animal.traits.slice(0, 3).map((trait) => (
                      <span
                        key={trait}
                        className="text-[9px] bg-slate-950 border border-white/5 px-2 py-0.5 rounded-full text-slate-400 font-mono tracking-wider"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-4 leading-relaxed italic">
                    "{animal.story}"
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAnimal(animal)}
                  className="mt-5 w-full bg-slate-950 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-400 rounded-xl py-2 text-xs font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  View Sanctuary Profile
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-sm">No animals match your selection. Try clicking a different category chip above or adjust your search.</p>
        </div>
      )}

      {/* Dynamic Profile Lightbox & Inquiry Form Modal */}
      <AnimatePresence>
        {selectedAnimal && (
          <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnimal(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl glassmorphism rounded-3xl overflow-hidden border border-emerald-500/25 shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/70 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 flex items-center justify-center transition-colors"
                id="close-profile-btn"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 sm:space-y-8 no-scrollbar">
                
                {/* Hero Profile Split */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo with status */}
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto rounded-2xl overflow-hidden border border-white/5 shrink-0">
                    <img
                      src={selectedAnimal.image}
                      alt={selectedAnimal.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono tracking-wider text-emerald-400 border border-emerald-500/20">
                      {selectedAnimal.status}
                    </span>
                  </div>

                  {/* Facts */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold font-display text-white">{selectedAnimal.name}</h3>
                      <p className="text-sm font-mono text-emerald-400 mt-1">{selectedAnimal.breed}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-950/60 rounded-xl px-4 py-2 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">AGE</span>
                        <span className="text-sm font-semibold text-white">{selectedAnimal.age}</span>
                      </div>
                      <div className="bg-slate-950/60 rounded-xl px-4 py-2 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">SIZE</span>
                        <span className="text-sm font-semibold text-white">{selectedAnimal.size}</span>
                      </div>
                      <div className="bg-slate-950/60 rounded-xl px-4 py-2 border border-white/5">
                        <span className="text-[10px] text-slate-500 font-mono block">GENDER</span>
                        <span className="text-sm font-semibold text-white">{selectedAnimal.gender}</span>
                      </div>
                      <div className="bg-slate-950/60 rounded-xl px-4 py-2 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 font-mono block">VACCINATIONS</span>
                          <span className="text-sm font-semibold text-white">{selectedAnimal.vaccinated ? "Up-To-Date" : "Not Required"}</span>
                        </div>
                        {selectedAnimal.vaccinated && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Friendly With</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedAnimal.friendlyWith.map((item, id) => (
                          <span key={id} className="text-xs bg-slate-950 px-2.5 py-1 rounded-md text-emerald-300 font-mono border border-emerald-500/10">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rescue Story */}
                <div className="space-y-2 bg-slate-950/50 p-5 rounded-2xl border border-white/5">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Rescue Chronicle</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedAnimal.story}</p>
                </div>

                {/* Adoption/Sponsorship Application Form */}
                <div className="border-t border-white/10 pt-6">
                  {inquirySubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-300 animate-bounce">
                        <Check className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold font-display text-emerald-300">Sanctuary Inquiry Received!</h4>
                      <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                        We have logged your application under inquiry log <strong>#IWNSR-{Math.floor(1000 + Math.random() * 9000)}</strong>. A visiting clinical representative from our Homosassa team will reach out to you within 48 hours. Let us protect these beautiful souls, together!
                      </p>
                    </motion.div>
                  ) : (
                    <div>
                      <h4 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        Inquire About {selectedAnimal.name}
                      </h4>
                      <p className="text-xs text-slate-400 mb-5">
                        Please provide your contact details to coordinate a shelter visit, meet-and-greets, or discuss custom stewardship sponsorship!
                      </p>

                      <form onSubmit={handleInquirySubmit} className="space-y-4 font-sans text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Name *</label>
                            <input
                              type="text"
                              required
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="E.g. Alexis Carter"
                              className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Email *</label>
                            <input
                              type="email"
                              required
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              placeholder="E.g. alexis@example.com"
                              className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Phone *</label>
                            <input
                              type="tel"
                              required
                              value={formPhone}
                              onChange={(e) => setFormPhone(e.target.value)}
                              placeholder="E.g. (352) 555-0199"
                              className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-mono uppercase block">Message of Interest (Optional)</label>
                          <textarea
                            rows={3}
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            placeholder="Share your experience, households pets, or specify if you wish to host a meet-and-greet in Citrus County..."
                            className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none resize-none"
                          />
                        </div>

                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            required
                            id="agreeTerms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="mt-0.5 rounded accent-emerald-500 bg-slate-950 border-white/5"
                          />
                          <label htmlFor="agreeTerms" className="text-[11px] text-slate-400 leading-normal">
                            I verify that I live in/adjacent to Citrus County or can travel to Homosassa, Florida for on-site sanctuary consultations, and agree to the rescue adoption wellness framework. *
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3 text-xs font-semibold tracking-wider uppercase transition-colors shadow-neon-emerald cursor-pointer"
                        >
                          Submit Inquiry to Homosassa Clinic
                        </button>
                      </form>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
