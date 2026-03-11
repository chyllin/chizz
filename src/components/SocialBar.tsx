import { 
  FaFacebookF, 
  FaBloggerB, 
  FaSnapchat, 
  FaWhatsapp 
} from "react-icons/fa";
import "./socialBar.css";

export default function SocialBar() {
  return (
    <div className="social-bar">
      <div className="social-icons">

        {/* Facebook */}
        <a 
          href="https://www.facebook.com/share/1AtMG6jQGe/" 
          target="_blank" 
          rel="noreferrer"
          title="Facebook"
        >
          <FaFacebookF />
        </a>

        {/* Blogger */}
        <a 
          href="https://chizzblogger2.blogspot.com/" 
          target="_blank" 
          rel="noreferrer"
          title="Blogger"
        >
          <FaBloggerB />
        </a>

        {/* Snapchat */}
        <a 
          href="#" 
          target="_blank" 
          rel="noreferrer"
          title="Snapchat"
        >
          <FaSnapchat />
        </a>

        {/* WhatsApp Channel */}
        <a 
          href="https://whatsapp.com/channel/0029VbAJJKbDTkK4H8qkoD0V" 
          target="_blank" 
          rel="noreferrer"
          title="Join WhatsApp Channel"
        >
          <FaWhatsapp />
        </a>

      </div>

      {/* Direct WhatsApp Chat */}
      <a
        href="https://wa.me/233502927054"
        className="whatsapp-btn"
        target="_blank"
        rel="noreferrer"
      >
        <FaWhatsapp />
        Chat on WhatsApp
      </a>
    </div>
  );
}
