import { GoogleGenAI, Chat } from "@google/genai";

// 1. FIX: Gunakan import.meta.env untuk Vite, bukan process.env
// Gunakan optional chaining (?.) agar tidak error jika env belum siap
const apiKey = import.meta.env?.VITE_API_KEY;

const SYSTEM_INSTRUCTION = `
You are "Ren", the AI Specialist for "Renewal", a premium shoe care business located in Balikpapan, Indonesia.
Your goal is to assist customers by diagnosing shoe issues and recommending the correct Renewal service package.

Services available (Currency: IDR / Rupiah):
1. "The Refresh" (Fast Clean) - Rp 15.000: Quick cleaning for daily dust on upper and midsole.
2. "The Deep Clean" (Premium) - Rp 25.000: Deep cleaning including insoles and laces, stain removal. Best for muddy or dirty shoes.
3. "The Revival" (Restoration) - Rp 45.000+: Special treatment for yellowing soles, suede renovation, or reglue/repair.

Additional Options:
- Drop off at Workshop: Gratis (Free).
- Antar Jemput (Pickup & Delivery): + Rp 5.000.

Payment Methods:
- QRIS (Scan)
- Tunai / Cash (Bayar ditempat)

Location: Jl. Kalimaya, Kelurahan Damai, Kecamatan Balikpapan Kota.
Contact: WhatsApp 08176468354.
Tone: Professional, minimalist, helpful, and concise. Use Indonesian slang slightly if the user is casual, otherwise standard English or Indonesian.
If you are unsure, ask for more details about the material (leather, suede, knit) or the specific damage.
Always end with a polite call to action to book the service using the form below.
`;

// 2. FIX: Lazy Loading. Variabel dimulai dengan null.
// AI tidak akan dinyalakan sampai user benar-benar butuh.
let chatSession: Chat | null = null;
let ai: GoogleGenAI | null = null;

export const initializeChat = (): void => {
  // Guard clause: Jika API Key tidak ada, stop di sini. Jangan crash.
  if (!apiKey) {
      console.warn("API Key is missing. Chat will not work.");
      return;
  }
  
  try {
    // Hanya buat instance jika belum ada
    if (!ai) {
      ai = new GoogleGenAI({ apiKey: apiKey });
    }
    
    // Hanya buat sesi chat jika belum ada
    if (!chatSession && ai) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    }
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Cek ketersediaan API Key sebelum mencoba kirim pesan
  if (!apiKey) {
      return "Maaf, fitur Chat AI belum aktif (API Key belum disetting di server). Silakan hubungi admin via WhatsApp.";
  }

  // Coba inisialisasi jika belum siap
  if (!chatSession) {
    initializeChat();
  }

  // Jika masih gagal inisialisasi
  if (!chatSession) {
      return "Maaf, sistem AI sedang tidak dapat diakses saat ini.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "Maaf, koneksi internet sedang gangguan. Silakan coba lagi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, saya sedang tidak bisa memproses permintaan Anda saat ini.";
  }
};