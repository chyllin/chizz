require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

/* ─── Welcome Email ─────────────────────────── */
const sendWelcomeEmail = async (toEmail, name) => {
  await resend.emails.send({
    from: "ChizzDigital <hello@chizzdigital.com>",
    to: toEmail,
    subject: "Welcome to ChizzDigital",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #ffffff; border: 1px solid #ede8df; border-radius: 12px;">
        
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; color: #0f172a; margin: 0;">ChizzDigital</h1>
          <div style="width: 50px; height: 3px; background: #c8a75e; margin: 10px auto 0;"></div>
        </div>

        <p style="font-size: 16px; color: #374151;">Dear ${name || "Customer"},</p>

        <p style="font-size: 15px; color: #4b5563; line-height: 1.8;">
          Thank you for joining <strong>ChizzDigital</strong>. We are excited to provide you 
          with professional digital and career solutions tailored to your needs.
        </p>

        <p style="font-size: 15px; color: #4b5563; line-height: 1.8;">At ChizzDigital, you can:</p>

        <ul style="color: #4b5563; font-size: 15px; line-height: 2;">
          <li>Purchase sleek <strong>CV templates</strong>, internship report samples, and application letters</li>
          <li>Book services such as <strong>hosting</strong>, domain setup, and website design</li>
        </ul>

        <p style="font-size: 15px; color: #4b5563; line-height: 1.8;">
          Payments can be made via <strong>Paystack</strong> (Ghana) or <strong>Stripe/PayPal</strong> (International).
        </p>

        <p style="font-size: 15px; color: #4b5563; line-height: 1.8;">
          If you have any questions, simply reply to this email — we're always happy to help.
        </p>

        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 15px; color: #0f172a; margin: 0;">Best regards,</p>
          <p style="font-size: 15px; font-weight: bold; color: #c8a75e; margin: 4px 0;">Maame Esi Appeagyei</p>
          <p style="font-size: 14px; color: #6b7280; margin: 0;">Founder, ChizzDigital</p>
        </div>

      </div>
    `,
  });
};

/* ─── Webhook: new user signup ───────────────── */
app.post("/webhook/new-user", async (req, res) => {
  const secret = req.headers["x-webhook-secret"];
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const record = req.body.record || req.body;
    const email = record.email;
    const name = record.raw_user_meta_data?.full_name || email.split("@")[0];

    if (!email) {
      return res.status(400).json({ error: "No email provided" });
    }

    await sendWelcomeEmail(email, name);
    console.log(`✅ Welcome email sent to ${email}`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Failed to send welcome email:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ─── Health check ───────────────────────────── */
app.get("/", (req, res) => {
  res.json({ status: "ChizzDigital server running" });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
