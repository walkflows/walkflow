"use client";

import { useId, useState, type FormEvent } from "react";
import { contactForm, contactMethodOptions } from "@/content/contact";
import { ButtonEl } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";
import { EnquiryNotConfiguredError, submitEnquiry, type EnquiryPayload } from "@/lib/enquiry";

type Values = {
  name: string;
  email: string;
  company: string;
  message: string;
  role: string;
  website: string;
  method: EnquiryPayload["method"];
  /** Honeypot — left blank by humans, often filled by bots. Never shown, never validated as a real field. */
  hpField: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  company: "",
  message: "",
  role: "",
  website: "",
  method: "email",
  hpField: "",
};

type FieldErrors = Partial<Record<"name" | "email" | "company" | "message", string>>;

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 transition-[border-color,box-shadow] duration-200 ease-out focus:border-orange/60 focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,153,28,0.15)] aria-[invalid=true]:border-red-400/60";
const labelClass = "block text-sm font-semibold text-white/80";

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const idPrefix = useId();

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(v: Values): FieldErrors {
    const next: FieldErrors = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!v.email.trim()) next.email = "Please enter your business email.";
    else if (!EMAIL_RE.test(v.email.trim())) next.email = "Please enter a valid email address.";
    if (!v.company.trim()) next.company = "Please enter your company name.";
    if (!v.message.trim()) next.message = "Let us know what's slowing your business down.";
    return next;
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
        message: values.message.trim(),
        role: values.role.trim(),
        website: values.website.trim(),
        method: values.method,
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

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-message`}>
          {contactForm.fields.message.label}
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
        {errors.message && (
          <p id={`${idPrefix}-message-error`} className="mt-1.5 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

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
                  onChange={() => update("method", option.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                {option.label}
              </label>
            );
          })}
        </div>
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

function Field({
  id,
  label,
  placeholder,
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
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        maxLength={300}
        className={cx(fieldClass, "mt-2")}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
