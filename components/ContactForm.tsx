"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type ContactFormProps = {
  className?: string;
};

type FormStatus = "idle" | "sending" | "sent" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: { sitekey: string; theme?: string },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !widgetRef.current) return;

    const renderWidget = () => {
      if (!widgetRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
      });
    };

    window.onTurnstileLoad = renderWidget;

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    );
    if (existing) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
          turnstileToken: data.get("cf-turnstile-response"),
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se pudo enviar el mensaje.");
      }

      form.reset();
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setStatus("sent");
    } catch (err) {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <div className="hidden" aria-hidden="true">
        <label>
          Sitio web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block text-[15px] text-horizon-heading">
        Tu nombre (requerido)
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
          className="mt-1.5 w-full border border-horizon-navy bg-white px-3 py-2.5 outline-none transition-shadow focus:shadow-[0_0_0_1px_#1f283d]"
        />
      </label>

      <label className="block text-[15px] text-horizon-heading">
        Tu correo electrónico (requerido)
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="mt-1.5 w-full border border-horizon-navy bg-white px-3 py-2.5 outline-none transition-shadow focus:shadow-[0_0_0_1px_#1f283d]"
        />
      </label>

      <label className="block text-[15px] text-horizon-heading">
        Asunto
        <input
          name="subject"
          type="text"
          className="mt-1.5 w-full border border-horizon-navy bg-white px-3 py-2.5 outline-none transition-shadow focus:shadow-[0_0_0_1px_#1f283d]"
        />
      </label>

      <label className="block text-[15px] text-horizon-heading">
        Tu mensaje
        <textarea
          name="message"
          rows={8}
          className="mt-1.5 w-full resize-y border border-horizon-navy bg-white px-3 py-2.5 outline-none transition-shadow focus:shadow-[0_0_0_1px_#1f283d]"
        />
      </label>

      {TURNSTILE_SITE_KEY ? <div ref={widgetRef} className="min-h-[65px]" /> : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-horizon-navy px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-horizon-gold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "sent" && (
        <p className="text-center text-sm text-horizon-gold" role="status">
          Gracias. Te contactaremos a la brevedad.
        </p>
      )}

      {status === "error" && (
        <p className="text-center text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
