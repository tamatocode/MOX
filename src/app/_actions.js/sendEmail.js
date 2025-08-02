"use server";
import { Resend } from "resend";

const resend = new Resend('re_RxJRWmKx_594t4iaHBniHj21ieKwmXfni');

export async function sendEmail({ from, to, subject, html }) {
  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message || "Failed to send email" };
  }
}