"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

const signupOptions = [
  { value: "all", label: "All updates" },
  { value: "courses", label: "Course announcements" },
  { value: "florida", label: "Florida Real Estate" },
  { value: "pd", label: "Professional Development" },
  { value: "ib", label: "International Business" },
  { value: "events", label: "Events & school news" },
] as const;

const fieldClass =
  "h-11 w-full border border-[#d8d2c8] bg-white px-3 text-[0.95rem] text-black outline-none transition-[border-color,box-shadow] placeholder:text-black/35 focus:border-black focus:shadow-[0_0_0_1px_#000]";

const labelClass =
  "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#6b6358]";

export function HomeConnect() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [error, setError] = useState("");
  const [draftReady, setDraftReady] = useState(false);
  const [mailto, setMailto] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDraftReady(false);
    setError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !interest) {
      setError("Please complete all required fields.");
      return;
    }

    const interestLabel =
      signupOptions.find((option) => option.value === interest)?.label ??
      interest;

    const body = [
      `First name: ${firstName.trim()}`,
      `Last name: ${lastName.trim()}`,
      `Email: ${email.trim()}`,
      `Sign up option: ${interestLabel}`,
      "",
      "Please add me to school updates.",
    ].join("\n");

    const href = `mailto:${site.school.email}?subject=${encodeURIComponent(
      "Stay connected signup",
    )}&body=${encodeURIComponent(body)}`;

    setMailto(href);
    setDraftReady(true);
  }

  return (
    <section className="bg-[#F8F5F0]">
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-start gap-10 px-4 py-16 sm:px-6 md:gap-12 md:py-20 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-stretch lg:gap-x-16 lg:px-8 lg:py-24 xl:gap-x-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-br-[4.5rem] rounded-tr-[4.5rem] sm:aspect-[926/1024] lg:aspect-auto lg:h-full lg:min-h-0">
          <Image
            src="/images/leo-cussen-stay-connected-laptop-website-926x1024.jpg"
            alt="Learner reviewing the school website on a laptop"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover object-[center_20%]"
          />
        </div>

        <div className="w-full min-w-0 max-w-[34rem] lg:justify-self-end">
          <div className="flex items-center gap-2.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path d="M0 0H12L0 12V0Z" fill="#FFD400" />
            </svg>
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-black">
              Newsletter
            </p>
          </div>

          <h2 className="mt-5 font-sans text-[2.35rem] font-bold leading-[1.08] tracking-[-0.02em] text-black sm:text-[2.75rem] md:text-[3rem]">
            Stay connected
          </h2>

          <p className="mt-5 text-[1.05rem] leading-[1.65] text-black/75 sm:text-[1.125rem] sm:leading-[1.7]">
            Be first to hear about upcoming courses, industry insights, new
            programs and opportunities to support your real estate and business
            career at every stage.
          </p>

          <div className="mt-8 border-t border-black/10" aria-hidden />

          <form className="mt-8 w-full" onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <label htmlFor="connect-first-name" className={labelClass}>
                  First name *
                </label>
                <input
                  id="connect-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className={fieldClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="connect-last-name" className={labelClass}>
                  Last name *
                </label>
                <input
                  id="connect-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className={fieldClass}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="connect-email" className={labelClass}>
                Email *
              </label>
              <input
                id="connect-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="connect-interest" className={labelClass}>
                Sign up options
              </label>
              <div className="relative">
                <select
                  id="connect-interest"
                  name="interest"
                  value={interest}
                  onChange={(event) => setInterest(event.target.value)}
                  className={`${fieldClass} appearance-none pr-10`}
                  required
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  {signupOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50"
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
            </div>

            {error ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            {draftReady ? (
              <p className="mt-4 text-sm leading-6 text-black/70">
                Your message is ready.{" "}
                <a
                  href={mailto}
                  className="font-semibold text-black underline underline-offset-2"
                >
                  Open your email app
                </a>{" "}
                to send it to {site.school.email}.
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-6 inline-flex h-10 items-center bg-black px-5 text-[0.82rem] font-bold text-white transition-colors hover:bg-[#FFD400] hover:text-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
