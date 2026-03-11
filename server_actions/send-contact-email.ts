"use server";

import nodemailer from "nodemailer";
import { BUSINESS } from "@/lib/general/constants";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials not configured");
      return { success: false, error: "Email service not configured" };
    }

    const { name, email, phone, subject, message } = data;

    await getTransporter().sendMail({
      from: `"${BUSINESS.name} Website" <${process.env.GMAIL_USER}>`,
      to: [BUSINESS.email],
      replyTo: email,
      subject: `[${subject}] — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #b4964f; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 100px;">Name</td>
              <td style="padding: 8px 12px;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px;">
                <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Phone</td>
              <td style="padding: 8px 12px;">${escapeHtml(phone || "—")}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Subject</td>
              <td style="padding: 8px 12px;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <h3 style="margin: 0 0 8px; color: #555;">Message</h3>
            <p style="margin: 0; white-space: pre-wrap; color: #333;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from ${BUSINESS.name} website contact form
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
