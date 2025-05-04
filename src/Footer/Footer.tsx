import {
  PiEnvelopeLight,
  PiPhoneCallLight,
  PiTelegramLogo,
} from "react-icons/pi";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__privacy">Privacy Policy</div>

        <ul className="footer__links">
          <li>
            <a href="" target="_blank">
              <PiTelegramLogo size={28} />
            </a>
          </li>
          <li>
            <a href="mailto:max567746@gmail.com">
              <PiEnvelopeLight size={28} />
            </a>
          </li>
          <li>
            <a href="tel:+79009323035">
              <PiPhoneCallLight size={28} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
