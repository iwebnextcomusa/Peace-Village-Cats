import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hi there! 🐾 I am your Pace Village Cats Sanctuary Assistant. How can I help you today? Ask me about animal adoptions, volunteer options, our wildlife rehabilitation programs, or how your donations can directly protect animals in Homosassa, FL!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWarning, setShowWarning] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    setShowWarning(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMsg).map((msg) => ({
            role: msg.sender === "user" ? "user" : "model",
            content: msg.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach assistant server");
      }

      const data = await response.json();
      
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.text,
          timestamp: new Date(),
          warning: data.warning === "API_KEY_MISSING"
        }
      ]);

      if (data.warning === "API_KEY_MISSING") {
        setShowWarning("API key has not been configured in Secrets. Showing helpful guide.");
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "bot",
          text: "I experienced a slight connection hiccup while accessing the main server. Please make sure the backend is active, or reach out to us directly at (352) 942-5438!",
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleStarterClick = (query: string) => {
    setInputValue(query);
  };

  return (
    <div className="fixed bottom-6 right-6 z-55 flex flex-col items-end font-sans">
      {/* Scroll-trigger floating helper banner */}
      <AnimatePresence>
        {!isOpen && messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="mb-3 mr-2 glassmorphism px-4 py-2 text-xs rounded-lg text-emerald-300 flex items-center gap-2 max-w-xs shadow-neon-emerald"
          >
            <Sparkles className="w-3 H-3 text-emerald-400 shrink-0" />
            <span>Chat live with our AI Sanctuary Guide!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.90 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.90 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-[360px] sm:w-[400px] h-[520px] max-h-[calc(100vh-120px)] rounded-2xl glassmorphism shadow-2xl flex flex-col overflow-hidden mb-4 border border-emerald-500/20"
            id="ai-chatbot-window"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/90 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-neon-emerald">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-slate-100 flex items-center gap-1.5 font-display">
                    Sanctuary AI Assist
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 tracking-wider">SECURE LIVE LINK</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors"
                id="close-chat-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Warning bar if key is missing */}
            {showWarning && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-start gap-2 text-[11px] text-amber-300">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Config Warning</strong>: GEMINI_API_KEY secret is not populated. Returning offline information fallback.
                </span>
              </div>
            )}

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs inline-block leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white rounded-br-none shadow-neon-emerald"
                        : "bg-slate-900/90 text-slate-200 border border-white/5 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    
                    {/* Tiny UTC status marker */}
                    <div className="mt-1 text-[8px] opacity-40 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/90 text-slate-200 border border-white/5 rounded-xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sparkle Starters (helpful buttons) if only introductory message is present */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-white/5 bg-slate-950/20 flex flex-wrap gap-1.5">
                {[
                  "🐶 How do I adopt?",
                  "💖 Tell me about sponsoring Copper",
                  "🌿 Can I rehab wildlife?",
                  "📍 Where is Homosassa, FL?"
                ].map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStarterClick(starter.substring(2))}
                    className="text-[10px] text-emerald-400/95 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/15 rounded-full px-2.5 py-1 transition-all cursor-pointer"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-900/95 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about adoption, volunteering, or donating..."
                className="flex-1 bg-slate-950 border border-white/5 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none placeholder-slate-500 focus:ring-1 focus:ring-emerald-500/20"
                id="chat-input-field"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-3 flex items-center justify-center transition-all shadow-neon-emerald cursor-pointer"
                id="send-chat-submit"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="text-white w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-xl hover:shadow-neon-emerald-lg border border-emerald-400/20 transition-all cursor-pointer relative"
        id="chatbot-trigger-bubble"
      >
        <span className="absolute -top-1 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
        </span>
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
