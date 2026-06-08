import { useState } from "react";
import { Play, Sparkles, X, ChevronRight, MessageSquareCode, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SUCCESS_STORIES } from "../data";
import daisyImage from "../assets/images/daisy_mini_pig_1780948210356.png";

export default function SuccessSection() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [hoveredCompare, setHoveredCompare] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const activeStory = SUCCESS_STORIES[activeStoryIdx];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600",
      caption: "Copper checking out sandbox expansion terrain"
    },
    {
      url: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600",
      caption: "Apollo undergoing feather alignment inspection"
    },
    {
      url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600",
      caption: "Pip & Squeak snugged in foster heating wrap"
    },
    {
      url: daisyImage,
      caption: "Daisy enjoying pumpkin wedges at standard feeding time"
    },
    {
      url: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&q=80&w=600",
      caption: "Willow the White-tailed Deer during morning wilderness pacing"
    },
    {
      url: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&q=80&w=600",
      caption: "Cleo the baby raccoon honing her foraging behaviors"
    }
  ];

  return (
    <section id="success" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-neon-emerald">
          TRIUMPHS OF TENDER CARE
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display mt-4">
          Heartwarming Success Chronicles
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-slate-400 font-sans">
          Trace the jaw-dropping before-and-after transformations of our beloved residents, showing how scientific veterinary medicine and community support rewrite rescue histories.
        </p>
      </div>

      {/* Before and After slider / toggler area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
        
        {/* Left selector */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-1.5">
            <MessageSquareCode className="w-5 h-5 text-emerald-400" />
            Adopter Testimonials
          </h3>
          
          <div className="space-y-3" id="testimonials-list">
            {SUCCESS_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => {
                  setActiveStoryIdx(idx);
                  setIsPlayingVideo(false);
                }}
                className={`w-full p-5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between group ${
                  activeStoryIdx === idx
                    ? "bg-slate-900/90 border-emerald-500/30 shadow-neon-emerald"
                    : "bg-slate-950/60 border-white/5 hover:border-white/10"
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-white font-display tracking-wide">{story.title}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">Saved Resident: {story.animalName} &middot; Adopted {story.date}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 italic text-slate-400 text-xs leading-relaxed space-y-3 font-sans">
            <p>
              &ldquo;{activeStory.testimonial}&rdquo;
            </p>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold not-italic">
              &mdash; {activeStory.adopterName}, Proud Guardian
            </span>
          </div>
        </div>

        {/* Before and After Comparer Display */}
        <div className="lg:col-span-7">
          <div className="glassmorphism rounded-3xl overflow-hidden border border-white/5 h-full flex flex-col justify-between">
            {/* Split comparative Image showcase */}
            <div className="p-6 sm:p-8 space-y-4 flex-1">
              <h4 className="text-base font-bold font-display text-white">
                Transformation Narrative: {activeStory.animalName}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                {activeStory.description}
              </p>

              {/* Compiling Dual Card with Hover indicator */}
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                onMouseEnter={() => setHoveredCompare(activeStory.id)}
                onMouseLeave={() => setHoveredCompare(null)}
              >
                {/* Before */}
                <div className="relative rounded-2xl overflow-hidden border border-red-500/10 h-64 shadow-lg group">
                  <img
                    src={activeStory.beforeImg}
                    alt="Before rescue situation"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 bg-red-600 px-2.5 py-0.5 rounded text-[9px] font-mono tracking-wider font-semibold uppercase text-white">
                    AS FOUND
                  </span>
                </div>

                {/* After */}
                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 h-64 shadow-neon-emerald group">
                  <img
                    src={activeStory.afterImg}
                    alt="After rescue rehab"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 bg-emerald-600 px-2.5 py-0.5 rounded text-[9px] font-mono tracking-wider font-semibold uppercase text-white shadow-neon-emerald">
                    HAPPY TAILS
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-950/60 px-6 sm:px-8 py-4 border-t border-white/5 text-[10px] font-mono tracking-wider text-slate-500 uppercase flex items-center justify-between">
              <span>Homosassa Sanctuary Case #{activeStory.id.toUpperCase()}-2026</span>
              <span className="text-emerald-400 animate-pulse">STATUS: CRITICAL HEALING ACHIEVED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video integration + media gallery sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Video Block */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="glassmorphism rounded-3xl p-6 border border-white/5 h-full flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-display text-white">Active Sanctuary Feed</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Experience a glimpse of our serene woodland wetlands and veterinary diagnostics facility loop in action.
              </p>
            </div>

            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 h-48 sm:h-52 bg-slate-900 mt-6 group">
              {isPlayingVideo ? (
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4"
                  autoPlay
                  controls
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full relative">
                  {/* Stock forest overlay */}
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600"
                    alt="Sanctuary grounds"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-75 group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Centered play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 shadow-neon-emerald-lg border border-emerald-400/20"
                    >
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono bg-slate-950/80 px-2 py-0.5 rounded text-slate-400">
                    Muted Ambient Stock Clip
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Media Photo Grid Area (Lightbox) */}
        <div className="md:col-span-7 lg:col-span-8">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-white/5 h-full">
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2 mb-2">
              <ImageIcon className="w-5 h-5 text-emerald-400" />
              Sanctuary Lens Portfolio
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Capturing daily moments from our recovery ward. Click any image card below to pop open the high-resolution lightbox portfolio!
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3" id="photo-album-lightbox">
              {galleryImages.map((img, id) => (
                <div
                  key={id}
                  onClick={() => setLightboxImage(img.url)}
                  className="relative rounded-xl overflow-hidden cursor-pointer h-24 group border border-white/5 hover:border-emerald-500/20 shadow"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[9px] font-mono uppercase bg-emerald-500/90 text-white px-2 py-0.5 rounded shadow-neon-emerald tracking-wide">
                      EXPAND +
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal rendering */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full z-10 rounded-2xl overflow-hidden border border-white/10"
              id="lightbox-popup-card"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                id="close-lightbox-btn"
              >
                <X className="w-4 h-4" />
              </button>
              
              <img
                src={lightboxImage}
                alt="Expanded view portfolio"
                referrerPolicy="no-referrer"
                className="w-full max-h-[80vh] object-contain bg-slate-950"
              />
              
              <div className="bg-slate-900 px-6 py-4 border-t border-white/5 text-center">
                <span className="text-xs font-mono tracking-wider text-slate-300">
                  {galleryImages.find((g) => g.url === lightboxImage)?.caption || "Sanctuary Wildlife Ambassador Portrait"}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
