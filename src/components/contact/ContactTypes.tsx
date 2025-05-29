import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "react-i18next";

type FormKind = "clients" | "vendors" | "join";

const formEndpoints: Record<FormKind, string> = {
  clients: "myzwrlke",
  vendors: "your-formspree-endpoint-2",
  join: "your-formspree-endpoint-3",
};

export default function ContactTypes() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const [formKind, setFormKind] = useState<FormKind>("clients");
  const [state, handleSubmit] = useForm(formEndpoints[formKind]);

  // pull option lists from i18n (must be arrays in your JSON under contact.options)
  const sectors = t("contact.options.sectors", {
    returnObjects: true,
  }) as string[];
  const campaignTypes = t("contact.options.campaignTypes", {
    returnObjects: true,
  }) as string[];
  const scopes = t("contact.options.scopes", {
    returnObjects: true,
  }) as string[];
  const budgets = t("contact.options.budgets", {
    returnObjects: true,
  }) as string[];

  // base style for inputs
  const baseInput =
    "w-full rounded-md px-4 py-3 bg-[var(--secondary-white)] " +
    "text-[var(--primary-black)] placeholder:text-gray-500 " +
    "border border-transparent focus:outline-none " +
    "focus:ring-2 focus:ring-[var(--secondary-orange)]";

  // Tab labels
  const TAB_LABELS: Record<FormKind, string> = {
    clients: t("contact.types.clients"),
    vendors: t("contact.types.vendors"),
    join: t("contact.types.join"),
  };

  // success message
  const renderSuccess = () =>
    state.succeeded && (
      <p className="md:col-span-2 text-center text-[var(--secondary-cream)] animate-slide-down">
        {t("contact.successMessage", "Thanks — we’ll be in touch shortly!")}
      </p>
    );

  return (
    <section
      className={`
        w-full bg-[var(--primary-black)] text-theme px-6 py-10
        ${fontClass}
      `}
    >
      {/* Title */}
      <h2 className="sr-only">{t("contact.title")}</h2>

      {/* ───────── Tabs ───────── */}
      <div className="max-w-5xl mx-auto mb-6 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          {(Object.keys(TAB_LABELS) as FormKind[]).map((key) => (
            <button
              key={key}
              onClick={() => setFormKind(key)}
              className={
                "border border-theme px-4 py-2 rounded-lg text-sm md:text-lg transition cursor-pointer" +
                (formKind === key
                  ? " bg-[var(--primary-light)] text-[var(--primary-black)]"
                  : " text-theme bg-transparent hover:shadow-[inset_0_0_20px_rgba(255,238,212,0.6)] hover:text-[var(--primary-black)]")
              }
            >
              {TAB_LABELS[key]}
            </button>
          ))}
        </div>

        {formKind === "join" && (
          <p className="inline-block mt-4 px-4 py-2 rounded-md bg-gray-700 text-sm text-theme">
            {t("contact.join.note")}
          </p>
        )}
      </div>

      {/* ───────── Form ───────── */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Anti-spam: Honeypot */}
        <input
          type="text"
          name="_gotcha"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        {/* Common fields */}
        <Field
          label={t(`contact.${formKind}.name`)}
          name="name"
          placeholder={t("contact.placeholders.name")}
        />
        <Field
          label={t(`contact.${formKind}.number`)}
          name="phone"
          placeholder={t("contact.placeholders.phone", "050 000 0000")}
          type="tel"
        />
        <Field
          label={t(`contact.${formKind}.email`)}
          name="email"
          placeholder={t("contact.placeholders.email", "example@email.com")}
          type="email"
          className={formKind === "clients" ? "" : "md:col-span-2"}
        />

        {/* Clients */}
        {formKind === "clients" && (
          <>
            <Field
              label={t("contact.clients.organization")}
              name="organization"
              placeholder={t("contact.placeholders.organization")}
            />
            <Select
              label={t("contact.clients.sector")}
              name="sector"
              list={sectors}
            />
            <Select
              label={t("contact.clients.campaign")}
              name="campaign"
              list={campaignTypes}
            />
            <Select
              label={t("contact.clients.scope")}
              name="scope"
              list={scopes}
            />
            <Select
              label={t("contact.clients.budget")}
              name="budget"
              list={budgets}
            />
            <TextArea
              label={t("contact.clients.message")}
              name="message"
              placeholder={t("contact.placeholders.message")}
              className="md:col-span-2"
            />
          </>
        )}

        {/* Vendors */}
        {formKind === "vendors" && (
          <>
            <Field
              label={t("contact.vendors.organization")}
              name="organization"
              placeholder={t("contact.placeholders.organization")}
            />
            <Field
              label={t("contact.vendors.possession")}
              name="possession"
              placeholder={t("contact.placeholders.possession")}
            />
            <Field
              label={t("contact.vendors.profile")}
              name="profile"
              placeholder={t("contact.placeholders.profile")}
              className="md:col-span-2"
            />
            <Field
              label={t("contact.vendors.partnership")}
              name="partnership"
              placeholder={t("contact.placeholders.partnership")}
              className="md:col-span-2"
            />
          </>
        )}

        {/* Join */}
        {formKind === "join" && (
          <TextArea
            label={t("contact.join.message")}
            name="message"
            placeholder={t("contact.placeholders.message")}
            className="md:col-span-2"
          />
        )}

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full rounded-md bg-[var(--secondary-orange)] py-3 text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {t(`contact.${formKind}.send`)}
          </button>
        </div>

        {renderSuccess()}
      </form>
    </section>
  );

  // ───────── Helper Components ─────────

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
        <label>{label}</label>
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
        <label>{label}</label>
        <select
          name={name}
          required
          defaultValue=""
          className={`cursor-pointer ${baseInput}`}
        >
          <option value="" disabled>
            {label.replace("*", "")}
          </option>
          {list.map((v) => (
            <option key={v}>{v}</option>
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
      <div className={`flex flex-col gap-1 md:col-span-2 ${className}`}>
        <label>{label}</label>
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
