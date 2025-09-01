import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa6";

type Props = {
  /** E.164 number without + or 00, e.g. "9665XXXXXXXX" */
  phone: string;
  /** Optional pre-filled message */
  message?: string;
  /** Optional: force side; otherwise uses current language dir */
  side?: "left" | "right";
};

export default function FloatingWhatsApp({ phone, message = "Hello! 👋", side }: Props) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const positionSide = side ?? (isArabic ? "left" : "right");

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp chat"
      // fixed + safe-area bottom; high z-index; rounded; shadow
      className={`
        fixed z-[70]
        ${positionSide === "right" ? "right-4 md:right-6" : "left-4 md:left-6"}
        rounded-full shadow-xl
        bg-[#25D366] text-white
        w-14 h-14 md:w-16 md:h-16
        flex items-center justify-center
        transition-transform duration-200
        hover:-translate-y-0.5 active:scale-95
      `}
      style={{
        // iOS Safari home bar safe area; 16px base offset
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
      }}
    >
      <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
    </a>
  );
}
