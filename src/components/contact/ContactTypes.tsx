import { useEffect, useId, useState, useCallback } from "react";
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
  const [justSubmitted, setJustSubmitted] = useState(false);

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

  // Reset success banner when switching tabs
  useEffect(() => {
    setJustSubmitted(false);
  }, [formKind]);

  // success message
  const renderSuccess = () =>
    (state.succeeded || justSubmitted) && (
      <p
        className="md:col-span-2 text-center text-[var(--secondary-cream)] animate-slide-down"
        aria-live="polite"
      >
        {t("contact.successMessage", "Thanks — we’ll be in touch shortly!")}
      </p>
    );

  // Accessible IDs for the tab panel
  const panelId = `panel-${formKind}`;
  const tabId = `tab-${formKind}`;

  // Submit wrapper to reset the form on success and announce it
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    const res = await handleSubmit(e);
    // Formspree v2 returns { response: { ok: boolean } }
    // @ts-ignore
    if (res?.response?.ok) {
      (e.currentTarget as HTMLFormElement).reset();
      setJustSubmitted(true);
    }
  };

  // Normalize Formspree errors to an array and check by field name
  const hasFieldError = useCallback((field: string): boolean => {
    const errs = (state as any)?.errors;
    if (!errs) return false;
    if (Array.isArray(errs)) {
      return errs.some((err: { field?: string }) => err?.field === field);
    }
    return (errs as { field?: string }).field === field;
  }, [state.errors]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className={`w-full bg-[var(--primary-black)] text-theme px-6 py-10 ${fontClass}`}
    >
      {/* Title */}
      <h2 className="sr-only">{t("contact.title")}</h2>

      {/* ───────── Tabs ───────── */}
      <div className="max-w-5xl mx-auto mb-6 text-center">
        <div
          role="tablist"
          aria-label={t("contact.title")}
          className="flex flex-wrap justify-center gap-4"
        >
          {(Object.keys(TAB_LABELS) as FormKind[]).map((key) => (
            <button
              key={key}
              id={`tab-${key}`}
              role="tab"
              aria-selected={formKind === key}
              aria-controls={`panel-${key}`}
              tabIndex={formKind === key ? 0 : -1}
              onClick={() => setFormKind(key)}
              className={
                "border border-theme px-4 py-2 rounded-lg text-sm md:text-lg transition cursor-pointer" +
                (formKind === key
                  ? " bg-theme text-[var(--primary-black)]"
                  : " text-theme bg-transparent hover:shadow-[inset_0_0_20px_rgba(234,100,46,0.6)] hover:text-[var(--primary-black)]")
              }
            >
              {TAB_LABELS[key]}
            </button>
          ))}
        </div>

        {formKind === "join" && (
          <p className="inline-block mt-4 px-4 py-2 rounded-md bg-gray-700 text-sm text-white">
            {t("contact.join.note")}
          </p>
        )}
      </div>

      {/* ───────── Form ───────── */}
      <form
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        onSubmit={onSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Screen reader live region for status */}
        <div className="sr-only" aria-live="polite">
          {state.submitting
            ? t("contact.status.submitting", "Submitting…")
            : state.succeeded || justSubmitted
            ? t("contact.successMessage", "Thanks — we’ll be in touch shortly!")
            : ""}
        </div>

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
          baseInput={baseInput}
          fontClass={fontClass}
          state={state}
          hasFieldError={hasFieldError}
        />

        <Field
          label={t(`contact.${formKind}.number`)}
          name="phone"
          placeholder={t("contact.placeholders.phone", "050 000 0000")}
          type="tel"
          inputMode="tel"
          pattern="^[0-9+\-\s()]{6,}$"
          baseInput={baseInput}
          fontClass={fontClass}
          state={state}
          hasFieldError={hasFieldError}
        />

        <Field
          label={t(`contact.${formKind}.email`)}
          name="email"
          placeholder={t("contact.placeholders.email", "example@email.com")}
          type="email"
          baseInput={baseInput}
          fontClass={fontClass}
          state={state}
          hasFieldError={hasFieldError}
          className={formKind === "clients" ? "" : "md:col-span-2"}
        />

        {/* Clients */}
        {formKind === "clients" && (
          <>
            <Field
              label={t("contact.clients.organization")}
              name="organization"
              placeholder={t("contact.placeholders.organization")}
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
              className="md:col-span-1"
            />

            <Select
              label={t("contact.clients.sector")}
              name="sector"
              list={
                t("contact.options.sectors", {
                  returnObjects: true,
                }) as string[]
              }
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
            />
            <Select
              label={t("contact.clients.campaign")}
              name="campaign"
              list={
                t("contact.options.campaignTypes", {
                  returnObjects: true,
                }) as string[]
              }
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
            />
            <Select
              label={t("contact.clients.scope")}
              name="scope"
              list={t("contact.options.scopes", { returnObjects: true }) as string[]}
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
            />

            <Field
              label={t("contact.clients.budget")}
              name="budget"
              placeholder={t("contact.placeholders.budget")}
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
              className="md:col-span-1"
            />

            <TextArea
              label={t("contact.clients.message")}
              name="message"
              placeholder={t("contact.placeholders.message")}
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
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
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
            />
            <Field
              label={t("contact.vendors.possession")}
              name="possession"
              placeholder={t("contact.placeholders.possession")}
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
            />
            <Field
              label={t("contact.vendors.profile")}
              name="profile"
              placeholder={t("contact.placeholders.profile")}
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
              className="md:col-span-2"
            />
            <Field
              label={t("contact.vendors.partnership")}
              name="partnership"
              placeholder={t("contact.placeholders.partnership")}
              baseInput={baseInput}
              fontClass={fontClass}
              state={state}
              hasFieldError={hasFieldError}
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
            baseInput={baseInput}
            fontClass={fontClass}
            state={state}
            hasFieldError={hasFieldError}
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
}

/* ───────── Helper Components ───────── */

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  className?: string;
  baseInput: string;
  fontClass: string;
  state: ReturnType<typeof useForm>[0];
  hasFieldError: (field: string) => boolean;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  inputMode,
  pattern,
  className = "",
  baseInput,
  fontClass,
  state,
  hasFieldError,
}: FieldProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1 ${className} ${fontClass}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className={baseInput}
        inputMode={inputMode}
        pattern={pattern}
        aria-invalid={hasFieldError(name) ? true : undefined}
      />
      <ValidationError prefix={label} field={name} errors={state.errors} />
    </div>
  );
}

type SelectProps = {
  label: string;
  name: string;
  list: string[];
  className?: string;
  baseInput: string;
  fontClass: string;
  state: ReturnType<typeof useForm>[0];
  hasFieldError: (field: string) => boolean;
};

function Select({
  label,
  name,
  list,
  className = "",
  baseInput,
  fontClass,
  state,
  hasFieldError,
}: SelectProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1 ${className} ${fontClass}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={`cursor-pointer ${baseInput}`}
        aria-invalid={hasFieldError(name) ? true : undefined}
      >
        <option value="" disabled>
          {label.replace("*", "")}
        </option>
        {list.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
      <ValidationError prefix={label} field={name} errors={state.errors} />
    </div>
  );
}

type TextAreaProps = {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
  baseInput: string;
  fontClass: string;
  state: ReturnType<typeof useForm>[0];
  hasFieldError: (field: string) => boolean;
};

function TextArea({
  label,
  name,
  placeholder,
  className = "",
  baseInput,
  fontClass,
  state,
  hasFieldError,
}: TextAreaProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1 md:col-span-2 ${className} ${fontClass}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        rows={4}
        required
        placeholder={placeholder}
        className={baseInput}
        aria-invalid={hasFieldError(name) ? true : undefined}
      />
      <ValidationError prefix={label} field={name} errors={state.errors} />
    </div>
  );
}
