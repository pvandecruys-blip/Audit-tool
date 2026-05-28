// Server-side chat route. The GenAI key lives only here (via env var) and is
// never exposed to the browser. Configure these in .env.local (local) and in
// Vercel Project Settings → Environment Variables (production):
//   GENAI_API_KEY   - the PwC GenAI key (secret)
//   GENAI_BASE_URL  - full chat-completions endpoint of the gateway
//   GENAI_MODEL     - model id to use (e.g. gpt-4o, claude-3-5-sonnet, gemini-1.5-pro)
//
// The gateway is assumed OpenAI-compatible. If the PwC gateway expects a
// different auth header or body shape, adjust the marked section below.

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are AuditPilot's AI assistant for pharmaceutical (GMP) quality audit planning.
Help with risk assessment, audit planning, auditor assignment, and audit preparation.
Be concise, factual, and use the audit domain language. When you lack specific data, say so.`;

export async function POST(req) {
  const apiKey = process.env.GENAI_API_KEY;
  const baseUrl = process.env.GENAI_BASE_URL;
  const model = process.env.GENAI_MODEL || "gpt-4o";

  // Not configured → tell the client so it can fall back to mock answers.
  if (!apiKey || !baseUrl) {
    return Response.json({ error: "genai_not_configured" }, { status: 503 });
  }

  let messages;
  try {
    ({ messages } = await req.json());
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }
  if (!Array.isArray(messages)) {
    return Response.json({ error: "messages_required" }, { status: 400 });
  }

  // ── Gateway call (OpenAI-compatible). Adjust auth header / body if needed. ──
  let upstream;
  try {
    upstream = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.3,
      }),
    });
  } catch (e) {
    return Response.json(
      { error: "gateway_unreachable", detail: String(e) },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    return Response.json(
      { error: "gateway_error", status: upstream.status, detail },
      { status: 502 },
    );
  }

  const data = await upstream.json().catch(() => null);
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    return Response.json({ error: "no_reply", raw: data }, { status: 502 });
  }
  return Response.json({ reply });
}
