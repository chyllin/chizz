import { Resend } from 'resend';
import { welcomeEmailHTML } from './welcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (toEmail: string, name?: string): Promise<void> => {
  await resend.emails.send({
    from: 'ChizzDigital <hello@chizzdigital.com>',
    to: toEmail,
    subject: 'Welcome to ChizzDigital 👋',
    html: welcomeEmailHTML.replace('Dear Customer', `Dear ${name || 'Customer'}`),
    text: `Welcome to ChizzDigital! Thank you for reaching out, ${name || ''}. We offer CV templates, internship reports, application letters, and web/hosting services. Payments via Paystack (Ghana) or Stripe/PayPal (International). Reply to this email with any questions. — Maame Esi Appeagyei, Founder`,
  });
};

export { sendWelcomeEmail };