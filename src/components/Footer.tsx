import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  return (
    <footer
      className={`bg-[var(--primary-black)] text-white ${fontClass} px-4 md:px-12 pt-12 pb-6`}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 md:grid md:grid-cols-3 md:items-start md:text-left md:gap-8 md:justify-between">
        {/* Address */}
        <div className="order-4 md:order-1 flex flex-col items-center md:items-start">
          <h4 className="text-xl font-semibold mb-2">
            {t("footer.addressTitle")}
          </h4>
          <p className="text-theme font-semibold mb-2">{t("footer.address")}</p>
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3804.1467459209443!2d44.22695278512139!3d17.54819868798244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDMyJzUzLjUiTiA0NMKwMTMnMjkuMiJF!5e0!3m2!1sar!2seg!4v1751117769233!5m2!1sar!2seg"
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
          <h4 className="text-xl font-semibold mb-2">
            {t("footer.socialTitle")}
          </h4>
          <div className="flex gap-4 text-theme text-xl">
            <a
              href="https://www.instagram.com/mashab.sa?igsh=bG00eTk4ZnlkN3Q1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@1mashab?_t=ZS-8xsVX2Kjv3H&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-white transition"
            >
              <FaTiktok />
            </a>
            <a
              href="mailto:mashabagency@gmail.com"
              aria-label="Email"
              className="hover:text-white transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Pages */}
        <div className="order-2 md:order-3 flex flex-col items-center md:items-end">
          <h4 className="text-xl font-semibold mb-2">
            {t("footer.pagesTitle")}
          </h4>
          <ul className="space-y-1 text-theme text-lg font-medium text-center md:text-right">
            <li>
              <Link to="/" className="hover:text-white transition">
                {t("footer.pages.home")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                {t("footer.pages.about")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                {t("footer.pages.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-sm text-white mt-12 text-center">
        © MASHAB. {t("footer.country")}
      </p>
    </footer>
  );
}
