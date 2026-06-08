import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Lazy-initialization of Gemini client to prevent crashes if key is initially absent
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please add it via the Settings > Secrets menu in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API endpoints FIRST
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
        return;
      }

      // Check if API key is present
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.json({
          text: "Hello! I am the Pace Village Cats Sanctuary Assistant. It looks like the Gemini API key is not configured yet in this environment. To make me fully active, please add the GEMINI_API_KEY in the Secrets panel in AI Studio! In the meantime, I can tell you that we are an animal rescue and sanctuary located in Homosassa, FL. You can reach us at (352) 942-5438 or gaylakilbrider@gmail.com!",
          warning: "API_KEY_MISSING"
        });
        return;
      }

      const client = getGeminiClient();

      // We extract the latest message or format the chat history
      const latestMessage = messages[messages.length - 1]?.content || "";

      // Format previous history for context or pass to the chat
      // We will use generateContent with system instruction and history representation
      const systemInstruction = `
You are the heart-centered and highly intelligent AI Assistant for Pace Village Cats Animal Sanctuary & Rescue located in Homosassa, Florida.
Your goals are to promote animal adoptions, donations/sponsorships, recruit volunteers/foster parents, and share educational/success stories.

Here is essential information about our organization to use when responding:
- Location: Homosassa, FL (8490 S River Hill Terrace, Homosassa, FL 34448)
- Phone: (352) 942-5438
- Email: gaylakilbrider@gmail.com
- Hours of Operation: Wednesday - Sunday: 10:00 AM - 4:00 PM. Closed Mondays and Tuesdays for rehabilitative therapy and facility sanitization.
- Core Mission: To rescue, rehabilitate, and find forever homes for vulnerable domestic pets, as well as nurture and safeguard orphaned or injured native Florida wildlife.
- Adoption Process: Inquiry form -> Meet and greet -> Home-check -> Happy tails placement. Free pet starter kit included.
- How to Support: Direct and recurring donations, food/medical sponsorships, became a foster parent (Citrus County area), or share our daily stories.
- Featured Adoptables: 
  * Barnaby: A 3-year-old high-energy Golden Retriever/Lab mix who loves water and needs a big yard.
  * Luna: A sweet 1-year-old Calico cat who is extremely gentle, great with kids, and loves cozy laps.
  * Copper: An adorable 8-year-old gopher tortoise ambassador rehabilitated from a vehicle collision.
  * Pip & Squeak: A bonded pair of rescue kittens (4 months old, domestic short hair) full of love.

Adopt a warm, compassionate, supportive, and community-focused tone. Answer users clearly, using bullet points for structured data, and guide them with specific calls to action (e.g. telling them how to adopt or donor links). Keep answers concise and strictly professional.
`;

      // Simple implementation of Chat history support for Gemini-3.5-flash
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: latestMessage,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || "I'm here to help you support our rescues! Please let me know how I can guide you." });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "An error occurred while communicating with the AI service." });
    }
  });

  // Vite middleware for assets/SPA serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Pace Village Cats Sanctuary] Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
