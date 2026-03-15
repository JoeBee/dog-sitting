import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineSecret } from 'firebase-functions/params';
import * as nodemailer from 'nodemailer';

const GMAIL_USER = defineSecret('GMAIL_USER');
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD');

const ADMIN_EMAILS = ['JoeBeyer3@gmail.com', 'dinojbeyer@gmail.com'];

export const onFormSubmissionCreated = onDocumentCreated(
  {
    document: 'form_submissions/{submissionId}',
    region: 'us-central1',
    secrets: [GMAIL_USER, GMAIL_APP_PASSWORD],
  },
  async (event) => {
    const snap = event?.data;
    if (!snap) return;

    const data = snap.data();
    const name = data?.name ?? 'Unknown';
    const email = data?.email ?? '';
    const phone = data?.phone ?? '(not provided)';
    const message = data?.message ?? '';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER.value(),
        pass: GMAIL_APP_PASSWORD.value(),
      },
    });

    const websiteLink = 'https://dog-sitting-75312.web.app';
    const html = `
      <p><a href="${websiteLink}">${websiteLink}</a></p>
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: `TESTING - Jo Jo's Dog Sitting <${GMAIL_USER.value()}>`,
      to: ADMIN_EMAILS.join(', '),
      replyTo: email || undefined,
      subject: "TESTING - Jo Jo's Dog Sitting",
      html,
    });
  }
);

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
