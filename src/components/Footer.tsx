import { Link } from "react-router-dom";
import {
  FaXTwitter,
  FaVimeoV,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-black)] text-white font-theme px-4 md:px-12 pt-12 pb-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 md:grid md:grid-cols-3 md:items-start md:text-left md:gap-8 md:justify-between">
        {/* Address */}
        <div className="order-4 md:order-1 flex flex-col items-center md:items-start">
          <h4 className="text-xl font-semibold mb-2">Address</h4>
          <p className="text-theme font-semibold mb-2">Alnuzha - Riyadh</p>
          <iframe
            title="location"
            src="https://www.google.com/maps?q=Alnuzha+Riyadh&output=embed"
            width="240"
            height="150"
            className="rounded-md border-none"
            loading="lazy"
          ></iframe>
        </div>

        {/* Logo + Socials */}
        <div className="order-1 md:order-2 flex flex-col items-center">
          <img
            src="/logo2.png"
            alt="MASHAB Logo"
            className="h-20 w-auto mb-10"
          />
          <h4 className="text-xl font-semibold mb-2">Social Accounts</h4>
          <div className="flex gap-4 text-theme text-xl">
            <a href="#" className="hover:text-white transition" aria-label="X Twitter">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-white transition" aria-label="Vimeo">
              <FaVimeoV />
            </a>
            <a href="#" className="hover:text-white transition" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Pages */}
        <div className="order-2 md:order-3 flex flex-col items-center md:items-end">
          <h4 className="text-xl font-semibold mb-2">Pages</h4>
          <ul className="space-y-1 text-theme text-lg font-medium text-center md:text-right">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About us
              </Link>
            </li>
            {/* <li>
              <Link to="/academy" className="hover:text-white transition">
                MASHAB Academy
              </Link>
            </li>
            <li>
              <Link to="/group" className="hover:text-white transition">
                The Group
              </Link>
            </li> */}
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-sm text-white mt-12 text-center">
        © MASHAB. Saudi Arabia - Riyadh
      </p>
    </footer>
  );
}
