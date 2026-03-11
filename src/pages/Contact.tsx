import SocialBar from "../components/SocialBar";
import "./contact.css";

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="container">
        <h2>Contact Us</h2>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Service Needed" />
          <textarea placeholder="Your Message" rows={5}></textarea>
          <button className="btn" type="submit">Send Message</button>
        </form>

        <SocialBar />
      </div>
    </section>
  );
}