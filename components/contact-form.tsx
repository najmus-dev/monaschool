"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { buttonClass } from "./button-styles";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const fieldClass =
  "w-full rounded-[6px] border border-stroke bg-paper px-3 py-2.5 text-base text-ink outline-none transition-shadow focus:border-brand focus:shadow-[0_0_0_3px_rgb(10_53_82/0.15)]";

export function ContactForm() {
  const copy = site.ui.form;
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState("");
  const [draft, setDraft] = useState<string | null>(null);
  const [mailto, setMailto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    const nextEmail = email.trim();
    const nextPhone = phone.trim();
    const nextMessage = message.trim();
    const nextErrors: Errors = {};

    if (nextName.length < 2) {
      nextErrors.name = copy.nameError;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      nextErrors.email = copy.emailError;
    }
    if (nextPhone && nextPhone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = copy.phoneError;
    }
    if (nextMessage.length < 10) {
      nextErrors.message = copy.messageError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSummary(copy.summary);
      setDraft(null);
      if (nextErrors.name) {
        nameRef.current?.focus();
      } else if (nextErrors.email) {
        emailRef.current?.focus();
      } else if (nextErrors.phone) {
        phoneRef.current?.focus();
      } else {
        messageRef.current?.focus();
      }
      return;
    }

    const body = [
      `Name: ${nextName}`,
      `Email: ${nextEmail}`,
      nextPhone ? `Phone: ${nextPhone}` : "",
      "",
      nextMessage,
    ]
      .filter((line) => line !== "")
      .join("\n");

    setSummary("");
    setDraft(body);
    setMailto(
      `mailto:${site.school.email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  if (draft) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-ink">{copy.readyTitle}</h2>
        <p className="mt-2 max-w-[62ch] text-sm leading-6 text-muted">
          {copy.readyBody}
        </p>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap border border-line bg-paper p-4 text-sm leading-6 text-ink">
          {draft}
        </pre>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={mailto} className={`${buttonClass.base} ${buttonClass.primary}`}>
            {site.ui.openEmail}
            <ArrowSquareOutIcon size={18} weight="regular" aria-hidden />
          </a>
          <button
            type="button"
            className={`${buttonClass.base} ${buttonClass.secondary}`}
            onClick={() => setDraft(null)}
          >
            {site.ui.editMessage}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
      {summary ? (
        <p role="alert" className="text-sm font-semibold text-danger">
          {summary}
        </p>
      ) : null}
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-ink">
          {copy.name}
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-hint name-error" : "name-hint"}
          className={fieldClass}
        />
        <p id="name-hint" className="text-sm text-muted">
          {copy.nameHint}
        </p>
        {errors.name ? (
          <p id="name-error" className="text-sm font-medium text-danger">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-ink">
          {copy.email}
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-hint email-error" : "email-hint"}
          className={fieldClass}
        />
        <p id="email-hint" className="text-sm text-muted">
          {copy.emailHint}
        </p>
        {errors.email ? (
          <p id="email-error" className="text-sm font-medium text-danger">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-semibold text-ink">
          {copy.phone}
        </label>
        <input
          ref={phoneRef}
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-hint phone-error" : "phone-hint"}
          className={fieldClass}
        />
        <p id="phone-hint" className="text-sm text-muted">
          {copy.phoneHint}
        </p>
        {errors.phone ? (
          <p id="phone-error" className="text-sm font-medium text-danger">
            {errors.phone}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          {copy.message}
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "message-hint message-error" : "message-hint"
          }
          className={fieldClass}
        />
        <p id="message-hint" className="text-sm text-muted">
          {copy.messageHint}
        </p>
        {errors.message ? (
          <p id="message-error" className="text-sm font-medium text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          className={`${buttonClass.base} ${buttonClass.primary}`}
        >
          {copy.submit}
        </button>
      </div>
    </form>
  );
}
