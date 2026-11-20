"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/content/site";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  organization?: string;
  teachingFocus?: string;
  teachingExperience?: string;
  teachingCredentials?: string;
  message?: string;
};

const fieldClass =
  "h-11 w-full rounded-[var(--radius-control)] border border-[#d6d0c6] bg-white px-3.5 text-[0.95rem] font-normal text-[#222222] outline-none transition-[border-color] placeholder:text-[#222222]/40 focus:border-[#222222]";

const labelClass =
  "mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#746C66]";

export function ContactForm({
  lockedInterest,
}: {
  lockedInterest?: string;
} = {}) {
  const copy = site.ui.form;
  const searchParams = useSearchParams();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const interestRef = useRef<HTMLSelectElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState("");
  const [draft, setDraft] = useState<string | null>(null);
  const [mailto, setMailto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(lockedInterest ?? "");
  const [organization, setOrganization] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [teachingFocus, setTeachingFocus] = useState("");
  const [teachingExperience, setTeachingExperience] = useState("");
  const [teachingCredentials, setTeachingCredentials] = useState("");
  const [teachingProfile, setTeachingProfile] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (lockedInterest) {
      setInterest(lockedInterest);
      if (lockedInterest === "teaching-partnership") {
        setMessage((current) =>
          current.trim()
            ? current
            : "I would like to apply to teach with REIB Institute.",
        );
      }
      return;
    }

    const preset = searchParams.get("interest");
    if (
      preset &&
      copy.interestOptions.some((option) => option.value === preset)
    ) {
      setInterest(preset);
      if (preset === "teaching-partnership") {
        setMessage((current) =>
          current.trim()
            ? current
            : "I would like to apply to teach with REIB Institute.",
        );
      }
    }
    const course = searchParams.get("course");
    const format = searchParams.get("format");
    const path = searchParams.get("path");
    if (course || format || path) {
      const pathLabel = path
        ?.split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      setMessage(
        [
          pathLabel ? `Learning path: ${pathLabel}` : "",
          course ? `Course: ${course}` : "",
          format ? `Format: ${format}` : "",
          course || format
            ? "Please share the next available dates."
            : "Please share what is available for this path.",
        ]
          .filter(Boolean)
          .join("\n"),
      );
    }
  }, [searchParams, copy.interestOptions, lockedInterest]);

  const needsOrg = interest === "group-training";
  const needsTeaching = interest === "teaching-partnership";
  const interestLocked = Boolean(lockedInterest);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    const nextEmail = email.trim();
    const nextPhone = phone.trim();
    const nextInterest = interest.trim();
    const nextOrg = organization.trim();
    const nextFocus = teachingFocus.trim();
    const nextExperience = teachingExperience.trim();
    const nextCredentials = teachingCredentials.trim();
    const nextProfile = teachingProfile.trim();
    const nextMessage = message.trim();
    const nextErrors: Errors = {};

    if (!nextInterest) {
      nextErrors.interest = copy.interestError;
    }
    if (nextName.length < 2) {
      nextErrors.name = copy.nameError;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      nextErrors.email = copy.emailError;
    }
    if (
      (needsTeaching || nextPhone) &&
      nextPhone.replace(/\D/g, "").length < 7
    ) {
      nextErrors.phone = copy.phoneError;
    }
    if (needsOrg && nextOrg.length < 2) {
      nextErrors.organization = copy.organizationError;
    }
    if (needsTeaching && !nextFocus) {
      nextErrors.teachingFocus = copy.teachingFocusError;
    }
    if (needsTeaching && !nextExperience) {
      nextErrors.teachingExperience = copy.teachingExperienceError;
    }
    if (needsTeaching && !nextCredentials) {
      nextErrors.teachingCredentials = copy.teachingCredentialsError;
    }
    if (nextMessage.length < 10) {
      nextErrors.message = copy.messageError;
    }
    if (!agreed) {
      setSummary("Please confirm you have read the privacy note.");
      setErrors(nextErrors);
      return;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSummary(copy.summary);
      setDraft(null);
      if (nextErrors.interest) interestRef.current?.focus();
      else if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.phone) phoneRef.current?.focus();
      else if (nextErrors.organization) organizationRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    const interestLabel =
      copy.interestOptions.find((option) => option.value === nextInterest)
        ?.label ?? nextInterest;
    const focusLabel =
      copy.teachingFocusOptions.find((option) => option.value === nextFocus)
        ?.label ?? nextFocus;

    const body = [
      `Name: ${nextName}`,
      `Email: ${nextEmail}`,
      nextPhone ? `Phone: ${nextPhone}` : "",
      `Interest: ${interestLabel}`,
      needsOrg ? `Organization: ${nextOrg}` : "",
      needsOrg && groupSize.trim()
        ? `Approximate group size: ${groupSize.trim()}`
        : "",
      needsTeaching ? `Teaching focus: ${focusLabel}` : "",
      needsTeaching ? `Experience: ${nextExperience}` : "",
      needsTeaching ? `Credentials: ${nextCredentials}` : "",
      needsTeaching && nextProfile ? `Profile: ${nextProfile}` : "",
      "",
      nextMessage,
    ]
      .filter((line) => line !== "")
      .join("\n");

    setSummary("");
    setDraft(body);
    setMailto(
      site.school.email
        ? `mailto:${site.school.email}?subject=${encodeURIComponent(
            needsTeaching
              ? `Instructor application — ${site.school.name}`
              : copy.subject,
          )}&body=${encodeURIComponent(body)}`
        : "",
    );
  }

  if (draft) {
    return (
      <div className="w-full text-left">
        <h2 className="font-sans text-[1.5rem] font-bold text-black">
          {copy.readyTitle}
        </h2>
        <p className="mt-3 text-[0.95rem] leading-7 text-black/65">
          {copy.readyBody}
        </p>
        <pre className="mt-5 overflow-x-auto whitespace-pre-wrap border border-[#cfc9bf] bg-white p-4 text-sm leading-6 text-black">
          {draft}
        </pre>
        <div className="mt-5 flex flex-wrap gap-3">
          {mailto ? (
            <a
              href={mailto}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#002448] px-5 text-[0.88rem] font-bold text-white transition-colors hover:bg-black"
            >
              {site.ui.openEmail}
              <ArrowSquareOutIcon size={16} weight="bold" aria-hidden />
            </a>
          ) : (
            <a
              href={`tel:${site.school.phoneTel}`}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#002448] px-5 text-[0.88rem] font-bold text-white transition-colors hover:bg-black"
            >
              Call {site.school.phoneDisplay}
            </a>
          )}
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full border border-black px-5 text-[0.88rem] font-bold text-black transition-colors hover:bg-black hover:text-white"
            onClick={() => setDraft(null)}
          >
            {site.ui.editMessage}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="grid w-full gap-4" onSubmit={onSubmit} noValidate>
      {summary ? (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {summary}
        </p>
      ) : null}

      {interestLocked ? (
        <input type="hidden" name="interest" value={interest} />
      ) : (
        <div>
          <label htmlFor="interest" className={labelClass}>
            {copy.interest} *
          </label>
          <div className="relative">
            <select
              ref={interestRef}
              id="interest"
              name="interest"
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
              aria-invalid={errors.interest ? true : undefined}
              className={`${fieldClass} appearance-none pr-10`}
            >
              <option value="">Please select</option>
              {copy.interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/45"
              aria-hidden
            >
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          {errors.interest ? (
            <p className="mt-1.5 text-sm font-medium text-red-700">
              {errors.interest}
            </p>
          ) : null}
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>
          {copy.name} *
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? true : undefined}
          className={fieldClass}
        />
        {errors.name ? (
          <p className="mt-1.5 text-sm font-medium text-red-700">{errors.name}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {copy.email} *
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
          className={fieldClass}
        />
        {errors.email ? (
          <p className="mt-1.5 text-sm font-medium text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          {copy.phone}
          {needsTeaching ? " *" : ""}
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
          className={fieldClass}
        />
        {errors.phone ? (
          <p className="mt-1.5 text-sm font-medium text-red-700">
            {errors.phone}
          </p>
        ) : null}
      </div>

      {needsOrg ? (
        <>
          <div>
            <label htmlFor="organization" className={labelClass}>
              {copy.organization} *
            </label>
            <input
              ref={organizationRef}
              id="organization"
              name="organization"
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              aria-invalid={errors.organization ? true : undefined}
              className={fieldClass}
            />
            {errors.organization ? (
              <p className="mt-1.5 text-sm font-medium text-red-700">
                {errors.organization}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="groupSize" className={labelClass}>
              {copy.groupSize}
            </label>
            <input
              id="groupSize"
              name="groupSize"
              value={groupSize}
              onChange={(event) => setGroupSize(event.target.value)}
              className={fieldClass}
            />
          </div>
        </>
      ) : null}

      {needsTeaching ? (
        <>
          <div>
            <label htmlFor="teachingFocus" className={labelClass}>
              {copy.teachingFocus} *
            </label>
            <div className="relative">
              <select
                id="teachingFocus"
                name="teachingFocus"
                value={teachingFocus}
                onChange={(event) => setTeachingFocus(event.target.value)}
                aria-invalid={errors.teachingFocus ? true : undefined}
                className={`${fieldClass} appearance-none pr-10`}
              >
                <option value="">Please select</option>
                {copy.teachingFocusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/45"
                aria-hidden
              >
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            {errors.teachingFocus ? (
              <p className="mt-1.5 text-sm font-medium text-red-700">
                {errors.teachingFocus}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="teachingExperience" className={labelClass}>
              {copy.teachingExperience} *
            </label>
            <input
              id="teachingExperience"
              name="teachingExperience"
              value={teachingExperience}
              onChange={(event) => setTeachingExperience(event.target.value)}
              aria-invalid={errors.teachingExperience ? true : undefined}
              className={fieldClass}
            />
            {errors.teachingExperience ? (
              <p className="mt-1.5 text-sm font-medium text-red-700">
                {errors.teachingExperience}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="teachingCredentials" className={labelClass}>
              {copy.teachingCredentials} *
            </label>
            <input
              id="teachingCredentials"
              name="teachingCredentials"
              value={teachingCredentials}
              onChange={(event) => setTeachingCredentials(event.target.value)}
              aria-invalid={errors.teachingCredentials ? true : undefined}
              className={fieldClass}
            />
            <p className="mt-1.5 text-[0.8rem] leading-5 text-[#746C66]">
              {copy.teachingCredentialsHint}
            </p>
            {errors.teachingCredentials ? (
              <p className="mt-1.5 text-sm font-medium text-red-700">
                {errors.teachingCredentials}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="teachingProfile" className={labelClass}>
              {copy.teachingProfile}
            </label>
            <input
              id="teachingProfile"
              name="teachingProfile"
              type="url"
              inputMode="url"
              value={teachingProfile}
              onChange={(event) => setTeachingProfile(event.target.value)}
              placeholder="https://"
              className={fieldClass}
            />
            <p className="mt-1.5 text-[0.8rem] leading-5 text-[#746C66]">
              {copy.teachingProfileHint}
            </p>
          </div>
        </>
      ) : null}

      <div>
        <label htmlFor="message" className={labelClass}>
          {copy.message} *
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          className="min-h-[8.5rem] w-full resize-y rounded-[var(--radius-control)] border border-[#d6d0c6] bg-white px-3.5 py-3 text-[0.95rem] font-normal text-[#222222] outline-none transition-[border-color] focus:border-[#222222]"
        />
        {errors.message ? (
          <p className="mt-1.5 text-sm font-medium text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-1">
        <p className={labelClass}>Consent</p>
        <label className="flex items-start gap-2.5 text-[0.9rem] leading-6 text-[#222222]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-0.5 size-5 shrink-0 rounded-[2px] border border-[#d6d0c6] accent-[#222222]"
          />
          <span>
            {site.school.email
              ? "I understand this form prepares an email draft to the school."
              : "I understand this form prepares my details so I can call the school office."}
          </span>
        </label>
        <p className="mt-3 rounded-[var(--radius-control)] border border-[#d6d0c6] bg-transparent px-3.5 py-3 text-[0.85rem] leading-6 text-[#746C66]">
          You agree to our{" "}
          <Link href="/terms" className="text-[#222222] underline underline-offset-2">
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-[#222222] underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-[var(--radius-control)] bg-[#002448] px-5 text-[0.9rem] font-bold text-white transition-colors hover:bg-black"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
