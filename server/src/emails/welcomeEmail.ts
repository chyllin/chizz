const welcomeEmailHTML = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to ChizzDigital</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #f4f1ec;
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
      padding: 40px 16px;
    }

    .wrapper {
      max-width: 600px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      background-color: #0f1923;
      padding: 40px 48px 36px;
      border-radius: 4px 4px 0 0;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 180px; height: 180px;
      border-radius: 50%;
      background: rgba(212, 163, 87, 0.12);
    }

    .header::after {
      content: '';
      position: absolute;
      bottom: -60px; left: 20px;
      width: 120px; height: 120px;
      border-radius: 50%;
      background: rgba(212, 163, 87, 0.07);
    }

    .brand {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      color: #d4a357;
      letter-spacing: 0.5px;
    }

    .brand span {
      color: #ffffff;
    }

    .tagline {
      font-size: 12px;
      color: #8a8a8a;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 6px;
    }

    /* Body */
    .body {
      background-color: #ffffff;
      padding: 48px 48px 40px;
    }

    .greeting {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      color: #0f1923;
      margin-bottom: 20px;
    }

    .intro {
      font-size: 15px;
      color: #444;
      line-height: 1.75;
      margin-bottom: 32px;
    }

    /* Services */
    .section-label {
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #d4a357;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .services {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 32px;
    }

    .service-card {
      background: #f9f7f4;
      border-left: 3px solid #d4a357;
      padding: 14px 16px;
      border-radius: 0 4px 4px 0;
    }

    .service-card .icon {
      font-size: 18px;
      margin-bottom: 6px;
    }

    .service-card .title {
      font-size: 13px;
      font-weight: 500;
      color: #1a1a1a;
      margin-bottom: 2px;
    }

    .service-card .desc {
      font-size: 12px;
      color: #888;
      line-height: 1.4;
    }

    /* Payment */
    .payment-section {
      background: #0f1923;
      border-radius: 4px;
      padding: 20px 24px;
      margin-bottom: 32px;
    }

    .payment-section .section-label {
      color: #d4a357;
      margin-bottom: 14px;
    }

    .payment-options {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .payment-badge {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(212,163,87,0.25);
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 12px;
      color: #e8e0d0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .payment-badge .dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #d4a357;
      flex-shrink: 0;
    }

    /* CTA */
    .cta {
      text-align: center;
      margin-bottom: 36px;
    }

    .cta a {
      display: inline-block;
      background: #d4a357;
      color: #0f1923;
      text-decoration: none;
      font-weight: 500;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 14px 36px;
      border-radius: 2px;
    }

    .closing {
      font-size: 14px;
      color: #555;
      line-height: 1.7;
      border-top: 1px solid #f0ece4;
      padding-top: 28px;
    }

    .closing .name {
      font-family: 'Playfair Display', serif;
      font-size: 17px;
      color: #0f1923;
      margin-top: 12px;
      display: block;
    }

    .closing .role {
      font-size: 12px;
      color: #d4a357;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    /* Footer */
    .footer {
      background: #0f1923;
      padding: 20px 48px;
      border-radius: 0 0 4px 4px;
      text-align: center;
    }

    .footer p {
      font-size: 11px;
      color: #555;
      line-height: 1.6;
    }

    .footer a {
      color: #d4a357;
      text-decoration: none;
    }

    @media (max-width: 480px) {
      .header, .body { padding: 32px 28px; }
      .services { grid-template-columns: 1fr; }
      .footer { padding: 20px 28px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="brand"><span>Chizz</span>Digital</div>
      <div class="tagline">Professional Digital &amp; Career Solutions</div>
    </div>

    <!-- Body -->
    <div class="body">
      <div class="greeting">Welcome — we're glad you're here.</div>

      <p class="intro">
        Dear Customer,<br><br>
        Thank you for reaching out to ChizzDigital. We're here to help you put your best foot forward — whether you're launching a digital presence or leveling up your career documents. Below is a quick overview of what we offer and how to get started.
      </p>

      <!-- Services -->
      <div class="section-label">What We Offer</div>
      <div class="services">
        <div class="service-card">
          <div class="icon">📄</div>
          <div class="title">CV Templates</div>
          <div class="desc">Sleek, professional templates that make an impression</div>
        </div>
        <div class="service-card">
          <div class="icon">📋</div>
          <div class="title">Internship Reports</div>
          <div class="desc">Structured report samples ready to customize</div>
        </div>
        <div class="service-card">
          <div class="icon">✉️</div>
          <div class="title">Application Letters</div>
          <div class="desc">Compelling cover &amp; application letter templates</div>
        </div>
        <div class="service-card">
          <div class="icon">🌐</div>
          <div class="title">Web &amp; Hosting</div>
          <div class="desc">Domain setup, hosting, and website design services</div>
        </div>
      </div>

      <!-- Payments -->
      <div class="payment-section">
        <div class="section-label">Payment Options</div>
        <div class="payment-options">
          <div class="payment-badge"><span class="dot"></span> Paystack — Ghana</div>
          <div class="payment-badge"><span class="dot"></span> Stripe — International</div>
          <div class="payment-badge"><span class="dot"></span> PayPal — International</div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta">
        <a href="mailto:chizzdigital@gmail.com">Get in Touch →</a>
      </div>

      <!-- Closing -->
      <div class="closing">
        Have questions? Simply reply to this email — we're happy to help.<br><br>
        Warm regards,
        <span class="name">Maame Esi Appeagyei</span>
        <span class="role">Founder, ChizzDigital</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>You're receiving this email because you reached out to ChizzDigital.<br>
      Questions? Reply to this email or visit <a href="#">chizzdigital.com</a></p>
    </div>

  </div>
</body>
</html>
`;

export { welcomeEmailHTML };