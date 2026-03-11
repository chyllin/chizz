import * as functions from "firebase-functions/v1"; // 👈 Change this
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";
import { UserRecord } from "firebase-admin/auth";
admin.initializeApp();

sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

export const sendWelcomeEmail = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {


    if (!user.email) {
      console.log("User has no email.");
      return;
    }

    const msg = {
      to: user.email,
      from: "yourverifiedemail@yourdomain.com",
      subject: "Welcome to ChizzDigital",
      text: `
Dear Customer,

Thank you for your interest in ChizzDigital. We are excited to provide you with professional digital and career solutions tailored to your needs.

At ChizzDigital, you can purchase sleek CV templates, internship report samples, and application letters, or book services such as hosting, domain setup, and website design.

Payments can be made via Paystack (Ghana) or Stripe/PayPal (International).

If you have any questions, simply reply to this email.

Best regards,
Maame Esi Appeagyei
Founder, ChizzDigital
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("Welcome email sent to:", user.email);
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  });
