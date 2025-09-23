// Vercel Serverless Function (ESM): POST /api/submit-order
import nodemailer from "nodemailer";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

const DEFAULT_EMAIL_USER = process.env.EMAIL_USER || "hamzateagle@gmail.com";
const DEFAULT_EMAIL_PASS = process.env.EMAIL_PASS || "mwzs mbig ntof idoz";
const DEFAULT_EMAIL_TO = process.env.EMAIL_TO || DEFAULT_EMAIL_USER;

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE } = process.env;
  if (SMTP_HOST && DEFAULT_EMAIL_USER && DEFAULT_EMAIL_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: String(SMTP_SECURE || "false").toLowerCase() === "true",
      auth: { user: DEFAULT_EMAIL_USER, pass: DEFAULT_EMAIL_PASS },
    });
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: DEFAULT_EMAIL_USER, pass: DEFAULT_EMAIL_PASS },
  });
}

function ownerNotificationText(orderData) {
  return `Новый заказ: ${orderData.productName} — ${orderData.productPrice}.\nПокупатель: ${orderData.name}, ${orderData.phone}, ${orderData.email}.\nАдрес: ${orderData.address}.\nДетали: ${orderData.orderDetails}`;
}

function customerConfirmationText(orderData) {
  return `Ваш заказ принят: ${orderData.productName} — ${orderData.productPrice}. Мы свяжемся в ближайшее время.`;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const { productName, productPrice, name, email, phone, address, orderDetails } = req.body || {};
    if (!productName || !productPrice || !name || !email || !phone || !address) {
      return res.status(400).json({ success: false, error: "Пожалуйста, заполните все обязательные поля" });
    }

    const orderData = {
      productName,
      productPrice,
      name,
      email,
      phone,
      address,
      orderDetails: orderDetails || "Нет дополнительных комментариев",
    };

    const transporter = createTransporter();

    const [ownerResult, customerResult] = await Promise.all([
      transporter.sendMail({
        from: `"MR.ING" <${DEFAULT_EMAIL_USER}>`,
        to: DEFAULT_EMAIL_TO,
        subject: "Новый заказ MR.ING",
        text: ownerNotificationText(orderData),
      }),
      transporter.sendMail({
        from: `"MR.ING" <${DEFAULT_EMAIL_USER}>`,
        to: orderData.email,
        subject: "✅ Ваш заказ в обработке - MR.ING",
        text: customerConfirmationText(orderData),
      }),
    ]);

    if (ownerResult.accepted.length === 0 || customerResult.accepted.length === 0) {
      console.warn("Some emails were not accepted by SMTP server");
    }

    return res.status(200).json({ success: true, message: "Заказ успешно оформлен! Письма отправлены." });
  } catch (error) {
    console.error("submit-order error:", error);
    return res.status(500).json({ success: false, error: "Ошибка при обработке заказа" });
  }
}


