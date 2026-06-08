import React, { useState } from "react";
import { VOLUNTEER_OPPORTUNITIES } from "../data";
import { Check, ClipboardList, Clock, ShieldAlert, Sparkles, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function VolunteerSection() {
  const [selectedOpp, setSelectedOpp] = useState<string>("habitat");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Form elements
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");

  const activeOppDetails = VOLUNTEER_OPPORTUNITIES.find((opp) => opp.id === selectedOpp) || VOLUNTEER_OPPORTUNITIES[0];

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !age) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      setAge("");
      setExperience("");
    }, 5000);
  };

  return (
    <section id="volunteer" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-neon-emerald">
          JOIN OUR FORCE OF EMPATHY
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display mt-4">
          Become a Sanctuary Protector
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400 font-sans">
          Discover a deeply satisfying connection safeguarding animals. Whether you have 2 hours a month or seek intensive daily rehab training, we need you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: opportunities layout */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display text-white flex items-center gap-2 mb-4">
              <ClipboardList className="w-5.5 h-5.5 text-emerald-400" />
              Volunteer Disciplines Needed
            </h3>

            {/* Select tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="discipline-selector">
              {VOLUNTEER_OPPORTUNITIES.map((opp) => (
                <button
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp.id)}
                  className={`p-4 rounded-xl text-left transition-all border shrink-0 cursor-pointer ${
                    selectedOpp === opp.id
                      ? "bg-emerald-500/10 border-emerald-500/35 shadow-neon-emerald text-emerald-300"
                      : "bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                  }`}
                >
                  <h4 className="text-sm font-semibold tracking-wide font-display">{opp.title}</h4>
                  <span className="text-[10px] font-mono tracking-wide text-slate-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-emerald-500/60" />
                    {opp.commitment}
                  </span>
                </button>
              ))}
            </div>

            {/* Dynamic Active opportunity details card */}
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-white/5 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">ACTIVE DISCIPLINE FOCUS</span>
                <h4 className="text-lg font-bold font-display text-white">{activeOppDetails.title}</h4>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {activeOppDetails.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                  Stewardship Requirements
                </span>
                <ul className="space-y-1.5">
                  {activeOppDetails.requirements.map((req, index) => (
                    <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Application form */}
        <div className="lg:col-span-5">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/5 h-full flex flex-col justify-center">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-neon-emerald animate-bounce">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-emerald-300">Stewardship File Initiated!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>! We have logged your application to the <strong>{activeOppDetails.title}</strong> division under registration token <strong>#VOLUNTEER-{Math.floor(100 + Math.random() * 900)}</strong>. Our Homosassa volunteer clinical director will schedule an online orientation details link with you shortly!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Online Application File
                  </h3>
                  <p className="text-xs text-slate-400">
                    Apply directly to serve the {activeOppDetails.title} department! Secure and confidential.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Jordan Mitchell"
                    className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-700 focus:outline-none"
                    id="volunteer-name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. jordan@domain.com"
                      className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-700 focus:outline-none"
                      id="volunteer-email"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="E.g. (352) 555-0144"
                      className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-700 focus:outline-none"
                      id="volunteer-phone"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Your Age Group *</label>
                  <select
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none cursor-pointer"
                    id="volunteer-age-group"
                  >
                    <option value="" disabled className="text-slate-700">Select age bracket</option>
                    <option value="16-17" className="text-slate-300">16 - 17 (Signed waiver required)</option>
                    <option value="18-25" className="text-slate-300">18 - 25</option>
                    <option value="26-49" className="text-slate-300">26 - 49</option>
                    <option value="50+" className="text-slate-300">50+</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase block">Applicable Bio/Experience (Optional)</label>
                  <textarea
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Briefly share animal ownership, veterinary assist training, or general passion profiles..."
                    className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-700 focus:outline-none resize-none"
                    id="volunteer-experience"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3 text-xs font-semibold tracking-wider uppercase transition-colors shadow-neon-emerald cursor-pointer"
                  id="volunteer-submit-btn"
                >
                  Submit Certified Stewardship Application
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
