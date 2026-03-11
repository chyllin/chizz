import "./legal.css";

export default function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Notice</h1>
        <p className="legal-date">Last updated: March 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            ChizzDigital ("we", "our", "us") is committed to protecting your personal information.
            This Privacy Notice explains how we collect, use, and safeguard your data when you use
            our website and services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul>
            <li><strong>Account data:</strong> Name, email address, and password when you register</li>
            <li><strong>Order data:</strong> Purchase history, items ordered, and payment references</li>
            <li><strong>Contact data:</strong> Phone number and email when you place an order or contact us</li>
            <li><strong>Usage data:</strong> How you interact with our website (pages visited, time spent)</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and updates</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Improve our website and services</li>
            <li>Send promotional communications (only with your consent)</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Storage & Security</h2>
          <p>
            Your data is stored securely using Supabase infrastructure with industry-standard
            encryption. We do not store your payment card details — all payments are handled
            securely by Paystack.
          </p>
        </section>

        <section>
          <h2>5. Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your
            data with trusted service providers (such as payment processors) only as necessary to
            deliver our services.
          </p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience. You can choose to
            disable cookies in your browser settings, though this may affect some functionality.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Withdraw consent for marketing communications at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us via WhatsApp at +233 502 927 054.</p>
        </section>

        <section>
          <h2>8. Changes to This Notice</h2>
          <p>
            We may update this Privacy Notice from time to time. We will notify you of significant
            changes by posting the new notice on this page with an updated date.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            For any privacy-related questions or concerns, please contact us via WhatsApp at
            +233 502 927 054 or through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}