"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  contactForm,
  contactIndustryOptions,
  contactMethodOptions,
  contactPage,
  contactServiceOptions,
  contactTimingOptions,
} from "@/content/contact";
import { ButtonEl } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";
import { EnquiryNotConfiguredError, submitEnquiry, type EnquiryPayload } from "@/lib/enquiry";

type Values = {
  name: string;
  email: string;
  company: string;
  service: string;
  industry: string;
  otherIndustry: string;
  timing: string;
  message: string;
  role: string;
  website: string;
  method: EnquiryPayload["method"];
  whatsappNumber: string;
  /** Honeypot — left blank by humans, often filled by bots. Never shown, never validated as a real field. */
  hpField: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  company: "",
  service: "",
  industry: "",
  otherIndustry: "",
  timing: "",
  message: "",
  role: "",
  website: "",
  method: "email",
  whatsappNumber: "",
  hpField: "",
};

type FieldErrors = Partial<
  Record<"name" | "email" | "company" | "service" | "industry" | "otherIndustry" | "timing" | "message" | "whatsappNumber", string>
>;

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Sensible international phone check: an optional leading +, then 7–15 digits (E.164's max length),
// with spaces/dashes/parentheses allowed for readability but stripped before counting.
const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 transition-[border-color,box-shadow] duration-200 ease-out focus:border-orange/60 focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,153,28,0.15)] aria-[invalid=true]:border-red-400/60";
const labelClass = "block text-sm font-semibold text-white/80";
const helperClass = "mt-1.5 text-sm text-white/50";

/** Small triangle-exclamation mark shown beside every error, so the error is never signalled by colour alone. */
function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-0.5 flex-none">
      <path
        d="M7 1.3 13 12H1L7 1.3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M7 5.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="10.3" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm text-red-400">
      <ErrorIcon />
      <span>{children}</span>
    </p>
  );
}

export function ContactForm() {
  // Preselects the service dropdown when arriving via a "Request a Call"
  // link that names a service (e.g. /contact?service=web-design), such as
  // the ones on each Services page. Falls back to unselected for an
  // unrecognised or missing value rather than guessing.
  const searchParams = useSearchParams();
  const preselectedService = (() => {
    const param = searchParams.get("service");
    return contactServiceOptions.some((option) => option.value === param) ? (param as string) : "";
  })();

  const [values, setValues] = useState<Values>(() => ({ ...initialValues, service: preselectedService }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();
  const reduceMotion = useReducedMotion();

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(v: Values): FieldErrors {
    const next: FieldErrors = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!v.email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(v.email.trim())) next.email = "Please enter a valid email address.";
    if (!v.company.trim()) next.company = "Please enter your company name.";
    if (!v.service.trim()) next.service = "Please select a service.";
    if (!v.industry.trim()) next.industry = "Please select your industry.";
    else if (v.industry === "other" && !v.otherIndustry.trim()) next.otherIndustry = "Please specify your industry.";
    if (!v.timing.trim()) next.timing = "Please select a timeframe.";
    if (!v.message.trim()) next.message = "Let us know what's slowing your business down.";
    if (v.method === "whatsapp") {
      const digitsOnly = v.whatsappNumber.replace(/[^0-9]/g, "");
      if (!v.whatsappNumber.trim()) next.whatsappNumber = "Please enter your WhatsApp number.";
      else if (!PHONE_RE.test(v.whatsappNumber.trim()) || digitsOnly.length < 7 || digitsOnly.length > 15) {
        next.whatsappNumber = "Please enter a valid phone number, including your country code.";
      }
    }
    return next;
  }

  function handleMethodChange(method: EnquiryPayload["method"]) {
    setValues((v) => ({ ...v, method, whatsappNumber: method === "whatsapp" ? v.whatsappNumber : "" }));
    // Clear a stale WhatsApp-number error the moment the field is hidden again.
    setErrors((e) => (method === "whatsapp" ? e : { ...e, whatsappNumber: undefined }));
  }

  function handleIndustryChange(industry: string) {
    setValues((v) => ({ ...v, industry, otherIndustry: industry === "other" ? v.otherIndustry : "" }));
    // Clear a stale "please specify" error/requirement the moment the field is hidden again.
    setErrors((e) => (industry === "other" ? e : { ...e, otherIndustry: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: a bot filled a field real visitors never see — quietly drop it, no error shown.
    if (values.hpField.trim()) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitEnquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        service: values.service,
        industry: values.industry,
        ...(values.industry === "other" ? { otherIndustry: values.otherIndustry.trim() } : {}),
        timing: values.timing,
        message: values.message.trim(),
        role: values.role.trim(),
        website: values.website.trim(),
        method: values.method,
        ...(values.method === "whatsapp" ? { whatsappNumber: values.whatsappNumber.trim() } : {}),
      });
      setStatus("success");
      setValues(initialValues);
      setErrors({});
    } catch (err) {
      setStatus(err instanceof EnquiryNotConfiguredError ? "unconfigured" : "error");
    }
  }

  if (status === "success") {
    return (
      <Reveal>
        <div className="rounded-3xl border border-orange/25 bg-orange/[0.06] p-8 text-center sm:p-10">
          <p className="text-xl font-semibold text-white">{contactForm.successHeading}</p>
          <p className="mt-2 leading-relaxed text-white/70">{contactForm.successBody}</p>
        </div>
      </Reveal>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <p className="text-sm text-white/50">{contactPage.requiredNote}</p>

      {/* Honeypot field — hidden from sighted and screen-reader users alike, never a real form field. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor={`${idPrefix}-hp`}>Leave this field empty</label>
        <input
          id={`${idPrefix}-hp`}
          name="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.hpField}
          onChange={(e) => update("hpField", e.target.value)}
        />
      </div>

      <Field
        id={`${idPrefix}-name`}
        label={contactForm.fields.name.label}
        placeholder={contactForm.fields.name.placeholder}
        value={values.name}
        onChange={(v) => update("name", v)}
        error={errors.name}
        required
        autoComplete="name"
      />

      <Field
        id={`${idPrefix}-email`}
        label={contactForm.fields.email.label}
        placeholder={contactForm.fields.email.placeholder}
        helperText={contactForm.fields.email.helperText}
        value={values.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        required
        type="email"
        autoComplete="email"
      />

      <Field
        id={`${idPrefix}-company`}
        label={contactForm.fields.company.label}
        placeholder={contactForm.fields.company.placeholder}
        value={values.company}
        onChange={(v) => update("company", v)}
        error={errors.company}
        required
        autoComplete="organization"
      />

      <Field
        id={`${idPrefix}-role`}
        label={contactForm.fields.role.label}
        placeholder={contactForm.fields.role.placeholder}
        value={values.role}
        onChange={(v) => update("role", v)}
        autoComplete="organization-title"
      />

      <Field
        id={`${idPrefix}-website`}
        label={contactForm.fields.website.label}
        placeholder={contactForm.fields.website.placeholder}
        value={values.website}
        onChange={(v) => update("website", v)}
        autoComplete="url"
      />

      <Select
        id={`${idPrefix}-service`}
        label={contactForm.fields.service.label}
        placeholder={contactForm.fields.service.placeholder}
        value={values.service}
        onChange={(v) => update("service", v)}
        options={contactServiceOptions}
        error={errors.service}
        required
      />

      <div>
        <Select
          id={`${idPrefix}-industry`}
          label={contactForm.fields.industry.label}
          placeholder={contactForm.fields.industry.placeholder}
          value={values.industry}
          onChange={handleIndustryChange}
          options={contactIndustryOptions}
          error={errors.industry}
          required
        />

        <AnimatePresence initial={false}>
          {values.industry === "other" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <Field
                  id={`${idPrefix}-other-industry`}
                  label={contactForm.fields.otherIndustry.label}
                  placeholder={contactForm.fields.otherIndustry.placeholder}
                  value={values.otherIndustry}
                  onChange={(v) => update("otherIndustry", v)}
                  error={errors.otherIndustry}
                  required
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Select
        id={`${idPrefix}-timing`}
        label={contactForm.fields.timing.label}
        placeholder={contactForm.fields.timing.placeholder}
        value={values.timing}
        onChange={(v) => update("timing", v)}
        options={contactTimingOptions}
        error={errors.timing}
        required
      />

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-message`}>
          {contactForm.fields.message.label} <span aria-hidden="true" className="text-orange">*</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder={contactForm.fields.message.placeholder}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
          className={cx(fieldClass, "mt-2 resize-y")}
        />
        {errors.message && <ErrorText id={`${idPrefix}-message-error`}>{errors.message}</ErrorText>}
      </div>

      <fieldset>
        <legend className={labelClass}>{contactForm.fields.method.label}</legend>
        <div className="mt-2 inline-flex rounded-xl border border-white/15 bg-white/[0.04] p-1">
          {contactMethodOptions.map((option) => {
            const checked = values.method === option.value;
            return (
              <label
                key={option.value}
                className={cx(
                  "relative cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold transition-colors duration-200 ease-out",
                  checked ? "bg-orange text-navy" : "text-white/60 hover:text-white",
                )}
              >
                <input
                  type="radio"
                  name="method"
                  value={option.value}
                  checked={checked}
                  onChange={() => handleMethodChange(option.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                {option.label}
              </label>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {values.method === "whatsapp" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <label className={labelClass} htmlFor={`${idPrefix}-whatsapp`}>
                  {contactForm.fields.whatsappNumber.label} <span aria-hidden="true" className="text-orange">*</span>
                </label>
                <input
                  id={`${idPrefix}-whatsapp`}
                  name="whatsappNumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder={contactForm.fields.whatsappNumber.placeholder}
                  value={values.whatsappNumber}
                  onChange={(e) => update("whatsappNumber", e.target.value)}
                  aria-invalid={Boolean(errors.whatsappNumber)}
                  aria-describedby={cx(
                    `${idPrefix}-whatsapp-helper`,
                    errors.whatsappNumber && `${idPrefix}-whatsapp-error`,
                  )}
                  maxLength={24}
                  className={cx(fieldClass, "mt-2")}
                />
                <p id={`${idPrefix}-whatsapp-helper`} className={helperClass}>
                  {contactForm.fields.whatsappNumber.helperText}
                </p>
                {errors.whatsappNumber && <ErrorText id={`${idPrefix}-whatsapp-error`}>{errors.whatsappNumber}</ErrorText>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>

      {status === "unconfigured" && (
        <p role="status" className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
          {contactForm.unconfiguredBody}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="rounded-2xl border border-red-400/25 bg-red-400/[0.06] p-4 text-sm leading-relaxed text-red-300">
          {contactForm.errorBody}
        </p>
      )}

      <ButtonEl type="submit" disabled={submitting} className="self-start">
        {submitting ? contactForm.submittingLabel : contactForm.submitLabel}
      </ButtonEl>
    </form>
  );
}

/** Shared markup for every plain `<select>` field — service, industry, timing. */
function Select({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
  error,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  error?: string;
  required?: boolean;
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label} {required && <span aria-hidden="true" className="text-orange">*</span>}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cx(fieldClass, "appearance-none pr-10", value === "" && "text-white/35")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-navy-deep">
              {option.label}
            </option>
          ))}
        </select>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
        >
          <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <ErrorText id={errorId!}>{error}</ErrorText>}
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  helperText,
  value,
  onChange,
  error,
  required,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label} {required && <span aria-hidden="true" className="text-orange">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={cx(helperId, errorId) || undefined}
        autoComplete={autoComplete}
        maxLength={300}
        className={cx(fieldClass, "mt-2")}
      />
      {helperText && (
        <p id={helperId} className={helperClass}>
          {helperText}
        </p>
      )}
      {error && <ErrorText id={errorId!}>{error}</ErrorText>}
    </div>
  );
}
