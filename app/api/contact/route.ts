import { NextResponse } from "next/server";

const CONTACT_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "contacto@horizoncapital.cl";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo leer el formulario." },
      { status: 400 },
    );
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject =
    typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const turnstileToken =
    typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Nombre y correo son obligatorios." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "El correo no es válido." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for");

  const human = await verifyTurnstile(turnstileToken, ip);
  if (!human) {
    return NextResponse.json(
      { ok: false, error: "No se pudo verificar que no eres un robot." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "El envío de correo no está configurado. Falta RESEND_API_KEY.",
      },
      { status: 503 },
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Horizon Capital <beth.t@example.com>";
  const mailSubject = subject
    ? `Horizon Capital: ${subject}`
    : "Nueva consulta desde Horizon Capital";
  const text = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Asunto: ${subject || "(sin asunto)"}`,
    "",
    message || "(Sin mensaje)",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: mailSubject,
        text,
      }),
    });

    const data = (await response.json()) as { id?: string; message?: string };

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: data.message ?? "No se pudo enviar el mensaje." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error de conexión al enviar el mensaje." },
      { status: 502 },
    );
  }
}
