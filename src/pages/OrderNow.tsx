import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ClientForm() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";
  const navigate = useNavigate();

  // Formspree endpoint for clients only
  const [state, handleSubmit] = useForm("myzwrlke");

  // Redirect to home after successful submission with delay
  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, navigate]);

  // Base style for inputs
  const baseInput =
    `w-full rounded-md ` +
    `px-[clamp(0.75rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,1rem)] ` +
    `bg-[var(--secondary-white)] text-[var(--primary-black)] placeholder:text-gray-500 ` +
    `border border-transparent focus:outline-none ` +
    `focus:ring-2 focus:ring-[var(--secondary-orange)]`;

  return (
    <section
      id="order"
      className={`
        min-h-screen flex flex-col justify-center
        bg-[var(--primary-black)] text-theme
        px-[clamp(1rem,5vw,3rem)] py-[clamp(2rem,5vw,4rem)]
        ${fontClass}
      `}
    >
      {/* Heading */}
      <h2 className="mb-[clamp(1.5rem,3vw,2rem)] text-center font-bold text-[clamp(1.5rem,4vw,2.5rem)] text-theme">
        {t("order.title")}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-screen-lg mx-auto
          grid grid-cols-1 md:grid-cols-2
          gap-[clamp(0.5rem,1vw,1rem)]"
      >
        {/* Honeypot anti-spam */}
        <input
          type="text"
          name="_gotcha"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <Field
          label={t("order.clients.name")}
          name="name"
          placeholder={t("order.placeholders.name")}
        />

        <Field
          label={t("order.clients.number")}
          name="phone"
          placeholder={t("order.placeholders.phone", "050 000 0000")}
          type="tel"
        />

        <Field
          label={t("order.clients.email")}
          name="email"
          placeholder={t("order.placeholders.email", "example@email.com")}
          type="email"
          className="md:col-span-1"
        />

        <Field
          label={t("order.clients.organization")}
          name="organization"
          placeholder={t("order.placeholders.organization")}
        />

        <TextArea
          label={t("order.clients.message")}
          name="message"
          placeholder={t("order.placeholders.message")}
          className="md:col-span-2"
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={state.submitting}
            className={`w-full rounded-md bg-[var(--secondary-orange)] py-[clamp(0.75rem,2vw,1rem)] transition-opacity disabled:opacity-50 cursor-pointer text-[clamp(1rem,2.5vw,1.25rem)] font-semibold text-white hover:opacity-90`}
          >
            {t("order.clients.send")}
          </button>
        </div>

        {state.succeeded && (
          <p className="md:col-span-2 text-center text-[var(--secondary-cream)] animate-slide-down text-[clamp(1rem,2vw,1.25rem)]">
            {t("order.successMessage", "Thanks — we’ll be in touch shortly! Redirecting...")}
          </p>
        )}
      </form>
    </section>
  );

  function Field({
    label,
    name,
    placeholder,
    type = "text",
    className = "",
  }: {
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    className?: string;
  }) {
    return (
      <div className={`flex flex-col gap-[clamp(0.5rem,1vw,1rem)] ${className} ${fontClass}`}>
        <label className="text-[clamp(1rem,2vw,1.25rem)]">{label}</label>
        <input
          type={type}
          name={name}
          required
          placeholder={placeholder}
          className={baseInput}
        />
        <ValidationError prefix={label} field={name} errors={state.errors} />
      </div>
    );
  }

  function TextArea({
    label,
    name,
    placeholder,
    className = "",
  }: {
    label: string;
    name: string;
    placeholder: string;
    className?: string;
  }) {
    return (
      <div className={`flex flex-col gap-[clamp(0.5rem,1vw,1rem)] md:col-span-2 ${className} ${fontClass}`}>
        <label className="text-[clamp(1rem,2vw,1.25rem)]">
          {label}
        </label>
        <textarea
          name={name}
          rows={4}
          required
          placeholder={placeholder}
          className={baseInput}
        />
        <ValidationError prefix={label} field={name} errors={state.errors} />
      </div>
    );
  }
}
