// Vercel Serverless Function (ESM): POST /api/send-verification
import nodemailer from "nodemailer";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

const DEFAULT_EMAIL_USER = process.env.EMAIL_USER || "hamzateagle@gmail.com";
const DEFAULT_EMAIL_PASS = process.env.EMAIL_PASS || "mwzs mbig ntof idoz";

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE } = process.env;
  if (SMTP_HOST && DEFAULT_EMAIL_USER && DEFAULT_EMAIL_PASS) {
    return nodemailer.createTransporter({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: String(SMTP_SECURE || "false").toLowerCase() === "true",
      auth: { user: DEFAULT_EMAIL_USER, pass: DEFAULT_EMAIL_PASS },
    });
  }
  return nodemailer.createTransporter({
    service: "gmail",
    auth: { user: DEFAULT_EMAIL_USER, pass: DEFAULT_EMAIL_PASS },
  });
}

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// In-memory storage for verification codes (in production, use Redis or database)
const verificationCodes = new Map();

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method === "GET") return res.status(200).json({ success: true, message: "send-verification alive" });
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const rawBody = req.body;
    const body = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : (rawBody || {});
    const { email } = body;
    
    if (!email) {
      return res.status(400).json({ success: false, error: "Email адрес обязателен" });
    }

    const code = generateVerificationCode();
    verificationCodes.set(email, { code, timestamp: Date.now() });

    const transporter = createTransporter();

    const result = await transporter.sendMail({
      from: `"MR.ING" <${DEFAULT_EMAIL_USER}>`,
      to: email,
      subject: "🔐 Код подтверждения - MR.ING",
      text: `Ваш код подтверждения: ${code}\n\nКод действителен в течение 10 минут.\n\nЕсли вы не запрашивали этот код, проигнорируйте это письмо.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">🔐 Код подтверждения</h2>
          <p style="font-size: 16px; color: #666;">Ваш код подтверждения для MR.ING:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <span style="font-size: 32px; font-weight: bold; color: #7c3aed; letter-spacing: 4px;">${code}</span>
          </div>
          <p style="font-size: 14px; color: #999;">Код действителен в течение 10 минут.</p>
          <p style="font-size: 14px; color: #999;">Если вы не запрашивали этот код, проигнорируйте это письмо.</p>
        </div>
      `
    });

    if (result.accepted.length === 0) {
      console.warn("Verification email was not accepted by SMTP server");
      return res.status(500).json({ success: false, error: "Не удалось отправить код подтверждения" });
    }

    return res.status(200).json({ success: true, message: "Код подтверждения отправлен на вашу почту" });
  } catch (error) {
    console.error("send-verification error:", error);
    return res.status(500).json({ success: false, error: "Ошибка при отправке кода подтверждения" });
  }
}
