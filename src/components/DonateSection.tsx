import React, { useState } from "react";
import { Check, Flame, Heart, Info, Landmark, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import daisyImage from "../assets/images/daisy_mini_pig_1780948210356.png";

export default function DonateSection() {
  const [amount, setAmount] = useState<number>(75);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sponsorSubmitted, setSponsorSubmitted] = useState<string | null>(null);

  const donationTiers = [
    { value: 15, label: "$15", impact: "Feeds a rescued kitten pair for 1 week" },
    { value: 30, label: "$30", impact: "Provides antibiotics & warmth lamps for an orphaned fawn" },
    { value: 75, label: "$75", impact: "Covers complete wound diagnostics & splints for sandhill cranes" },
    { value: 250, label: "$250", impact: "Directly funds 1 state-licensed incubative climate incubator" }
  ];

  const residentSponsorships = [
    {
      id: "copper-spons",
      name: "Copper the Gopher Tortoise",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600",
      cost: 25,
      impact: "Supplies Copper's daily fresh dandelion greens, berries, & calcium supplements."
    },
    {
      id: "apollo-spons",
      name: "Apollo the Screech Owl",
      image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600",
      cost: 35,
      impact: "Covers safe avian healthcare exams & specialized nutrient-rich diets."
    },
    {
      id: "daisy-spons",
      name: "Daisy the Juliana Pig",
      image: daisyImage,
      cost: 40,
      impact: "Sponsors Daisy's natural straw bed comfort & therapeutic joint care oils."
    }
  ];

  const handleCustomChange = (valStr: string) => {
    setCustomAmount(valStr);
    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const calculateDaysFunded = () => {
    // Rounding formula: $5 funds approximately 1 day of standard domestic care
    return Math.floor(amount / 5);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setCustomAmount("");
    }, 4500);
  };

  const handleSponsorClick = (animalName: string) => {
    setSponsorSubmitted(animalName);
    setTimeout(() => {
      setSponsorSubmitted(null);
    }, 4000);
  };

  return (
    <section id="donate" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-neon-emerald">
          SUPPORT LIFE-SAVING CARE
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display mt-4">
          Fuel Our Healing Initiatives
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400 font-sans">
          Every cent contributes directly to medications, climate-controlled rehabilitation, and dietary essentials. 100% of donations fuel sanctuary operations in Homosassa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Donation calculation & setup */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/5 space-y-6">
            <h3 className="text-2xl font-bold font-display text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-400" />
              Gift Contribution Configurator
            </h3>

            {/* Toggle One-time vs Monthly */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 w-fit">
              <button
                type="button"
                onClick={() => setIsMonthly(false)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  !isMonthly
                    ? "bg-slate-900 text-emerald-400 border border-emerald-500/20 shadow-neon-emerald"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setIsMonthly(true)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isMonthly
                    ? "bg-slate-900 text-emerald-400 border border-emerald-500/20 shadow-neon-emerald"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Monthly Stewardship Support
              </button>
            </div>

            {/* Configured Tiers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {donationTiers.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => {
                    setAmount(tier.value);
                    setCustomAmount("");
                  }}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center border text-center transition-all cursor-pointer ${
                    amount === tier.value && !customAmount
                      ? "bg-emerald-500/10 border-emerald-500/40 shadow-neon-emerald"
                      : "bg-slate-950/60 border-white/5 hover:border-white/10"
                  }`}
                >
                  <span className="text-xl font-bold font-display text-white">{tier.label}</span>
                  <span className="text-[9px] text-slate-500 font-mono mt-1 uppercase tracking-wider">SELECT</span>
                </button>
              ))}
            </div>

            {/* Custom inputs */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Or Specify Your Customized Amount ($ USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono font-medium">$</span>
                <input
                  type="number"
                  min="5"
                  value={customAmount}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  placeholder="Enter custom dollar amount e.g. 150"
                  className="w-full bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-xl pl-8 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-700 font-sans focus:outline-none"
                  id="custom-donation-input"
                />
              </div>
            </div>

            {/* Dynamic calculator block */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-emerald-500/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-neon-emerald">
                <Flame className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Calculated Ecological Impact</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Contributing <strong className="text-emerald-400 font-mono">${amount}</strong> {isMonthly ? "every month" : "today"} is equivalent to funding approximately <strong className="text-slate-100 font-mono">{calculateDaysFunded()} days</strong> of continuous, state-licensed healthcare and complete nutritional feed for rehabilitating native rescues.
                </p>
              </div>
            </div>

            {/* Quick Secure Form checkout */}
            <div className="pt-4 border-t border-white/5">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/15 border border-emerald-400/25 p-5 rounded-2xl text-center space-y-1.5"
                >
                  <Check className="w-6 h-6 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-300">Stewardship Transaction Processed!</h4>
                  <p className="text-[11px] text-slate-300">
                    A secure receipt has been dispatched to your email. Thank you for your immense empathy! Your love safeguards Homosassa ecosystems.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-3 font-sans">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Cardholder Name"
                      className="bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Receipt Email Address"
                      className="bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-neon-emerald cursor-pointer"
                  >
                    Authorize Safe Secure Gift of ${amount} {isMonthly ? "/ Month" : ""}
                  </button>
                  <div className="flex items-center justify-center gap-1 text-[9px] text-slate-500 tracking-wide font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>SECURED BY SSL 256-BIT ENCRYPTION &middot; NO CARD INFORMATION DEPOSITED</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Resident Sponsorship options */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/5">
            <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
              <Heart className="w-4.5 h-4.5 text-emerald-400 fill-emerald-400/10" />
              Sponsor an Ambassador
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Some rescued animals possess permanent physical limitations preventing state-licensed release. Sponsor their ongoing comfortable welfare under our lifetime resident program!
            </p>

            <div className="space-y-4">
              {residentSponsorships.map((res) => (
                <div
                  key={res.id}
                  className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-emerald-500/20 transition-all group"
                >
                  <img
                    src={res.image}
                    alt={res.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border border-white/5 shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <h4 className="text-xs font-bold text-white tracking-wide truncate">{res.name}</h4>
                      <span className="text-[10px] text-emerald-300 font-mono shrink-0">${res.cost}/mo</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans line-clamp-2">
                      {res.impact}
                    </p>
                    
                    {sponsorSubmitted === res.name ? (
                      <div className="text-[9px] text-emerald-400 font-mono font-medium flex items-center gap-1 pt-1">
                        <Check className="w-3 h-3 shrink-0" />
                        Ambassador Sponsored!
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSponsorClick(res.name)}
                        className="text-[9px] font-mono text-emerald-400 hover:text-emerald-300 font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer pt-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        <Sparkles className="w-3 h-3" />
                        Sponsor with ${res.cost} Monthly
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
