// Vercel Serverless Function (ESM): POST /api/verify-email
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// In-memory storage for verification codes (in production, use Redis or database)
// This should be the same instance as in send-verification.mjs
// In a real app, use Redis or database for shared storage
const verificationCodes = new Map();

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method === "GET") return res.status(200).json({ success: true, message: "verify-email alive" });
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const rawBody = req.body;
    const body = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : (rawBody || {});
    const { email, code } = body;
    
    if (!email || !code) {
      return res.status(400).json({ success: false, error: "Email и код обязательны" });
    }

    const storedData = verificationCodes.get(email);
    
    if (!storedData) {
      return res.status(400).json({ success: false, error: "Код не найден или истек" });
    }

    // Check if code is expired (10 minutes)
    const now = Date.now();
    const codeAge = now - storedData.timestamp;
    const tenMinutes = 10 * 60 * 1000;

    if (codeAge > tenMinutes) {
      verificationCodes.delete(email);
      return res.status(400).json({ success: false, error: "Код истек. Запросите новый код." });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ success: false, error: "Неверный код подтверждения" });
    }

    // Code is valid, remove it from storage
    verificationCodes.delete(email);

    return res.status(200).json({ success: true, message: "Email успешно подтвержден" });
  } catch (error) {
    console.error("verify-email error:", error);
    return res.status(500).json({ success: false, error: "Ошибка при проверке кода" });
  }
}
