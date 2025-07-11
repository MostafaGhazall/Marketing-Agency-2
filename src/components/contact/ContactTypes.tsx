import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "react-i18next";

export default function ClientsOnlyForm() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  // Formspree endpoint for clients
  const [state, handleSubmit] = useForm("myzwrlke");

  const baseInput =
    "w-full rounded-md px-4 py-3 bg-[var(--secondary-white)] " +
    "text-[var(--primary-black)] placeholder:text-gray-500 " +
    "border border-transparent focus:outline-none " +
    "focus:ring-2 focus:ring-[var(--secondary-orange)]";

  return (
    <section
      className={`w-full bg-[var(--primary-black)] text-theme px-6 py-10 ${fontClass}`}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
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
          label={t("contact.clients.name")}
          name="name"
          placeholder={t("contact.placeholders.name")}
          className="md:col-span-1"
        />
        <Field
          label={t("contact.clients.number")}
          name="phone"
          placeholder={t("contact.placeholders.phone", "050 000 0000")}
          type="tel"
          className="md:col-span-1"
        />
        <Field
          label={t("contact.clients.email")}
          name="email"
          placeholder={t("contact.placeholders.email", "email@example.com")}
          type="email"
          className="md:col-span-1"
        />
        <Field
          label={t("contact.clients.organization")}
          name="organization"
          placeholder={t("contact.placeholders.organization")}
          className="md:col-span-1"
        />

        <Select
          label={t("contact.clients.sector")}
          name="sector"
          list={
            t("contact.options.sectors", { returnObjects: true }) as string[]
          }
        />
        <Select
          label={t("contact.clients.campaign")}
          name="campaign"
          list={
            t("contact.options.campaignTypes", {
              returnObjects: true,
            }) as string[]
          }
        />
        <Select
          label={t("contact.clients.scope")}
          name="scope"
          list={
            t("contact.options.scopes", { returnObjects: true }) as string[]
          }
        />

        {/* budget now a text input and required */}
        <Field
          label={t("contact.clients.budget")}
          name="budget"
          placeholder={t("contact.placeholders.budget")}
          className="md:col-span-1"
        />

        <TextArea
          label={t("contact.clients.message")}
          name="message"
          placeholder={t("contact.placeholders.message")}
          className="md:col-span-2"
        />

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full rounded-md bg-[var(--secondary-orange)] py-3 text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 md:col-span-2 cursor-pointer"
        >
          {t("contact.clients.send")}
        </button>
      </form>
      <div className="max-w-3xl mx-auto">
        {state.succeeded && (
          <p className="text-center text-[var(--secondary-cream)] mt-4">
            {t("contact.successMessage", "Thanks — we’ll be in touch shortly!")}
          </p>
        )}
      </div>
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
      <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-theme">{label}</label>
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

  function Select({
    label,
    name,
    list,
    className = "",
  }: {
    label: string;
    name: string;
    list: string[];
    className?: string;
  }) {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-theme">{label}</label>
        <select
          name={name}
          required
          className={baseInput + " cursor-pointer"}
          defaultValue=""
        >
          <option value="" disabled>
            {t("contact.placeholders.select", "Select...")}
          </option>
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
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
      <div className={`flex flex-col gap-1 ${className}`}>
        <label className="font-medium text-theme">{label}</label>
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          className={baseInput}
        />
        <ValidationError prefix={label} field={name} errors={state.errors} />
      </div>
    );
  }
}
