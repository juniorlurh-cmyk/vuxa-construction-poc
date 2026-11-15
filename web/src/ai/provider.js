// AI provider — Groq free tier. Works keyless: callers check hasKey() and
// fall back to built-in logic so the site never breaks without a key.

const ENDPOINT =
  import.meta.env.VITE_AI_ENDPOINT ||
  'https://api.groq.com/openai/v1/chat/completions';
const MODEL = import.meta.env.VITE_AI_MODEL || 'qwen/qwen3.8-27b';
const KEY = import.meta.env.VITE_AI_API_KEY || '';

export const hasKey = () => Boolean(KEY);

export async function aiChat(messages, { json = false, maxTokens = 900 } = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: maxTokens,
      temperature: 0.4,
      ...(json ? { response_format: { type: 'json_object' } } : {}),
    }),
  });
  if (!res.ok) throw new Error(`AI request failed: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}
