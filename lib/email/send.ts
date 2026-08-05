import nodemailer from "nodemailer";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(300),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
});

const rateLimit = new Map<string, number>();
const RATE_WINDOW_MS = 60_000;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const last = rateLimit.get(ip) ?? 0;
  if (now - last < RATE_WINDOW_MS) return false;
  rateLimit.set(ip, now);
  return true;
}

export async function sendFormEmail(type: "contact" | "careers", data: z.infer<typeof formSchema>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("SMTP not configured — skipping email send");
    return { ok: true, skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });

  const label = type === "contact" ? "Contato" : "Carreiras";
  const to =
    type === "contact"
      ? process.env.SMTP_TO_CONTACT ?? process.env.SMTP_TO ?? "talk@matilha.digital"
      : process.env.SMTP_TO_CAREERS ?? process.env.SMTP_TO ?? "pessoas@matilha.digital";
  const bcc = process.env.SMTP_BCC;

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? user,
    to,
    ...(bcc ? { bcc } : {}),
    replyTo: data.email,
    subject: `[Matilha — ${label}] ${data.subject}`,
    text: `Nome: ${data.name}\nEmail: ${data.email}\nAssunto: ${data.subject}\n\n${data.message}`,
    html: `<p><strong>Nome:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Assunto:</strong> ${data.subject}</p><hr/><p>${data.message.replace(/\n/g, "<br/>")}</p>`,
  });

  return { ok: true };
}
